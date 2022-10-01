namespace Domain.Interfaces
{
	public interface IPlayerRepository
	{
		Task<List<Player>> GetAll();
		Task<Player> GetById(string id);
		Task<Player?> Post(Player player);
		Task<Player?> Update(Player player);
		Task<bool> Delete(string id);
	}
}