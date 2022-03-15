namespace API.Entities
{
	public class Trophy : BaseClass
	{
		public string? Name { get; set; }
		public int Year { get; set; }
		public bool IsMajor { get; set; }
		public List<PlayerTrophy>? PlayerTrophies { get; set; }
	}
}