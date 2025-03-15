using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Semsar_online.Migrations
{
    /// <inheritdoc />
    public partial class addAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6f664423-06cc-4837-87bc-3c7eda3ddbcd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d7c182ab-c8b3-436e-af2c-3e265ff01b76");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f684d547-9337-4b61-a3f1-777a21a545c6");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "718c53ef-af93-41c0-980a-dd252b616027", "d166c050-57c5-4585-8c85-46616c4385cf", "Client", "CLIENT" },
                    { "9ffdb40b-48eb-49d0-8dfe-b8e0cd9c35e9", "def64e8d-ff1c-4edd-8f97-52d24f8ecbbe", "Admin", "ADMIN" },
                    { "dd8931ef-0234-4434-9a1f-f2142834fa5f", "e5553511-c2c2-4241-b61a-fe76eca67c82", "Company", "COMPANY" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "Image", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName", "WhatsApp" },
                values: new object[] { "998ed5ad-7c99-48f3-822f-578d09764685", 0, "5bac4f35-1d88-48df-ade7-1f283ed4398c", "admin@gmail.com", true, null, false, null, "ADMIN@GMAIL.COM", "ADMIN", "AQAAAAIAAYagAAAAEB5gYeXu8vHap0egdoa8QuerQNZ/SS2vnGQYw4uRf2id0blANRmHcDw4u5I5AGLqfw==", null, false, "", false, "admin", null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "718c53ef-af93-41c0-980a-dd252b616027");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ffdb40b-48eb-49d0-8dfe-b8e0cd9c35e9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dd8931ef-0234-4434-9a1f-f2142834fa5f");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "998ed5ad-7c99-48f3-822f-578d09764685");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6f664423-06cc-4837-87bc-3c7eda3ddbcd", "e3cfa466-fa19-44cc-b1af-a8c8ad329699", "Company", "COMPANY" },
                    { "d7c182ab-c8b3-436e-af2c-3e265ff01b76", "3843f3ba-9432-44e5-82fc-39fe35035528", "Admin", "ADMIN" },
                    { "f684d547-9337-4b61-a3f1-777a21a545c6", "b35dfe26-d695-4fbf-9737-b4dd1badf7a8", "Client", "CLIENT" }
                });
        }
    }
}
