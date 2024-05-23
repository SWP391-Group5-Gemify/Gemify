﻿
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Enitities
{
    public class Category: BaseEntity
    {
        [Column(TypeName = "varchar(100)"), Required]
        public string Name { get; set; }
        public List<SubCategory> SubCategories { get; set; }
    }
}
