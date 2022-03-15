using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class SeedingDataUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PlayerTrophies",
                columns: new[] { "PlayerId", "TrophyId" },
                values: new object[] { 1, 2 });

            migrationBuilder.InsertData(
                table: "PlayerTrophies",
                columns: new[] { "PlayerId", "TrophyId" },
                values: new object[] { 2, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PlayerTrophies",
                keyColumns: new[] { "PlayerId", "TrophyId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "PlayerTrophies",
                keyColumns: new[] { "PlayerId", "TrophyId" },
                keyValues: new object[] { 2, 1 });
        }
    }
}
