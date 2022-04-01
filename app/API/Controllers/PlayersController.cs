using AutoMapper;
using Data;
using Data.Interfaces;
using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class PlayersController : BaseAPIController
	{
		private readonly IPlayerRepository _playerRepository;
		public PlayersController(IPlayerRepository playerRepository)
		{
			_playerRepository = playerRepository;
		}

		[HttpGet]
		public async Task<ActionResult<List<Player>>> GetAll()
		{
			var players = await _playerRepository.GetAll();

			if (players == null) return NotFound();

			return Ok(players);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Player>> GetById(int id)
		{
			var player = await _playerRepository.GetById(id);

			if (player == null) return NotFound(new ProblemDetails
			{
				Title = "Player not found!"
			});

			return Ok(player);
		}

		[HttpPost]
		public async Task<ActionResult<PlayerDTO>> Post(PlayerDTO playerDTO)
		{
			var existingPlayer = await _playerRepository.CheckByNickname(playerDTO.Nickname!);

			if (existingPlayer == true)
			{
				return Conflict(new ProblemDetails
				{
					Title = $"The nickname [{playerDTO.Nickname}] already exist"
				});
			}

			var player = await _playerRepository.Post(playerDTO);

			return Ok(player);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(int id)
		{
			var existingPlayer = await _playerRepository.GetById(id);

			if (existingPlayer == null)
			{
				return NotFound(new ProblemDetails
				{
					Title = $"Player with id: [{id}] doesn't exist"
				});
			}

			var playerId = await _playerRepository.Delete(id);

			return Ok($"The player with id: [{id}] has been deleted successfully!");
		}
	}
}