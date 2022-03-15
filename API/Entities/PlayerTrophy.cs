using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
	public class PlayerTrophy
	{
		[JsonIgnore]
		public int PlayerId { get; set; }
		public Player? Player { get; set; }
		[JsonIgnore]
		public int TrophyId { get; set; }
		public Trophy? Trophy { get; set; }
	}
}