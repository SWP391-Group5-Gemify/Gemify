﻿
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace Core.Enitities
{
    public class ProductGem : BaseEntity
    {
        public int ProductId { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }
        public int GemTypeId { get; set; }
        public GemType GemType { get; set; }
        [Column(TypeName = "decimal(18,4)"), Required]
        public decimal GemWeight { get; set; }
        [Column(TypeName = "varchar(50)")]
        public string CertificateCode { get; set; }
        public int Quantity { get; set; }

    }
}
