using DatingApp.Data;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _dataContext;
        public BuggyController(DataContext dataContext)
        {
               _dataContext = dataContext;
        }

        [HttpGet("not-found")]
        public async Task<ActionResult> NotFound1()
        {
            return NotFound();
        }

        [HttpGet("server-error")]
        public async Task<ActionResult> ServerError1()
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
        }
    }
}
