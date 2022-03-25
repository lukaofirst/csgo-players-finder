﻿// <auto-generated />
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20220325014502_UpdatingIsActiveProperty")]
    partial class UpdatingIsActiveProperty
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.3");

            modelBuilder.Entity("Domain.Entities.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Age")
                        .HasColumnType("INTEGER");

                    b.Property<string>("IsActive")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nationality")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nickname")
                        .HasColumnType("TEXT");

                    b.Property<int>("TeamId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("TeamId");

                    b.ToTable("Players");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Age = 27,
                            IsActive = "true",
                            Name = "Epitácio Pessoa",
                            Nationality = "Brazil",
                            Nickname = "TACO",
                            TeamId = 3
                        },
                        new
                        {
                            Id = 2,
                            Age = 30,
                            IsActive = "true",
                            Name = "Gabriel Toledo",
                            Nationality = "Brazil",
                            Nickname = "FalleN",
                            TeamId = 1
                        },
                        new
                        {
                            Id = 3,
                            Age = 25,
                            IsActive = "true",
                            Name = "Andrei Piovezan",
                            Nationality = "Brazil",
                            Nickname = "arT",
                            TeamId = 2
                        });
                });

            modelBuilder.Entity("Domain.Entities.PlayerTrophy", b =>
                {
                    b.Property<int>("PlayerId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TrophyId")
                        .HasColumnType("INTEGER");

                    b.HasKey("PlayerId", "TrophyId");

                    b.HasIndex("TrophyId");

                    b.ToTable("PlayerTrophies");

                    b.HasData(
                        new
                        {
                            PlayerId = 1,
                            TrophyId = 1
                        },
                        new
                        {
                            PlayerId = 1,
                            TrophyId = 2
                        },
                        new
                        {
                            PlayerId = 2,
                            TrophyId = 1
                        },
                        new
                        {
                            PlayerId = 2,
                            TrophyId = 2
                        });
                });

            modelBuilder.Entity("Domain.Entities.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("FoundedYear")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Location")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Region")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Teams");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FoundedYear = 2018,
                            Location = "Brazil",
                            Name = "Imperial",
                            Region = "North America"
                        },
                        new
                        {
                            Id = 2,
                            FoundedYear = 2017,
                            Location = "Brazil / United States",
                            Name = "FURIA",
                            Region = "North America"
                        },
                        new
                        {
                            Id = 3,
                            FoundedYear = 2017,
                            Location = "Sweden / Brazil",
                            Name = "GODSENT",
                            Region = "North America"
                        });
                });

            modelBuilder.Entity("Domain.Entities.Trophy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsMajor")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("Year")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Trophies");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsMajor = true,
                            Name = "MLG Columbus",
                            Year = 2016
                        },
                        new
                        {
                            Id = 2,
                            IsMajor = true,
                            Name = "ESL Cologne",
                            Year = 2016
                        });
                });

            modelBuilder.Entity("Domain.Entities.Player", b =>
                {
                    b.HasOne("Domain.Entities.Team", "Team")
                        .WithMany("Players")
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Team");
                });

            modelBuilder.Entity("Domain.Entities.PlayerTrophy", b =>
                {
                    b.HasOne("Domain.Entities.Player", "Player")
                        .WithMany("PlayerTrophies")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Trophy", "Trophy")
                        .WithMany("PlayerTrophies")
                        .HasForeignKey("TrophyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Player");

                    b.Navigation("Trophy");
                });

            modelBuilder.Entity("Domain.Entities.Player", b =>
                {
                    b.Navigation("PlayerTrophies");
                });

            modelBuilder.Entity("Domain.Entities.Team", b =>
                {
                    b.Navigation("Players");
                });

            modelBuilder.Entity("Domain.Entities.Trophy", b =>
                {
                    b.Navigation("PlayerTrophies");
                });
#pragma warning restore 612, 618
        }
    }
}
