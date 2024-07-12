using API.Dtos;
using AutoMapper;
using Core.Enitities;
using Core.Enitities.Identity;
using Core.Enitities.OrderAggregate;
using Microsoft.AspNetCore.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<SaleCounter, SaleCounterDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.User.FullName));
            CreateMap<SaleCounterDto, SaleCounter>();
            CreateMap<SaleCounterToAssignDto, SaleCounter>();

            CreateMap<Customer, CustomerDto>()
                .ForMember(d => d.MembershipRate, o => o.MapFrom(s => s.Membership.Name));
            CreateMap<CustomerDto, Customer>();
            CreateMap<CustomerToAddDto, Customer>();

            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<BasketBuybackItemDto, BasketBuybackItem>();

            CreateMap<Product, ProductDto>()
                .ForMember(d => d.GoldType, o => o.MapFrom(s => s.GoldType.Name))
                .ForMember(d => d.SubCategoryName, o => o.MapFrom(s => s.SubCategory.Name))
                .ForMember(d => d.CategoryName, o => o.MapFrom(s => s.SubCategory.Category.Name))
                .ForMember(d => d.SaleCounterName, o => o.MapFrom(s => s.SaleCounter.Name))
                .ForMember(d => d.Gems, o => o.MapFrom(s => s.ProductGems))
                .ForMember(d => d.LatestBidPrice, o => o.MapFrom(s => s.GoldType.LatestBidPrice))
                .ForMember(d => d.LatestAskPrice, o => o.MapFrom(s => s.GoldType.LatestAskPrice));            

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
                .ForMember(d => d.LatestPrice, o => o.MapFrom(s => s.GemType.LatestPrice))
                .ForMember(d => d.GemsPrice, o => o.MapFrom(s => s.GemType.LatestPrice * s.Quantity));

            CreateMap<ProductGemToAddDto, ProductGem>();
            CreateMap<ProductToAddDto, Product>();


            CreateMap<User, UserDto>()
                .ForMember(d => d.Role, o => o.MapFrom<UserRoleResolver>());

            CreateMap<User, EmployeeDto>()
                .ForMember(d => d.Role, o => o.MapFrom<EmployeeRoleResolver>());

            CreateMap<EmployeeDto,User>();

            CreateMap<IdentityRole<int>, RoleDto>();

            CreateMap<Category, CategoryDto>();
            CreateMap<SubCategory, SubCategoryDto>();
            
            CreateMap<GemType, GemTypeDto>().ReverseMap();

            CreateMap<GemPrice, GemPriceDto>();

            CreateMap<GoldPrice, GoldPriceDto>();

            CreateMap<GoldType,LatestGoldPriceDto>();

            CreateMap<OrderItemGem,OrderItemGemDto>()
                .ForMember(d => d.GemName, o => o.MapFrom(s => s.GemsItemOrdered.GemName))
                .ForMember(d => d.GemColor, o => o.MapFrom(s => s.GemsItemOrdered.GemColor))
                .ForMember(d => d.GemWeight, o => o.MapFrom(s => s.GemsItemOrdered.GemWeight))
                .ForMember(d => d.GemCarat, o => o.MapFrom(s => s.GemsItemOrdered.GemCarat))
                .ForMember(d => d.GemClarity, o => o.MapFrom(s => s.GemsItemOrdered.GemClarity))
                .ForMember(d => d.GemCertificateCode, o => o.MapFrom(s => s.GemsItemOrdered.GemCertificateCode))
                .ForMember(d => d.IsProcurable, o => o.MapFrom(s => s.GemsItemOrdered.IsProcurable));

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductItemId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.GoldPrice, o => o.MapFrom(s => s.ItemOrdered.GoldPrice))
                .ForMember(d => d.GoldType, o => o.MapFrom(s => s.ItemOrdered.GoldType))
                .ForMember(d => d.GoldWeight, o => o.MapFrom(s => s.ItemOrdered.GoldWeight))
                .ForMember(d => d.ProductLabour, o => o.MapFrom(s => s.ItemOrdered.ProductLabour))
                .ForMember(d => d.Unit, o => o.MapFrom(s => s.ItemOrdered.Unit))
                .ForMember(d => d.Image_Url, o => o.MapFrom(s => s.ItemOrdered.Image_Url));

            CreateMap<OrderItemDto, OrderItem>();

            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Customer.Name))
                .ForMember(d => d.Phone, o => o.MapFrom(s => s.Customer.Phone))
                .ForMember(d => d.MembershipName, o => o.MapFrom(s => s.Membership.Name))
                .ForMember(d => d.MembershipDiscount, o => o.MapFrom(s => s.Membership.Discount))
                .ForMember(d => d.PromotionCode, o => o.MapFrom(s => s.Promotion.Code))
                .ForMember(d => d.PromotionDiscount, o => o.MapFrom(s => s.Promotion.Discount))
                .ForMember(d => d.OrderType, o => o.MapFrom(s => s.OrderType.Name));

            CreateMap<OrderDto, Order>();
        }
    }
}
