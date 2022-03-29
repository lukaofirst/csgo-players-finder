using Data;
using Data.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class TeamsController : BaseAPIController
	{
		private readonly ITeamRepository _teamRepository;

		public TeamsController(ITeamRepository teamRepository)
		{
			_teamRepository = teamRepository;
		}

		[HttpGet]
		public async Task<ActionResult<List<Team>>> GetAll()
		{
			var teams = await _teamRepository.GetAll();

			if (teams == null) return NotFound();

			return Ok(teams);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Team>> GetById(int id)
		{
			var team = await _teamRepository.GetById(id);

			if (team == null) return NotFound(new ProblemDetails
			{
				Title = "Team not found!"
			});

			return Ok(team);
		}

		[HttpPost]
		public async Task<ActionResult<Team>> Post(Team team)
		{
			var entity = await _teamRepository.Post(team);

			return Ok(entity);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(int id)
		{
			var team = await _teamRepository.Delete(id);

			if (!team) return BadRequest(new ProblemDetails
			{
				Title = $"Team with id: [{id}] doesn't exist"
			});

			return Ok($"The team with id: [{id}] has been deleted successfully!");
		}
	}
}