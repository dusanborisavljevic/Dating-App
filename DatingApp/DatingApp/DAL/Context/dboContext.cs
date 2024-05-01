﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using DatingApp.DAL.Entity;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.DAL.Context;

public partial class dboContext : DbContext
{
    public dboContext(DbContextOptions<dboContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Photo> Photos { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Photo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Pk_Photo");

            entity.ToTable("Photo");

            entity.Property(e => e.PublicId).HasMaxLength(30);
            entity.Property(e => e.Url)
                .IsRequired()
                .HasMaxLength(100);

            entity.HasOne(d => d.User).WithMany(p => p.Photos)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Photo_User");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Pk_User");

            entity.ToTable("User");

            entity.Property(e => e.City)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Country)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Creted).HasColumnType("datetime");
            entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.Indroduction)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.Interesets)
                .HasMaxLength(300)
                .IsUnicode(false);
            entity.Property(e => e.KnownAs).HasMaxLength(30);
            entity.Property(e => e.LastActive).HasColumnType("datetime");
            entity.Property(e => e.LookingFor)
                .HasMaxLength(800)
                .IsUnicode(false);
            entity.Property(e => e.Password1)
                .IsRequired()
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.UserName).HasMaxLength(30);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}