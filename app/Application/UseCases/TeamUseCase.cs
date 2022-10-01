namespace Application.UseCases
{
	public class TeamUseCase : ITeamUseCase
	{
		private readonly IMapper _mapper;
		private readonly ITeamRepository _teamRepository;

		public TeamUseCase(IMapper mapper, ITeamRepository teamRepository)
		{
			_mapper = mapper;
			_teamRepository = teamRepository;
		}

		public async Task<List<TeamDTO>> GetAll()
		{
			var entities = await _teamRepository.GetAll();
			var mappedEntities = _mapper.Map<List<TeamDTO>>(entities);

			return mappedEntities;
		}

		public async Task<TeamDTO> GetById(string id)
		{
			try
			{
				var entity = await _teamRepository.GetById(id);

				if (entity == null)
					throw new EntityNotFoundException("Team Not Found");

				var mappedEntity = _mapper.Map<TeamDTO>(entity);

				return mappedEntity;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task<TeamDTO> Post(TeamDTO team)
		{
			try
			{
				var mappedEntity = _mapper.Map<Team>(team);
				var entityResult = await _teamRepository.Post(mappedEntity);

				if (entityResult == null)
					throw new EntityAlreadyExistException(
						$"Team with name: [{team.Name}] already exist"
					);

				return _mapper.Map<TeamDTO>(entityResult);
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task<TeamDTO> Update(TeamDTO team)
		{
			try
			{
				var mappedEntity = _mapper.Map<Team>(team);
				var entityResult = await _teamRepository.Update(mappedEntity);

				if (entityResult == null)
					throw new EntityNotFoundException(
						$"Team with name: [{team.Name}] doesn't exist in our database"
					);

				return _mapper.Map<TeamDTO>(entityResult);
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task Delete(string id)
		{
			try
			{
				var isEntityDeleted = await _teamRepository.Delete(id);

				if (!isEntityDeleted)
					throw new EntityNotFoundException(
						$"Team with id: [{id}] doesn't exist"
					);
			}
			catch (Exception)
			{
				throw;
			}
		}

	}
}
