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
		public async Task<ActionResult<List<Trophy>>> GetTrophies()
		{
			var trophies = await _context.Trophies!.AsNoTracking().ToListAsync();

			if (trophies == null) return NotFound();

			return Ok(trophies);
		}
	}
}