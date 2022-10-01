namespace Domain.Interfaces
{
	public interface ITeamRepository
	{
		Task<List<Team>> GetAll();
		Task<Team> GetById(string id);
		Task<Team?> Post(Team team);
		Task<Team?> Update(Team team);
		Task<bool> Delete(string id);
	}
}