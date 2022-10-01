namespace Application.DTOs
{
	public class TrophyDTO : BaseClassDTO
	{
		[Required]
		[StringLength(
			70,
			MinimumLength = 5,
			ErrorMessage = "Please fill this field with at least 5 and max. 70 characters long"
		)]
		public string? Name { get; set; }
		[Required]
		[Range(2013,
			int.MaxValue,
			ErrorMessage = "Invalid year! The CSGO's competitive scene has started in 2013"
		)]
		public int Year { get; set; }
		[Required]
		public bool IsMajor { get; set; }
	}
}