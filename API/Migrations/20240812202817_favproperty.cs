using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Semsar_online.Migrations
{
    /// <inheritdoc />
    public partial class favproperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5b832015-eef3-499e-b190-f7335c8a5079");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8f23ec58-85b0-45a0-a838-371a1c7f27c3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a20d0285-18d5-4f31-8f04-7dccb0a77260");

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Properties",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "deleted",
                table: "Properties",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Favorite",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PropertyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorite", x => new { x.UserId, x.Id });
                    table.ForeignKey(
                        name: "FK_Favorite_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favorite_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "21786df4-43b4-417e-828d-dbc47fea697f", "ea132c17-c92a-4c18-bc94-f16c103817bf", "Company", "COMPANY" },
                    { "45d2926e-8871-4475-98cf-735725907d93", "9d14a913-9085-4f5e-8ff1-68a6631777fc", "Admin", "ADMIN" },
                    { "db380a82-f1f7-4c50-9dd5-7b330c6a5b9d", "26c07ac3-e40b-4411-bbd2-3b96941742e4", "Client", "CLIENT" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Favorite_PropertyId",
                table: "Favorite",
                column: "PropertyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Favorite");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "21786df4-43b4-417e-828d-dbc47fea697f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "45d2926e-8871-4475-98cf-735725907d93");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "db380a82-f1f7-4c50-9dd5-7b330c6a5b9d");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "deleted",
                table: "Properties");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5b832015-eef3-499e-b190-f7335c8a5079", "51b1e118-b3eb-4e28-8902-a431f0626c67", "Client", "CLIENT" },
                    { "8f23ec58-85b0-45a0-a838-371a1c7f27c3", "e91a3e14-8580-44c4-9633-fca0536b06d1", "Company", "COMPANY" },
                    { "a20d0285-18d5-4f31-8f04-7dccb0a77260", "af5f3bfa-eac7-41e3-b21a-5e6dfeacd8ef", "Admin", "ADMIN" }
                });
        }
    }
}
