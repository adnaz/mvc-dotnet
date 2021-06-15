﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using storeApp.Models;

namespace storeApp.Migrations
{
    [DbContext(typeof(UserContext))]
    [Migration("20210419140558_price to application")]
    partial class pricetoapplication
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.5");

            modelBuilder.Entity("ApplicationOs", b =>
                {
                    b.Property<int>("ApplicationsId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OssId")
                        .HasColumnType("INTEGER");

                    b.HasKey("ApplicationsId", "OssId");

                    b.HasIndex("OssId");

                    b.ToTable("ApplicationOs");
                });

            modelBuilder.Entity("storeApp.Models.Application", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Image")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<double>("Size")
                        .HasColumnType("REAL");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<double>("price")
                        .HasColumnType("REAL");

                    b.Property<string>("version")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Applications");
                });

            modelBuilder.Entity("storeApp.Models.ApplicationUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ApplicationId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Version")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.HasIndex("UserId");

                    b.ToTable("ApplicationUser");
                });

            modelBuilder.Entity("storeApp.Models.Os", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Oss");
                });

            modelBuilder.Entity("storeApp.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double>("Credit")
                        .HasColumnType("REAL");

                    b.Property<string>("Password")
                        .HasColumnType("TEXT");

                    b.Property<string>("Token")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ApplicationOs", b =>
                {
                    b.HasOne("storeApp.Models.Application", null)
                        .WithMany()
                        .HasForeignKey("ApplicationsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("storeApp.Models.Os", null)
                        .WithMany()
                        .HasForeignKey("OssId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("storeApp.Models.Application", b =>
                {
                    b.HasOne("storeApp.Models.User", "User")
                        .WithMany("Applications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("storeApp.Models.ApplicationUser", b =>
                {
                    b.HasOne("storeApp.Models.Application", "Application")
                        .WithMany()
                        .HasForeignKey("ApplicationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("storeApp.Models.User", "User")
                        .WithMany("ApplicationUsers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Application");

                    b.Navigation("User");
                });

            modelBuilder.Entity("storeApp.Models.User", b =>
                {
                    b.Navigation("Applications");

                    b.Navigation("ApplicationUsers");
                });
#pragma warning restore 612, 618
        }
    }
}
