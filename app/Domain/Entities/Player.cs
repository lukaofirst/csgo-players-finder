namespace Domain.Entities
{
	public class Player : BaseClass
	{
		public string? Name { get; set; }
		public string? Nickname { get; set; }
		public int Age { get; set; }
		public string? Nationality { get; set; }
		public bool IsActive { get; set; }
		public object? TeamId { get; set; }
		public Team? Team { get; set; }
		public List<object>? TrophyIds { get; set; }
		public List<Trophy>? Trophies { get; set; }
	}
}