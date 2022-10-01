namespace Application.DTOs
{
	public abstract class BaseClassDTO
	{
		[JsonPropertyOrder(-99)]
		public string? Id { get; set; }
	}
}