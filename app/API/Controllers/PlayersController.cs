namespace API.Controllers
{
	public class PlayersController : BaseAPIController
	{
		private readonly IPlayerUseCase _playerUseCase;
		public PlayersController(IPlayerUseCase playerUseCase)
		{
			_playerUseCase = playerUseCase;
		}

		[HttpGet]
		public async Task<ActionResult<List<PlayerDTO>>> GetAll()
		{
			var players = await _playerUseCase.GetAll();

			return Ok(new SuccessResponse((int)HttpStatusCode.OK, players));
		}

		[HttpGet("{id}", Name = "GetPlayer")]
		public async Task<ActionResult<PlayerDTO>> GetById(string id)
		{
			try
			{
				var player = await _playerUseCase.GetById(id);

				return Ok(new SuccessResponse((int)HttpStatusCode.OK, player));
			}
			catch (Exception ex)
			{
				return NotFound(
					new ErrorResponse(
						ex.Message,
						(int)HttpStatusCode.NotFound,
						ex.StackTrace!
					)
				);
			}
		}

		[HttpPost]
		public async Task<ActionResult<PlayerDTO>> Post(PlayerDTO playerDTO)
		{
			try
			{
				var player = await _playerUseCase.Post(playerDTO);

				return CreatedAtRoute(
					"GetPlayer",
					new { id = player.Id },
					new SuccessResponse((int)HttpStatusCode.Created, player)
				);
			}
			catch (Exception ex)
			{
				return Conflict(
					new ErrorResponse(
						ex.Message,
						(int)HttpStatusCode.Conflict,
						ex.StackTrace!
					)
				);
			}
		}

		[HttpPut]
		public async Task<ActionResult> Update(PlayerDTO playerDTO)
		{
			try
			{
				var updatedPlayer = await _playerUseCase.Update(playerDTO);

				return Ok(new SuccessResponse((int)HttpStatusCode.OK, updatedPlayer));
			}
			catch (Exception ex)
			{
				return BadRequest(
					new ErrorResponse(
						ex.Message,
						(int)HttpStatusCode.BadRequest,
						ex.StackTrace!
					)
				);
			}
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(string id)
		{
			try
			{
				await _playerUseCase.Delete(id);

				return Ok(new SuccessResponse(
						(int)HttpStatusCode.OK,
						$"The player with id: [{id}] has been deleted successfully!"
					)
				);
			}
			catch (Exception ex)
			{
				return NotFound(
					new ErrorResponse(
						ex.Message,
						(int)HttpStatusCode.NotFound,
						ex.StackTrace!
					)
				);
			}
		}
	}
}