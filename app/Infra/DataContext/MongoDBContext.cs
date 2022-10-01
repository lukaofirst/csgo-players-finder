namespace Infra.DataContext
{
	public class MongoDBContext
	{
		private readonly IMongoDatabase db;

		public MongoDBContext(IOptions<SettingsConfig> config)
		{
			var client = new MongoClient(config.Value.MONGO_URI);
			db = client.GetDatabase(config.Value.MONGO_DATABASE_NAME);
		}

		public IMongoDatabase GetConn() => db;
	}
}