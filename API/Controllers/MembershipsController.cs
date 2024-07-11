using Core.Enitities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace API.Controllers
{
    public class MembershipsController : BaseApiController
    {
        private readonly IGenericRepository<Membership> _membersRepository;
        public MembershipsController(IGenericRepository<Membership> membershipRepo)
        {
            _membersRepository = membershipRepo;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Cashier")]
        public async Task<ActionResult<Membership>> GetMembershipById(int id)
        {
            return await _membersRepository.GetByIdAsync(id);
        }

    }
}
