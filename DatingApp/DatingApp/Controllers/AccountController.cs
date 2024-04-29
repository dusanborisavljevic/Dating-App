using DatingApp.BL.Interfaces;
using DatingApp.DAL.Context;
using DatingApp.DAL.Entity;
using DatingApp.DTOs;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace DatingApp.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly IUserBL _userBL;
        private readonly ITokenService _tokenService;
        public AccountController(IUserBL userBL, ITokenService itoken) 
        {
            _userBL = userBL;
            _tokenService = itoken;
        }


        [HttpPost("register")]
        public async Task<ActionResult<RegisterResponseDto>> registerUser(RegisterDto registerDto)
        {
            

            return Ok(await _userBL.Register(registerDto));
            
        }

        [HttpPost("login")]
        public async Task<ActionResult<RegisterResponseDto>> login(LoginDto loginDto)
        {
            return Ok(await _userBL.Login(loginDto));

        }

    }
}
