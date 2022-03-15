using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
	public class PlayerTrophy
	{
		public int PlayerId { get; set; }
		public Player? Player { get; set; }
		public int TrophyId { get; set; }
		public Trophy? Trophy { get; set; }
	}
}