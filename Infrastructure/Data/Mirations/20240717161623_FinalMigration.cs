using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Mirations
{
    /// <inheritdoc />
    public partial class FinalMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GemTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    Proportion = table.Column<decimal>(type: "decimal(18,4)", nullable: true),
                    Polish = table.Column<string>(type: "varchar(10)", nullable: true),
                    Symmetry = table.Column<string>(type: "varchar(10)", nullable: true),
                    Fluorescence = table.Column<string>(type: "varchar(10)", nullable: true),
                    Carat = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Cut = table.Column<string>(type: "varchar(10)", nullable: true),
                    Clarity = table.Column<string>(type: "varchar(10)", nullable: true),
                    Color = table.Column<string>(type: "varchar(10)", nullable: true),
                    Shape = table.Column<string>(type: "varchar(10)", nullable: true),
                    LatestPrice = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    IsProcurable = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GemTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GoldTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    LatestBidPrice = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    LatestAskPrice = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    Content = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoldTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Memberships",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    MinPoint = table.Column<int>(type: "int", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(5,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Memberships", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrderTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Promotions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    ExpDate = table.Column<DateOnly>(type: "Date", nullable: false),
                    EffDate = table.Column<DateOnly>(type: "Date", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(5,2)", nullable: false),
                    Code = table.Column<string>(type: "varchar(100)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Promotions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SaleCounters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    ProductQuantity = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleCounters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SaleCounters_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SubCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GemPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GemTypeId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GemPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GemPrices_GemTypes_GemTypeId",
                        column: x => x.GemTypeId,
                        principalTable: "GemTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GoldPrices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GoldTypeId = table.Column<int>(type: "int", nullable: false),
                    BidPrice = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    AskPrice = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoldPrices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoldPrices_GoldTypes_GoldTypeId",
                        column: x => x.GoldTypeId,
                        principalTable: "GoldTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Phone = table.Column<string>(type: "varchar(20)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    Point = table.Column<int>(type: "int", nullable: false),
                    MembershipId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customers_Memberships_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Memberships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SaleCounterRevenue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Revenue = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    SaleCounterId = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleCounterRevenue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SaleCounterRevenue_SaleCounters_SaleCounterId",
                        column: x => x.SaleCounterId,
                        principalTable: "SaleCounters",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    GoldTypeId = table.Column<int>(type: "int", nullable: false),
                    GoldWeight = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    TotalWeight = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Labour = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "varchar(200)", nullable: true),
                    SubCategoryId = table.Column<int>(type: "int", nullable: true),
                    SaleCounterId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_GoldTypes_GoldTypeId",
                        column: x => x.GoldTypeId,
                        principalTable: "GoldTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Products_SaleCounters_SaleCounterId",
                        column: x => x.SaleCounterId,
                        principalTable: "SaleCounters",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Products_SubCategories_SubCategoryId",
                        column: x => x.SubCategoryId,
                        principalTable: "SubCategories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    OrderTypeId = table.Column<int>(type: "int", nullable: false),
                    SubTotal = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PaymentIntentId = table.Column<string>(type: "varchar(200)", nullable: true),
                    PromotionId = table.Column<int>(type: "int", nullable: true),
                    MembershipId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Memberships_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Memberships",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_OrderTypes_OrderTypeId",
                        column: x => x.OrderTypeId,
                        principalTable: "OrderTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Orders_Promotions_PromotionId",
                        column: x => x.PromotionId,
                        principalTable: "Promotions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductGems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    GemTypeId = table.Column<int>(type: "int", nullable: false),
                    GemWeight = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    CertificateCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductGems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductGems_GemTypes_GemTypeId",
                        column: x => x.GemTypeId,
                        principalTable: "GemTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductGems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ItemOrdered_ProductItemId = table.Column<int>(type: "int", nullable: true),
                    ItemOrdered_ProductName = table.Column<string>(type: "nvarchar(200)", nullable: true),
                    ItemOrdered_GoldPrice = table.Column<decimal>(type: "decimal(18,0)", nullable: true),
                    ItemOrdered_GoldTypeId = table.Column<int>(type: "int", nullable: true),
                    ItemOrdered_GoldTypeName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    ItemOrdered_GoldWeight = table.Column<decimal>(type: "decimal(18,4)", nullable: true),
                    ItemOrdered_ProductLabour = table.Column<decimal>(type: "decimal(18,0)", nullable: true),
                    ItemOrdered_Unit = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    ItemOrdered_TotalWeight = table.Column<decimal>(type: "decimal(18,4)", nullable: true),
                    ItemOrdered_Image_Url = table.Column<string>(type: "varchar(200)", nullable: true),
                    ItemOrdered_SaleCounterId = table.Column<int>(type: "int", nullable: true),
                    ItemOrdered_SaleCounterName = table.Column<string>(type: "varchar(50)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItemGems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GemsItemOrdered_GemName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    GemsItemOrdered_GemColor = table.Column<string>(type: "varchar(10)", nullable: true),
                    GemsItemOrdered_GemWeight = table.Column<decimal>(type: "decimal(18,4)", nullable: true),
                    GemsItemOrdered_GemPrice = table.Column<decimal>(type: "decimal(18,0)", nullable: true),
                    GemsItemOrdered_GemCarat = table.Column<decimal>(type: "decimal(18,4)", nullable: true),
                    GemsItemOrdered_GemClarity = table.Column<string>(type: "varchar(10)", nullable: true),
                    GemsItemOrdered_GemCertificateCode = table.Column<string>(type: "varchar(50)", nullable: true),
                    GemsItemOrdered_IsProcurable = table.Column<bool>(type: "bit", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    OrderItemId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItemGems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItemGems_OrderItems_OrderItemId",
                        column: x => x.OrderItemId,
                        principalTable: "OrderItems",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customers_MembershipId",
                table: "Customers",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "IX_GemPrices_GemTypeId",
                table: "GemPrices",
                column: "GemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_GoldPrices_GoldTypeId",
                table: "GoldPrices",
                column: "GoldTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemGems_OrderItemId",
                table: "OrderItemGems",
                column: "OrderItemId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CustomerId",
                table: "Orders",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MembershipId",
                table: "Orders",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderTypeId",
                table: "Orders",
                column: "OrderTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PromotionId",
                table: "Orders",
                column: "PromotionId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductGems_GemTypeId",
                table: "ProductGems",
                column: "GemTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductGems_ProductId",
                table: "ProductGems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_GoldTypeId",
                table: "Products",
                column: "GoldTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SaleCounterId",
                table: "Products",
                column: "SaleCounterId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SubCategoryId",
                table: "Products",
                column: "SubCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleCounterRevenue_SaleCounterId",
                table: "SaleCounterRevenue",
                column: "SaleCounterId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleCounters_UserId",
                table: "SaleCounters",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SubCategories_CategoryId",
                table: "SubCategories",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GemPrices");

            migrationBuilder.DropTable(
                name: "GoldPrices");

            migrationBuilder.DropTable(
                name: "OrderItemGems");

            migrationBuilder.DropTable(
                name: "ProductGems");

            migrationBuilder.DropTable(
                name: "SaleCounterRevenue");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "GemTypes");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "GoldTypes");

            migrationBuilder.DropTable(
                name: "SaleCounters");

            migrationBuilder.DropTable(
                name: "SubCategories");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "OrderTypes");

            migrationBuilder.DropTable(
                name: "Promotions");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Memberships");
        }
    }
}
