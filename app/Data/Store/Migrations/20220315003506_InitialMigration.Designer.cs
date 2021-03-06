// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Data.Migrations
{
	[DbContext(typeof(DataContext))]
	[Migration("20220315003506_InitialMigration")]
	partial class InitialMigration
	{
		protected override void BuildTargetModel(ModelBuilder modelBuilder)
		{
#pragma warning disable 612, 618
			modelBuilder.HasAnnotation("ProductVersion", "6.0.3");

			modelBuilder.Entity("API.Entities.Player", b =>
				{
					b.Property<int>("Id")
						.ValueGeneratedOnAdd()
						.HasColumnType("INTEGER");

					b.Property<int>("Age")
						.HasColumnType("INTEGER");

					b.Property<bool>("IsActive")
						.HasColumnType("INTEGER");

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
				});

			modelBuilder.Entity("API.Entities.PlayerTrophy", b =>
				{
					b.Property<int>("PlayerId")
						.HasColumnType("INTEGER");

					b.Property<int>("TrophyId")
						.HasColumnType("INTEGER");

					b.HasKey("PlayerId", "TrophyId");

					b.HasIndex("TrophyId");

					b.ToTable("PlayerTrophy");
				});

			modelBuilder.Entity("API.Entities.Team", b =>
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
				});

			modelBuilder.Entity("API.Entities.Trophy", b =>
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
				});

			modelBuilder.Entity("API.Entities.Player", b =>
				{
					b.HasOne("API.Entities.Team", "Team")
						.WithMany("Players")
						.HasForeignKey("TeamId")
						.OnDelete(DeleteBehavior.Cascade)
						.IsRequired();

					b.Navigation("Team");
				});

			modelBuilder.Entity("API.Entities.PlayerTrophy", b =>
				{
					b.HasOne("API.Entities.Player", "Player")
						.WithMany("PlayerTrophies")
						.HasForeignKey("PlayerId")
						.OnDelete(DeleteBehavior.Cascade)
						.IsRequired();

					b.HasOne("API.Entities.Trophy", "Trophy")
						.WithMany("PlayerTrophies")
						.HasForeignKey("TrophyId")
						.OnDelete(DeleteBehavior.Cascade)
						.IsRequired();

					b.Navigation("Player");

					b.Navigation("Trophy");
				});

			modelBuilder.Entity("API.Entities.Player", b =>
				{
					b.Navigation("PlayerTrophies");
				});

			modelBuilder.Entity("API.Entities.Team", b =>
				{
					b.Navigation("Players");
				});

			modelBuilder.Entity("API.Entities.Trophy", b =>
				{
					b.Navigation("PlayerTrophies");
				});
#pragma warning restore 612, 618
		}
	}
}
