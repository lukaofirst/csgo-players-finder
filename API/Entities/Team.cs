using System.Text.Json.Serialization;

namespace API.Entities
{
	public class Team : BaseClass
	{
		public string? Name { get; set; }
		public string? Location { get; set; }
		public string? Region { get; set; }
		public int FoundedYear { get; set; }
		[JsonIgnore]
		public List<Player>? Players { get; set; }
	}
}