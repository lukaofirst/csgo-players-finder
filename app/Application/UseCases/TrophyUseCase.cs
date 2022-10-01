namespace Application.UseCases
{
	public class TrophyUseCase : ITrophyUseCase
	{
		private readonly IMapper _mapper;
		private readonly ITrophyRepository _trophyRepository;

		public TrophyUseCase(IMapper mapper, ITrophyRepository trophyRepository)
		{
			_mapper = mapper;
			_trophyRepository = trophyRepository;
		}

		public async Task<List<TrophyDTO>> GetAll()
		{
			var entities = await _trophyRepository.GetAll();
			var mappedEntities = _mapper.Map<List<TrophyDTO>>(entities);

			return mappedEntities;
		}

		public async Task<TrophyDTO> GetById(string id)
		{
			try
			{
				var entity = await _trophyRepository.GetById(id);

				if (entity == null)
					throw new EntityNotFoundException("Trophy Not Found");

				var mappedEntity = _mapper.Map<TrophyDTO>(entity);

				return mappedEntity;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task<TrophyDTO> Post(TrophyDTO trophy)
		{
			try
			{
				var mappedEntity = _mapper.Map<Trophy>(trophy);
				var entityResult = await _trophyRepository.Post(mappedEntity);

				if (entityResult == null)
					throw new EntityAlreadyExistException(
						$"Trophy with name: [{trophy.Name}] already exist"
					);

				return _mapper.Map<TrophyDTO>(entityResult);
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task<TrophyDTO> Update(TrophyDTO trophy)
		{
			try
			{
				var mappedEntity = _mapper.Map<Trophy>(trophy);
				var entityResult = await _trophyRepository.Update(mappedEntity);

				if (entityResult == null)
					throw new EntityNotFoundException(
						$"Trophy with name: [{trophy.Name}] doesn't exist in our database"
					);

				return _mapper.Map<TrophyDTO>(entityResult);
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
				var isEntityDeleted = await _trophyRepository.Delete(id);

				if (!isEntityDeleted)
					throw new EntityNotFoundException(
						$"Trophy with id: [{id}] doesn't exist"
					);
			}
			catch (Exception)
			{
				throw;
			}
		}
	}
}
