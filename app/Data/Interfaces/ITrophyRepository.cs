using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;

namespace Data.Interfaces
{
	public interface ITrophyRepository
	{
		Task<List<Trophy>> GetAll();
		Task<Trophy> Post(Trophy trophy);
		Task<bool> Delete(int id);
	}
}