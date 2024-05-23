﻿
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace Core.Enitities
{
    public class Product : BaseEntity
    {
        [Column(TypeName = "varchar(200)"), Required]
        public string Name { get; set; }
        [Column(TypeName = "varchar(1000)")]
        public string Description { get; set; }
        public int? GoldTypeId { get; set; }
        public GoldType GoldType { get; set;}
        [Column(TypeName = "decimal(18,2)")]
        public float? GoldWeight {  get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public float TotalWeight { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public float? Labour {  get; set; }
        public ProductStatus Status { get; set; }
        public int? Quantity { get; set; }
        [Column(TypeName = "varchar(200)")]
        public string ImageUrl { get; set; }
        public int SubCategoryId { get; set; }
        public SubCategory SubCategory { get; set; }
        public int SaleCounterId { get; set; }
        public SaleCounter SaleCounter { get; set; }

    }
}
