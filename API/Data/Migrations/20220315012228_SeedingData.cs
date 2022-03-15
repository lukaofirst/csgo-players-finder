using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class SeedingData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerTrophy_Players_PlayerId",
                table: "PlayerTrophy");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerTrophy_Trophies_TrophyId",
                table: "PlayerTrophy");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlayerTrophy",
                table: "PlayerTrophy");

            migrationBuilder.RenameTable(
                name: "PlayerTrophy",
                newName: "PlayerTrophies");

            migrationBuilder.RenameIndex(
                name: "IX_PlayerTrophy_TrophyId",
                table: "PlayerTrophies",
                newName: "IX_PlayerTrophies_TrophyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlayerTrophies",
                table: "PlayerTrophies",
                columns: new[] { "PlayerId", "TrophyId" });

            migrationBuilder.InsertData(
                table: "Players",
                columns: new[] { "Id", "Age", "IsActive", "Name", "Nationality", "Nickname", "TeamId" },
                values: new object[] { 1, 27, true, "Epitácio Pessoa", "Brazil", "TACO", 3 });

            migrationBuilder.InsertData(
                table: "Players",
                columns: new[] { "Id", "Age", "IsActive", "Name", "Nationality", "Nickname", "TeamId" },
                values: new object[] { 2, 30, true, "Gabriel Toledo", "Brazil", "FalleN", 1 });

            migrationBuilder.InsertData(
                table: "Players",
                columns: new[] { "Id", "Age", "IsActive", "Name", "Nationality", "Nickname", "TeamId" },
                values: new object[] { 3, 25, true, "Andrei Piovezan", "Brazil", "arT", 2 });

            migrationBuilder.InsertData(
                table: "PlayerTrophies",
                columns: new[] { "PlayerId", "TrophyId" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "PlayerTrophies",
                columns: new[] { "PlayerId", "TrophyId" },
                values: new object[] { 2, 2 });

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerTrophies_Players_PlayerId",
                table: "PlayerTrophies",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerTrophies_Trophies_TrophyId",
                table: "PlayerTrophies",
                column: "TrophyId",
                principalTable: "Trophies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerTrophies_Players_PlayerId",
                table: "PlayerTrophies");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerTrophies_Trophies_TrophyId",
                table: "PlayerTrophies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlayerTrophies",
                table: "PlayerTrophies");

            migrationBuilder.DeleteData(
                table: "PlayerTrophies",
                keyColumns: new[] { "PlayerId", "TrophyId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "PlayerTrophies",
                keyColumns: new[] { "PlayerId", "TrophyId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.RenameTable(
                name: "PlayerTrophies",
                newName: "PlayerTrophy");

            migrationBuilder.RenameIndex(
                name: "IX_PlayerTrophies_TrophyId",
                table: "PlayerTrophy",
                newName: "IX_PlayerTrophy_TrophyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlayerTrophy",
                table: "PlayerTrophy",
                columns: new[] { "PlayerId", "TrophyId" });

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerTrophy_Players_PlayerId",
                table: "PlayerTrophy",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerTrophy_Trophies_TrophyId",
                table: "PlayerTrophy",
                column: "TrophyId",
                principalTable: "Trophies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
