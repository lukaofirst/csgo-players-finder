namespace API.Controllers
{
	public class TrophiesController : BaseAPIController
	{
		private readonly ITrophyUseCase _trophyUseCase;

		public TrophiesController(ITrophyUseCase trophyUseCase)
		{
			_trophyUseCase = trophyUseCase;
		}

		[HttpGet]
		public async Task<ActionResult<List<TrophyDTO>>> GetAll()
		{
			var trophies = await _trophyUseCase.GetAll();

			return Ok(new SuccessResponse((int)HttpStatusCode.OK, trophies));
		}

		[HttpGet("{id}", Name = "GetTrophy")]
		public async Task<ActionResult<TrophyDTO>> GetById(string id)
		{
			try
			{
				var trophy = await _trophyUseCase.GetById(id);

				return Ok(new SuccessResponse((int)HttpStatusCode.OK, trophy));
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
		public async Task<ActionResult<TrophyDTO>> Post(TrophyDTO trophyDTO)
		{
			try
			{
				var trophy = await _trophyUseCase.Post(trophyDTO);

				return CreatedAtRoute(
					"GetTrophy",
					new { id = trophy.Id },
					new SuccessResponse((int)HttpStatusCode.OK, trophy)
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
		public async Task<ActionResult> Update(TrophyDTO trophy)
		{
			try
			{
				var updatedTrophy = await _trophyUseCase.Update(trophy);

				return Ok(new SuccessResponse((int)HttpStatusCode.OK, updatedTrophy));
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
				await _trophyUseCase.Delete(id);

				return Ok(new SuccessResponse(
						(int)HttpStatusCode.OK,
						$"The trophy with id: [{id}] has been deleted successfully!"
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