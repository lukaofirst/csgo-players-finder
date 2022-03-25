namespace Domain.DTO
{
	public class PlayerDTO
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? Nickname { get; set; }
		public int Age { get; set; }
		public string? Nationality { get; set; }
		public string? IsActive { get; set; }
		public int TeamId { get; set; }
		public List<TrophyDTO>? Trophies { get; set; }
	}
}