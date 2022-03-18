using Domain.DTO;
using Domain.Entities;

namespace Data.Interfaces
{
	public interface IPlayerRepository
	{
		Task<List<Player>> GetAll();
		Task<Player> GetById(int id);
		Task<Player> Post(PlayerDTO playerDTO);
		Task<bool> Delete(int id);
	}
}