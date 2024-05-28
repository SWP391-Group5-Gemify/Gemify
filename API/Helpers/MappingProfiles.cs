using API.Dtos;
using AutoMapper;
using Core.Enitities;
using Core.Enitities.Identity;
using Core.Interfaces;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<SaleCounter, SaleCounterDto>()
                .ForMember(d => d.EmployeeName, o => o.MapFrom(s => s.User.FullName))
                .ForMember(d => d.EmployeeUsername, o => o.MapFrom(s => s.User.UserName));
            CreateMap<SaleCounterDto, SaleCounter>();

            CreateMap<Customer, CustomerDto>()
                .ForMember(d => d.MembershipRate, o => o.MapFrom(s => s.Membership.Name));
            CreateMap<CustomerDto, Customer>();

            CreateMap<User, UserDto>()
                .ForMember(d => d.Role, o => o.MapFrom<UserRoleResolver>());

            CreateMap<User, EmployeeDto>()
                .ForMember(d => d.Role, o => o.MapFrom<EmployeeRoleResolver>());
            CreateMap<User,EmployeeDto>();

            CreateMap<EmployeeDto,User>();
        }
    }
}
