namespace Domain.Interfaces
{
	public interface ITrophyRepository
	{
		Task<List<Trophy>> GetAll();
		Task<Trophy> GetById(string id);
		Task<Trophy?> Post(Trophy trophy);
		Task<Trophy?> Update(Trophy trophy);
		Task<bool> Delete(string id);
	}
}