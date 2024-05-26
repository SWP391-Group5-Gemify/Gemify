using Core.Interfaces;

namespace API.Controllers
{
    public class EmployeeController : BaseApiController
    {
        private readonly IUserRepository _userRepository;

        public EmployeeController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


    }
}
