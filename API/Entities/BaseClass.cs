using System.Text.Json.Serialization;

namespace API.Entities
{
	public abstract class BaseClass
	{
		[JsonPropertyOrder(-10)]
		public int Id { get; set; }
	}
}