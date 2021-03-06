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
		Task<Trophy> GetById(int id);
		Task<bool> CheckByName(string name);
		Task<Trophy> Post(Trophy trophy);
		Task<Trophy> Update(Trophy trophy);
		Task<bool> Delete(int id);
	}
}