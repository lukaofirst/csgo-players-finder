namespace Application.UseCases
{
	public class PlayerUseCase : IPlayerUseCase
	{
		private readonly IMapper _mapper;
		private readonly IPlayerRepository _playerRepository;

		public PlayerUseCase(IMapper mapper, IPlayerRepository playerRepository)
		{
			_mapper = mapper;
			_playerRepository = playerRepository;
		}

		public async Task<List<PlayerDTO>> GetAll()
		{
			var entities = await _playerRepository.GetAll();
			var mappedEntities = _mapper.Map<List<PlayerDTO>>(entities);

			return mappedEntities;
		}

		public async Task<PlayerDTO> GetById(string id)
		{
			try
			{
				var entity = await _playerRepository.GetById(id);

				if (entity == null)
					throw new EntityNotFoundException("Player Not Found!");

				var mappedEntity = _mapper.Map<PlayerDTO>(entity);

				return mappedEntity;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task<PlayerDTO> Post(PlayerDTO player)
		{
			try
			{
				var mappedEntity = _mapper.Map<Player>(player);
				var entityResult = await _playerRepository.Post(mappedEntity);

				if (entityResult == null)
					throw new EntityAlreadyExistException(
						$"Player with nickname: [{player.Nickname}] already exist"
					);

				return _mapper.Map<PlayerDTO>(entityResult);
			}
			catch (Exception)
			{
				throw;
			}
		}

		public async Task<PlayerDTO> Update(PlayerDTO player)
		{
			try
			{
				var mappedEntity = _mapper.Map<Player>(player);
				var entityResult = await _playerRepository.Update(mappedEntity);

				if (entityResult == null)
					throw new EntityNotFoundException(
						$"Player with nickname: [{player.Nickname}] doesn't exist in our database"
					);

				return _mapper.Map<PlayerDTO>(entityResult);
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
				var isEntityDeleted = await _playerRepository.Delete(id);

				if (!isEntityDeleted)
					throw new EntityNotFoundException(
						$"Player with id: [{id}] doesn't exist"
					);
			}
			catch (Exception)
			{
				throw;
			}
		}
	}
}