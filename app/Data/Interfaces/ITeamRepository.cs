using Domain.Entities;

namespace Data.Interfaces
{
	public interface ITeamRepository
	{
		Task<List<Team>> GetAll();
		Task<Team> GetById(int id);
		Task<bool> CheckByName(string name);
		Task<Team> Post(Team team);
		Task<Team> Update(Team team);
		Task<int> Delete(int id);
	}
}