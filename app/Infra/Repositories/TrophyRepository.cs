namespace Infra.Repositories
{
	public class TrophyRepository : ITrophyRepository
	{
		private readonly MongoDBContext _context;
		private readonly IMongoCollection<Trophy> _trophiesCollection;
		private const string collectionName = "trophies";

		public TrophyRepository(MongoDBContext context)
		{
			_context = context;
			_trophiesCollection = _context.GetConn().GetCollection<Trophy>(collectionName);
		}

		public async Task<List<Trophy>> GetAll()
		{
			var trophies = await _trophiesCollection
				.Find(EmptyFilter())
				.ToListAsync();

			return trophies;
		}

		public async Task<Trophy> GetById(string id)
		{
			var trophy = await _trophiesCollection
				.Find($"{{ _id: ObjectId('{id}')}}")
				.SingleOrDefaultAsync();

			return trophy;
		}

		public async Task<Trophy?> Post(Trophy trophy)
		{
			var trophyExist = await CheckByName(trophy.Name!);

			if (!trophyExist)
			{
				trophy.Id = ObjectId.GenerateNewId();

				await _trophiesCollection.InsertOneAsync(trophy);

				return trophy;
			}
			else
			{
				return null;
			}
		}

		public async Task<Trophy?> Update(Trophy trophy)
		{
			var trophyExist = await CheckByName(trophy.Name!);

			if (trophyExist)
			{
				trophy.Id = ObjectId.Parse(trophy.Id!.ToString());

				var options = new ReplaceOptions { IsUpsert = true };
				await _trophiesCollection
					.ReplaceOneAsync($"{{ _id: ObjectId('{trophy.Id}')}}", trophy, options);

				return trophy;
			}
			else
			{
				return null;
			}
		}

		public async Task<bool> Delete(string id)
		{
			var result = await _trophiesCollection
				.DeleteOneAsync($"{{ _id: ObjectId('{id}')}}");

			return result.DeletedCount > 0;
		}

		private static FilterDefinition<Trophy> EmptyFilter()
		{
			return Builders<Trophy>.Filter.Empty;
		}

		private async Task<bool> CheckByName(string name)
		{
			var entityExist = await _trophiesCollection
				 .Find(x => x.Name == name)
				 .AnyAsync();

			return entityExist;
		}
	}
}