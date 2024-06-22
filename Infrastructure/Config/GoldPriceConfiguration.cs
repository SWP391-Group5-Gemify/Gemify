using Core.Enitities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Config
{
    public class GoldPriceConfiguration : IEntityTypeConfiguration<GoldPrice>
    {
        public void Configure(EntityTypeBuilder<GoldPrice> builder)
        {
            builder.HasOne(g => g.GoldType)
                .WithMany()
                .HasForeignKey(g => g.GoldTypeId);
        }
    }
}
