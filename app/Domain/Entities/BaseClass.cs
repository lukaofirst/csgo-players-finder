using System.Text.Json.Serialization;

namespace Domain.Entities
{
	public abstract class BaseClass
	{
		[JsonPropertyOrder(-10)]
		public int Id { get; set; }
	}
}