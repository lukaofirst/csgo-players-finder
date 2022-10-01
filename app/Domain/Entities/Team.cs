namespace Domain.Entities
{
	public class Team : BaseClass
	{
		public string? Name { get; set; }
		public string? Location { get; set; }
		public string? Region { get; set; }
		public int FoundedYear { get; set; }
        public List<object>? PlayerIds { get; set; }
        public List<Player>? Players { get; set; }
	}
}