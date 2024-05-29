using API.Dtos;
using AutoMapper;
using Core.Enitities;
using Core.Enitities.Identity;
using Microsoft.AspNetCore.Identity;

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


            CreateMap<Product, ProductDto>()
                .ForMember(d => d.GoldType, o => o.MapFrom(s => s.GoldType.Name))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
                .ForMember(d => d.SubCategoryName, o => o.MapFrom(s => s.SubCategory.Name))
                .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.SubCategory.Category.Name))
                .ForMember(d => d.SaleCounterName, o => o.MapFrom(s => s.SaleCounter.Name))
                .ForMember(d => d.Gems, o => o.MapFrom(s => s.ProductGems))            
                .ForMember(d => d.LatestBidPrice, o => o.MapFrom(s => s.GoldType.LatestBidPrice));            

            CreateMap<ProductGem, ProductGemDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.GemType.Name))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.GemType.Description))
                .ForMember(d => d.Proportion, o => o.MapFrom(s => s.GemType.Proportion))
                .ForMember(d => d.Polish, o => o.MapFrom(s => s.GemType.Polish))
                .ForMember(d => d.Fluorescence, o => o.MapFrom(s => s.GemType.Fluorescence))
                .ForMember(d => d.Symmetry, o => o.MapFrom(s => s.GemType.Symmetry))
                .ForMember(d => d.Carat, o => o.MapFrom(s => s.GemType.Carat))
                .ForMember(d => d.Cut, o => o.MapFrom(s => s.GemType.Cut))
                .ForMember(d => d.Clarity, o => o.MapFrom(s => s.GemType.Clarity))
                .ForMember(d => d.Color, o => o.MapFrom(s => s.GemType.Color))
                .ForMember(d => d.Shape, o => o.MapFrom(s => s.GemType.Shape))
                .ForMember(d => d.LatestPrice, o => o.MapFrom(s => s.GemType.LatestPrice));

            CreateMap<ProductGemToAddDto, ProductGem>();
            CreateMap<ProductToAddDto, Product>();


            CreateMap<User, UserDto>()
                .ForMember(d => d.Role, o => o.MapFrom<UserRoleResolver>());

            CreateMap<User, EmployeeDto>()
                .ForMember(d => d.Role, o => o.MapFrom<EmployeeRoleResolver>());

            CreateMap<EmployeeDto,User>();

            CreateMap<IdentityRole, RoleDto>();

        }
    }
}
