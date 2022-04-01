using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class RenamingTrophiesName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Trophies",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "MLG Columbus 2016");

            migrationBuilder.UpdateData(
                table: "Trophies",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "ESL One Cologne 2016");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Trophies",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "MLG Columbus");

            migrationBuilder.UpdateData(
                table: "Trophies",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "ESL One Cologne");
        }
    }
}
