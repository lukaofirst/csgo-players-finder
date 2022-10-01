namespace Application.DTOs
{
	public class PlayerDTO : BaseClassDTO
	{
		[Required]
		public string? Name { get; set; }
		[Required]
		public string? Nickname { get; set; }
		public int Age { get; set; }
		public string? Nationality { get; set; }
		public bool IsActive { get; set; }
		public TeamDTO? Team { get; set; }
		public List<TrophyDTO>? Trophies { get; set; }
		[JsonPropertyOrder(99)]
		public string? TeamId { get; set; }
		[JsonPropertyOrder(99)]
		public List<string>? TrophyIds { get; set; } = null;
	}
}