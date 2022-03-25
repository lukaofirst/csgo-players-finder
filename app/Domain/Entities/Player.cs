using System.Text.Json.Serialization;

namespace Domain.Entities
{
	public class Player : BaseClass
	{
		public string? Name { get; set; }
		public string? Nickname { get; set; }
		public int Age { get; set; }
		public string? Nationality { get; set; }
		public string? IsActive { get; set; }
		[JsonIgnore]
		public int TeamId { get; set; }
		public Team? Team { get; set; }
		public List<PlayerTrophy>? PlayerTrophies { get; set; }
	}
}