namespace Application.Interfaces
{
	public interface IPlayerUseCase
	{
		Task<List<PlayerDTO>> GetAll();
		Task<PlayerDTO> GetById(string id);
		Task<PlayerDTO> Post(PlayerDTO player);
		Task<PlayerDTO> Update(PlayerDTO player);
		Task Delete(string id);
	}
}