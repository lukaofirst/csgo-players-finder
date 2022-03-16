using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class TrophiesController : BaseAPIController
	{
		private readonly DataContext _context;
		public TrophiesController(DataContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<List<Trophy>>> GetAll()
		{
			var trophies = await _context.Trophies!.AsNoTracking().ToListAsync();

			if (trophies == null) return NotFound();

			return Ok(trophies);
		}

		[HttpPost]
		public async Task<ActionResult<Trophy>> Post(Trophy trophy)
		{
			await _context.Trophies!.AddAsync(trophy);

			var result = await _context.SaveChangesAsync() > 0;

			if (result) return Ok(trophy);

			return BadRequest(new ProblemDetails { Title = "We found an issue adding a trophy" });
		}

		[HttpDelete]
		public async Task<ActionResult> Delete(int id)
		{
			var trophy = await _context.Trophies!
				.AsNoTracking()
				.Where(t => t.Id == id)
				.FirstOrDefaultAsync();

			if (trophy == null) return BadRequest(new ProblemDetails
			{
				Title = $"The trophy with id: [{id}] doesn't exist"
			});

			_context.Trophies!.Remove(trophy);

			await _context.SaveChangesAsync();

			return Ok($"The trophy with id: [{id}] has been deleted successfully!");
		}
	}
}