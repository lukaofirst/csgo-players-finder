namespace Application.Interfaces
{
	public interface ITrophyUseCase
	{
		Task<List<TrophyDTO>> GetAll();
		Task<TrophyDTO> GetById(string id);
		Task<TrophyDTO> Post(TrophyDTO trophy);
		Task<TrophyDTO> Update(TrophyDTO trophy);
		Task Delete(string id);
	}
}