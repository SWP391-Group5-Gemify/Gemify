using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Core.Attributes;

namespace Core.Enitities
{
    public class Promotion : BaseEntity
    {
        public Promotion(string Code, string Name, decimal Discount, DateOnly ExpDate) 
        {
            this.Code = Code.ToUpper();
            this.Name = Name;
            this.Discount = Discount;
            this.ExpDate = ExpDate;
            this.EffDate = DateOnly.FromDateTime(DateTime.UtcNow);
            this.Status = PromotionStatus.Active.GetEnumMemberValue();
        }
        
        [Column(TypeName = "nvarchar(200)"), Required]
        public string Name { get; set; }

        [Column(TypeName = "Date")]
        public DateOnly ExpDate { get; set; }

        [Column(TypeName = "Date")]
        public DateOnly EffDate { get; set; }

        [Column(TypeName = "decimal(5, 2)")]
        public decimal Discount { get; set; }

        [Column(TypeName = "varchar(100)"), Required]
        public string Code { get; set; }

        [PromotionStatus(ErrorMessage = "Invalid Promotion Status")]
        [Column(TypeName = "varchar(50)"), Required]
        public string Status { get; set; } = PromotionStatus.Active.GetEnumMemberValue();
    }

}