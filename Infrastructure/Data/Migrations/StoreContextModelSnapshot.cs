﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    [DbContext(typeof(StoreContext))]
    partial class StoreContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Core.Enitities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Core.Enitities.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Gender")
                        .HasColumnType("varchar(50)");

                    b.Property<int>("MembershipId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("varchar(20)");

                    b.Property<int>("Point")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MembershipId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Core.Enitities.GemPrice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("GemTypeId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("GemTypeId");

                    b.ToTable("GemPrices");
                });

            modelBuilder.Entity("Core.Enitities.GemType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Carat")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Clarity")
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Color")
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Cut")
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(1000)");

                    b.Property<string>("Fluorescence")
                        .HasColumnType("varchar(10)");

                    b.Property<bool>("IsProcurable")
                        .HasColumnType("bit");

                    b.Property<decimal>("LatestPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Polish")
                        .HasColumnType("varchar(10)");

                    b.Property<decimal?>("Proportion")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Shape")
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Symmetry")
                        .HasColumnType("varchar(10)");

                    b.HasKey("Id");

                    b.ToTable("GemTypes");
                });

            modelBuilder.Entity("Core.Enitities.GoldPrice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("AskPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("BidPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("GoldTypeId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GoldTypeId");

                    b.ToTable("GoldPrices");
                });

            modelBuilder.Entity("Core.Enitities.GoldType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Content")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LatestAskPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LatestBidPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("Id");

                    b.ToTable("GoldTypes");
                });

            modelBuilder.Entity("Core.Enitities.Identity.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Image_Url")
                        .HasColumnType("varchar(200)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("User", null, t =>
                        {
                            t.ExcludeFromMigrations();
                        });
                });

            modelBuilder.Entity("Core.Enitities.Membership", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(5, 2)");

                    b.Property<int>("MinPoint")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Memberships");
                });

            modelBuilder.Entity("Core.Enitities.OrderAggregate.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime");

                    b.Property<int>("OrderTypeId")
                        .HasColumnType("int");

                    b.Property<string>("PaymentIntentId")
                        .HasColumnType("varchar(200)");

                    b.Property<int>("PromotionId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("varchar(50)");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("OrderTypeId");

                    b.HasIndex("PromotionId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Core.Enitities.OrderAggregate.OrderItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("OrderId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("Core.Enitities.OrderAggregate.OrderItemGem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("OrderItemId")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderItemId");

                    b.ToTable("OrderItemGems");
                });

            modelBuilder.Entity("Core.Enitities.OrderAggregate.OrderType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("OrderTypes");
                });

            modelBuilder.Entity("Core.Enitities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(1000)");

                    b.Property<int?>("GoldTypeId")
                        .HasColumnType("int");

                    b.Property<decimal?>("GoldWeight")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("varchar(200)");

                    b.Property<decimal?>("Labour")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<int?>("SaleCounterId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<int>("SubCategoryId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalWeight")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("GoldTypeId");

                    b.HasIndex("SaleCounterId");

                    b.HasIndex("SubCategoryId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Core.Enitities.ProductGem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CertificateCode")
                        .HasColumnType("varchar(50)");

                    b.Property<int>("GemTypeId")
                        .HasColumnType("int");

                    b.Property<decimal>("GemWeight")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GemTypeId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductGems");
                });

            modelBuilder.Entity("Core.Enitities.Promotion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<decimal>("Discount")
                        .HasColumnType("decimal(5, 2)");

                    b.Property<DateOnly>("EffDate")
                        .HasColumnType("Date");

                    b.Property<DateOnly>("ExpDate")
                        .HasColumnType("Date");

                    b.Property<decimal>("MinValue")
                        .HasColumnType("decimal(18, 2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Promotion");
                });

            modelBuilder.Entity("Core.Enitities.SaleCounter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("ProductQuantity")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("SaleCounters");
                });

            modelBuilder.Entity("Core.Enitities.SubCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("SubCategories");
                });

            modelBuilder.Entity("Core.Enitities.Customer", b =>
                {
                    b.HasOne("Core.Enitities.Membership", "Membership")
                        .WithMany()
                        .HasForeignKey("MembershipId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Membership");
                });

            modelBuilder.Entity("Core.Enitities.GemPrice", b =>
                {
                    b.HasOne("Core.Enitities.GemType", "GemType")
                        .WithMany()
                        .HasForeignKey("GemTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GemType");
                });

            modelBuilder.Entity("Core.Enitities.GoldPrice", b =>
                {
                    b.HasOne("Core.Enitities.GoldType", "GoldType")
                        .WithMany()
                        .HasForeignKey("GoldTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GoldType");
                });

            modelBuilder.Entity("Core.Enitities.OrderAggregate.Order", b =>
                {
                    b.HasOne("Core.Enitities.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Enitities.OrderAggregate.OrderType", "OrderType")
                        .WithMany()
                        .HasForeignKey("OrderTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Enitities.Promotion", "Promotion")
                        .WithMany()
                        .HasForeignKey("PromotionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Enitities.Identity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("OrderType");

                    b.Navigation("Promotion");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Enitities.OrderAggregate.OrderItem", b =>
                {
                    b.HasOne("Core.Enitities.OrderAggregate.Order", null)
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId");

                    b.OwnsOne("Core.Enitities.OrderAggregate.ProductItemOrdered", "ItemOrdered", b1 =>
                        {
                            b1.Property<int>("OrderItemId")
                                .HasColumnType("int");

                            b1.Property<decimal>("GoldPrice")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<string>("GoldType")
                                .HasColumnType("nvarchar(100)");

                            b1.Property<decimal>("GoldWeight")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<string>("Image_Url")
                                .HasColumnType("varchar(200)");

                            b1.Property<int>("ProductItemId")
                                .HasColumnType("int");

                            b1.Property<decimal>("ProductLabour")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<string>("ProductName")
                                .IsRequired()
                                .HasColumnType("nvarchar(200)");

                            b1.Property<string>("Unit")
                                .HasColumnType("nvarchar(20)");

                            b1.HasKey("OrderItemId");

                            b1.ToTable("OrderItems");

                            b1.WithOwner()
                                .HasForeignKey("OrderItemId");
                        });

                    b.Navigation("ItemOrdered");
                });

            modelBuilder.Entity("Core.Enitities.OrderAggregate.OrderItemGem", b =>
                {
                    b.HasOne("Core.Enitities.OrderAggregate.OrderItem", null)
                        .WithMany("OrderItemGems")
                        .HasForeignKey("OrderItemId");

                    b.OwnsOne("Core.Enitities.OrderAggregate.ProductGemsItemOrdered", "GemsItemOrdered", b1 =>
                        {
                            b1.Property<int>("OrderItemGemId")
                                .HasColumnType("int");

                            b1.Property<decimal>("GemCarat")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<string>("GemCertificateCode")
                                .HasColumnType("varchar(50)");

                            b1.Property<string>("GemClarity")
                                .HasColumnType("varchar(10)");

                            b1.Property<string>("GemColor")
                                .HasColumnType("varchar(10)");

                            b1.Property<string>("GemName")
                                .HasColumnType("nvarchar(100)");

                            b1.Property<decimal>("GemPrice")
                                .HasColumnType("decimal(18, 2)");

                            b1.Property<decimal>("GemWeight")
                                .HasColumnType("decimal(18, 2)");

                            b1.HasKey("OrderItemGemId");

                            b1.ToTable("OrderItemGems");

                            b1.WithOwner()
                                .HasForeignKey("OrderItemGemId");
                        });

                    b.Navigation("GemsItemOrdered");
                });

            modelBuilder.Entity("Core.Enitities.Product", b =>
                {
                    b.HasOne("Core.Enitities.GoldType", "GoldType")
                        .WithMany()
                        .HasForeignKey("GoldTypeId");

                    b.HasOne("Core.Enitities.SaleCounter", "SaleCounter")
                        .WithMany("Products")
                        .HasForeignKey("SaleCounterId");

                    b.HasOne("Core.Enitities.SubCategory", "SubCategory")
                        .WithMany()
                        .HasForeignKey("SubCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GoldType");

                    b.Navigation("SaleCounter");

                    b.Navigation("SubCategory");
                });

            modelBuilder.Entity("Core.Enitities.ProductGem", b =>
                {
                    b.HasOne("Core.Enitities.GemType", "GemType")
                        .WithMany("ProductGems")
                        .HasForeignKey("GemTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Enitities.Product", "Product")
                        .WithMany("ProductGems")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GemType");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Core.Enitities.SaleCounter", b =>
                {
                    b.HasOne("Core.Enitities.Identity.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Enitities.SubCategory", b =>
                {
                    b.HasOne("Core.Enitities.Category", "Category")
                        .WithMany("SubCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Core.Enitities.Category", b =>
                {
                    b.Navigation("SubCategories");
                });

            modelBuilder.Entity("Core.Enitities.GemType", b =>
                {
                    b.Navigation("ProductGems");
                });

            modelBuilder.Entity("Core.Enitities.OrderAggregate.Order", b =>
                {
                    b.Navigation("OrderItems");
                });

            modelBuilder.Entity("Core.Enitities.OrderAggregate.OrderItem", b =>
                {
                    b.Navigation("OrderItemGems");
                });

            modelBuilder.Entity("Core.Enitities.Product", b =>
                {
                    b.Navigation("ProductGems");
                });

            modelBuilder.Entity("Core.Enitities.SaleCounter", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
