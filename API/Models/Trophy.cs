namespace API.Models
{
	public class Trophy : BaseClass
	{
		public string? Name { get; set; }
		public int Year { get; set; }
		public bool IsMajor { get; set; }
		public List<Player>? Players { get; set; }
	}
}