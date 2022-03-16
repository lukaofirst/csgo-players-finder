using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
	public partial class SeedingPartialData : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.InsertData(
				table: "Teams",
				columns: new[] { "Id", "FoundedYear", "Location", "Name", "Region" },
				values: new object[] { 1, 2018, "Brazil", "Imperial", "North America" });

			migrationBuilder.InsertData(
				table: "Teams",
				columns: new[] { "Id", "FoundedYear", "Location", "Name", "Region" },
				values: new object[] { 2, 2017, "Brazil / United States", "FURIA", "North America" });

			migrationBuilder.InsertData(
				table: "Teams",
				columns: new[] { "Id", "FoundedYear", "Location", "Name", "Region" },
				values: new object[] { 3, 2017, "Sweden / Brazil", "GODSENT", "North America" });

			migrationBuilder.InsertData(
				table: "Trophies",
				columns: new[] { "Id", "IsMajor", "Name", "Year" },
				values: new object[] { 1, true, "MLG Columbus", 2016 });

			migrationBuilder.InsertData(
				table: "Trophies",
				columns: new[] { "Id", "IsMajor", "Name", "Year" },
				values: new object[] { 2, true, "ESL Cologne", 2016 });
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DeleteData(
				table: "Teams",
				keyColumn: "Id",
				keyValue: 1);

			migrationBuilder.DeleteData(
				table: "Teams",
				keyColumn: "Id",
				keyValue: 2);

			migrationBuilder.DeleteData(
				table: "Teams",
				keyColumn: "Id",
				keyValue: 3);

			migrationBuilder.DeleteData(
				table: "Trophies",
				keyColumn: "Id",
				keyValue: 1);

			migrationBuilder.DeleteData(
				table: "Trophies",
				keyColumn: "Id",
				keyValue: 2);
		}
	}
}
