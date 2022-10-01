namespace API.Controllers
{
	public class TeamsController : BaseAPIController
	{
		private readonly ITeamUseCase _teamUseCase;

		public TeamsController(ITeamUseCase teamUseCase)
		{
			_teamUseCase = teamUseCase;
		}

		[HttpGet]
		public async Task<ActionResult<List<TeamDTO>>> GetAll()
		{
			var teams = await _teamUseCase.GetAll();

			return Ok(new SuccessResponse((int)HttpStatusCode.OK, teams));
		}

		[HttpGet("{id}", Name = "GetTeam")]
		public async Task<ActionResult<TeamDTO>> GetById(string id)
		{
			try
			{
				var team = await _teamUseCase.GetById(id);

				return Ok(new SuccessResponse((int)HttpStatusCode.OK, team));
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
		public async Task<ActionResult<TeamDTO>> Post(TeamDTO teamDTO)
		{
			try
			{
				var team = await _teamUseCase.Post(teamDTO);

				return CreatedAtRoute("GetTeam", new { id = team.Id }, team);
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
		public async Task<ActionResult> Update(TeamDTO team)
		{
			try
			{
				var updatedTeam = await _teamUseCase.Update(team);

				return Ok(new SuccessResponse((int)HttpStatusCode.OK, updatedTeam));
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
				await _teamUseCase.Delete(id);

				return Ok(new SuccessResponse(
						(int)HttpStatusCode.OK,
						$"The team with id: [{id}] has been deleted successfully!"
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