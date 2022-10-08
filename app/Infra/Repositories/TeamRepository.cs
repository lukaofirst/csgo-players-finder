namespace Infra.Repositories
{
	public class TeamRepository : ITeamRepository
	{
		private readonly MongoDBContext _context;
		private readonly IMongoCollection<Team> _teamsCollection;
		private const string teamCollectionName = "teams";
		private const string foreignPlayerCollectionName = "players";

		public TeamRepository(MongoDBContext context)
		{
			_context = context;
			_teamsCollection = _context.GetConn().GetCollection<Team>(teamCollectionName);
		}

		public async Task<List<Team>> GetAll()
		{
			var teams = await _teamsCollection
				.Aggregate()
				.Lookup<Player, Team>(foreignPlayerCollectionName, "PlayerIds", "TeamId", @as: "Players")
				.ToListAsync();

			return teams;
		}

		public async Task<Team> GetById(string id)
		{
			var team = await _teamsCollection
				.Aggregate()
				.Match($"{{ _id: ObjectId('{id}')}}")
				.Lookup<Player, Team>(foreignPlayerCollectionName, "PlayerIds", "TeamId", @as: "Players")
				.SingleOrDefaultAsync();

			return team;
		}

		public async Task<Team?> Post(Team team)
		{
			var teamExist = await CheckByName(team.Name!);

			if (!teamExist)
			{
				team.Id = ObjectId.GenerateNewId();

				await _teamsCollection.InsertOneAsync(team);

				return team;
			}
			else
			{
				return null;
			}
		}

		public async Task<Team?> Update(Team team)
		{
			var teamExist = await CheckByName(team.Name!);

			if (teamExist)
			{
				team.Id = ObjectId.Parse(team.Id!.ToString());

				var options = new ReplaceOptions { IsUpsert = true };
				await _teamsCollection
					.ReplaceOneAsync($"{{ _id: ObjectId('{team.Id}')}}", team, options);

				return team;
			}
			else
			{
				return null;
			}
		}

		public async Task<bool> Delete(string id)
		{
			var result = await _teamsCollection
				.DeleteOneAsync($"{{ _id: ObjectId('{id}')}}");

			return result.DeletedCount > 0;
		}

		private async Task<bool> CheckByName(string name)
		{
			var entityExist = await _teamsCollection
				.Find(x => x.Name == name)
				.AnyAsync();

			return entityExist;
		}
	}
}