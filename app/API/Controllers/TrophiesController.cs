using Data;
using Data.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class TrophiesController : BaseAPIController
	{
		private readonly ITrophyRepository _trophyRepository;

		public TrophiesController(ITrophyRepository trophyRepository)
		{
			_trophyRepository = trophyRepository;
		}

		[HttpGet]
		public async Task<ActionResult<List<Trophy>>> GetAll()
		{
			var trophies = await _trophyRepository.GetAll();

			if (trophies == null) return NotFound();

			return Ok(trophies);
		}

		[HttpPost]
		public async Task<ActionResult<Trophy>> Post(Trophy trophy)
		{
			var existingTrophy = await _trophyRepository.CheckByName(trophy.Name!);

			if (existingTrophy == true)
			{
				return Conflict(new ProblemDetails
				{
					Title = $"The trophy with name [{trophy.Name}] already exist"
				});
			}

			var entity = await _trophyRepository.Post(trophy);

			return Ok(entity);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(int id)
		{
			var trophy = await _trophyRepository.Delete(id);

			if (!trophy) return NotFound(new ProblemDetails
			{
				Title = $"Trophy with id: [{id}] doesn't exist"
			});

			return Ok($"The trophy with id: [{id}] has been deleted successfully!");
		}
	}
}