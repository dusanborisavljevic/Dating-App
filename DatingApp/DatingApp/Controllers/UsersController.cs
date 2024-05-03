
using DatingApp.BL.Interfaces;
using DatingApp.DAL.Context;
using DatingApp.DAL.Entity;
using DatingApp.DTOs;
using DatingApp.Extensions;
using DatingApp.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace DatingApp.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserBL _userBL;
        public UsersController(IUserBL userBL) 
        {
            _userBL = userBL;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MemberDto>>> getAllMembers([FromQuery]UserParams userParams)
        {
            userParams.CurrentUserName = User.getUserName();
            var users = await _userBL.getAllMembers(userParams);
            Response.ExtendHeader(new PaginationHeader(users.CurrentPage, users.TotalPages, users.PageSize, users.TotalCount));
            return Ok(users);
        }

        [HttpGet("{UserName}")]
        public async Task<ActionResult<MemberDto>> getMemberById(string UserName)
        {
            return Ok(await _userBL.getMemberByUserName(UserName));
        }

        [HttpPut]
        public async Task<IActionResult> updateMember(MemberUpdateRequestDto memberRequest)
        {
            var userName = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _userBL.getMember(userName, memberRequest);
            return Ok("Successfully updated");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> addPhoto(IFormFile file)
        {
            var photo = await _userBL.addPhoto(file,User.getUserName());
            return CreatedAtAction(nameof(getMemberById), new { UserName = User.getUserName() }, photo);
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> setMainPhoto(int photoId)
        {
            await _userBL.setMainPhoto(photoId, User.getUserName());
            return NoContent();
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> deletePhoto(int photoId)
        {
            await _userBL.deletePhoto(User.getUserName(),photoId);
            return Ok();
        }
    }
}
