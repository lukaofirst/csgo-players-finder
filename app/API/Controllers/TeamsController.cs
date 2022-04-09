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

		[HttpGet("{id}", Name = "GetTeam")]
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
			var existingTeam = await _teamRepository.CheckByName(team.Name!);

			if (existingTeam == true)
			{
				return Conflict(new ProblemDetails
				{
					Title = $"The team with name [{team.Name}] already exist"
				});
			}

			var entity = await _teamRepository.Post(team);

			return CreatedAtRoute("GetTeam", new { id = entity.Id }, entity);
		}

		[HttpPut]
		public async Task<ActionResult> Update(Team team)
		{
			var existingTeam = await _teamRepository.CheckByName(team.Name!);

			if (existingTeam != true)
			{
				return Conflict(new ProblemDetails
				{
					Title = $"The team with name [{team.Name}] doesn't exist in our database yet"
				});
			}

			await _teamRepository.Update(team);

			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(int id)
		{
			var existingTeam = await _teamRepository.GetById(id);

			if (existingTeam == null) return NotFound(new ProblemDetails
			{
				Title = $"Team with id: [{id}] doesn't exist"
			});

			var team = await _teamRepository.Delete(id);

			return Ok($"The team with id: [{id}] has been deleted successfully!");
		}
	}
}