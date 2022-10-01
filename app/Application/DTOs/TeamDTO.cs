namespace Application.DTOs
{
	public class TeamDTO : BaseClassDTO
	{
		[Required]
		[StringLength(
			70,
			MinimumLength = 5,
			ErrorMessage = "Please fill this field with at least 5 and max. 70 characters long"
		)]
		public string? Name { get; set; }
		public string? Location { get; set; }
		public string? Region { get; set; }
		[Required]
		[Range(2013,
			int.MaxValue,
			ErrorMessage = "Invalid year! The CSGO's competitive scene has started in 2013"
		)]
		public int FoundedYear { get; set; }
		public List<PlayerDTO>? Players { get; set; }
		[JsonPropertyOrder(99)]
		public List<string>? PlayerIds { get; set; }
	}
}