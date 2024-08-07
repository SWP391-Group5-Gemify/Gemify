﻿using Core.Enitities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config
{
    public class ProductGemConfiguration : IEntityTypeConfiguration<ProductGem>
    {
        public void Configure(EntityTypeBuilder<ProductGem> builder)
        {
            builder.HasOne(pg => pg.Product)
                .WithMany(p => p.ProductGems)
                .HasForeignKey(pg => pg.ProductId);

            builder.HasOne(pg => pg.GemType)
                .WithMany()
                .HasForeignKey(pg => pg.GemTypeId);
        }
    }
}
