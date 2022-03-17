using Domain.Entities;

namespace Data.Interfaces
{
	public interface ITeamRepository
	{
		Task<List<Team>> GetAll();
		Task<Team> GetById(int id);
		Task<Team> Post(Team team);
		Task<bool> Delete(int id);
	}
}