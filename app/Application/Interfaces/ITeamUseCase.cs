namespace Application.Interfaces
{
	public interface ITeamUseCase
	{
		Task<List<TeamDTO>> GetAll();
		Task<TeamDTO> GetById(string id);
		Task<TeamDTO> Post(TeamDTO team);
		Task<TeamDTO> Update(TeamDTO team);
		Task Delete(string id);
	}
}