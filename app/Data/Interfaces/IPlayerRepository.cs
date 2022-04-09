using Domain.DTO;
using Domain.Entities;

namespace Data.Interfaces
{
	public interface IPlayerRepository
	{
		Task<List<Player>> GetAll();
		Task<Player> GetById(int id);
		Task<bool> CheckByNickname(string nickname);
		Task<Player> Post(PlayerDTO playerDTO);
		Task<Player> Update(PlayerDTO playerDTO);
		Task<int> Delete(int id);
	}
}