﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    [DbContext(typeof(StoreContext))]
    [Migration("20240523111705_AddEntities")]
    partial class AddEntities
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
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
                        .HasColumnType("varchar(1000)");

                    b.Property<string>("Fluorescence")
                        .HasColumnType("varchar(10)");

                    b.Property<bool>("IsReal")
                        .HasColumnType("bit");

                    b.Property<decimal>("LatestPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Polish")
                        .HasColumnType("varchar(10)");

                    b.Property<decimal?>("Proportion")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Shape")
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Symmetry")
                        .HasColumnType("varchar(10)");

                    b.HasKey("Id");

                    b.ToTable("Gemtypes");
                });

            modelBuilder.Entity("Core.Enitities.GoldPrice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("GoldTypeId")
                        .HasColumnType("int");

                    b.Property<decimal>("LatestAskPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LatestAskRate")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LatestBidPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LatestBidRate")
                        .HasColumnType("decimal(18,2)");

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

                    b.Property<decimal>("LatestAskPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LatestAskRate")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LatestBidPrice")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("LatestBidRate")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("varchar(10)");

                    b.HasKey("Id");

                    b.ToTable("GoldTypes");
                });

            modelBuilder.Entity("Core.Enitities.Identity.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image_Url")
                        .HasColumnType("nvarchar(max)");

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
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AppUser");
                });

            modelBuilder.Entity("Core.Enitities.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("varchar(1000)");

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
                        .HasColumnType("varchar(200)");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("SaleCounterId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

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
                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("GemTypeId")
                        .HasColumnType("int");

                    b.Property<decimal>("GemWeight")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("ProductId", "GemTypeId");

                    b.HasIndex("GemTypeId");

                    b.ToTable("ProductGems");
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

                    b.HasKey("Id");

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
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("SubCategories");
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

            modelBuilder.Entity("Core.Enitities.Product", b =>
                {
                    b.HasOne("Core.Enitities.GoldType", "GoldType")
                        .WithMany()
                        .HasForeignKey("GoldTypeId");

                    b.HasOne("Core.Enitities.SaleCounter", "SaleCounter")
                        .WithMany("Products")
                        .HasForeignKey("SaleCounterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Enitities.SubCategory", "SubCategory")
                        .WithMany("Products")
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
                        .WithMany()
                        .HasForeignKey("GemTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Enitities.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GemType");

                    b.Navigation("Product");
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

            modelBuilder.Entity("Core.Enitities.SaleCounter", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("Core.Enitities.SubCategory", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
