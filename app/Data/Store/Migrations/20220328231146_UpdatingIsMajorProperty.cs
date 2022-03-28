using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    public partial class UpdatingIsMajorProperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "IsMajor",
                table: "Trophies",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.UpdateData(
                table: "Trophies",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsMajor",
                value: "true");

            migrationBuilder.UpdateData(
                table: "Trophies",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsMajor", "Name" },
                values: new object[] { "true", "ESL One Cologne" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "IsMajor",
                table: "Trophies",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Trophies",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsMajor",
                value: true);

            migrationBuilder.UpdateData(
                table: "Trophies",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsMajor", "Name" },
                values: new object[] { true, "ESL Cologne" });
        }
    }
}
