namespace Infra.Repositories
{
	public class PlayerRepository : IPlayerRepository
	{
		private readonly MongoDBContext _context;
		private readonly IMongoCollection<Player> _playersCollection;
		private readonly IMongoCollection<Team> _teamsCollection;
		private const string playersCollectionName = "players";
		private const string teamsCollectionName = "teams";
		private const string foreignTrophiesCollectionName = "trophies";

		public PlayerRepository(MongoDBContext context)
		{
			_context = context;
			_playersCollection = _context.GetConn().GetCollection<Player>(playersCollectionName);
			_teamsCollection = _context.GetConn().GetCollection<Team>(teamsCollectionName);
		}

		public async Task<List<Player>> GetAll()
		{
			var players = await _playersCollection.Find(EmptyFilterPlayer()).ToListAsync();
			var teams = await _teamsCollection.Find(EmptyFilterTeam()).ToListAsync();

			foreach (var player in players)
			{
				if (player.TeamId != null)
				{
					var playerTeam = teams.Find(x => x.Id!.Equals(player.TeamId));
					player.Team = playerTeam;
				}
			}

			return players;
		}

		public async Task<Player> GetById(string id)
		{
			var player = await _playersCollection
				.Aggregate()
				.Match($"{{ _id: ObjectId('{id}')}}")
				.Lookup<Trophy, Player>(foreignTrophiesCollectionName, "TrophyIds", "_id", @as: "Trophies")
				.SingleOrDefaultAsync();

			if (player != null && player.TeamId != null)
			{
				var playerTeam = await _teamsCollection
					.Find($"{{ _id: ObjectId('{player.TeamId}')}}")
					.SingleOrDefaultAsync();

				player.Team = playerTeam;
			}

			return player!;
		}

		public async Task<Player?> Post(Player player)
		{
			var playerExist = await CheckByNickname(player.Nickname!);

			if (!playerExist)
			{
				player.Id = ObjectId.GenerateNewId();
				player.TeamId = ObjectId.Parse(player.TeamId!.ToString());

				if (player.TrophyIds != null)
				{
					for (int i = 0; i < player.TrophyIds.Count; i++)
					{
						player.TrophyIds[i] = ObjectId.Parse(player.TrophyIds[i].ToString());
					}
				}

				await _playersCollection.InsertOneAsync(player);

				return player;
			}
			else
			{
				return null;
			}
		}

		public async Task<Player?> Update(Player player)
		{
			var playerExist = await CheckByNickname(player.Nickname!);

			if (playerExist)
			{
				player.Id = ObjectId.Parse(player.Id!.ToString());
				player.TeamId = ObjectId.Parse(player.TeamId!.ToString());

				if (player.TrophyIds != null)
				{
					for (int i = 0; i < player.TrophyIds.Count; i++)
					{
						player.TrophyIds[i] = ObjectId.Parse(player.TrophyIds[i].ToString());
					}
				}

				var options = new ReplaceOptions { IsUpsert = true };
				await _playersCollection
					.ReplaceOneAsync($"{{ _id: ObjectId('{player.Id}')}}", player, options);

				return player;
			}
			else
			{
				return null;
			}
		}

		public async Task<bool> Delete(string id)
		{
			var result = await _playersCollection
				.DeleteOneAsync($"{{ _id: ObjectId('{id}')}}");

			return result.DeletedCount > 0;
		}

		private static FilterDefinition<Player> EmptyFilterPlayer()
		{
			return Builders<Player>.Filter.Empty;
		}

		private static FilterDefinition<Team> EmptyFilterTeam()
		{
			return Builders<Team>.Filter.Empty;
		}

		private async Task<bool> CheckByNickname(string nickname)
		{
			var entityExist = await _playersCollection
				.Find(x => x.Nickname == nickname)
				.AnyAsync();

			return entityExist;
		}
	}
}