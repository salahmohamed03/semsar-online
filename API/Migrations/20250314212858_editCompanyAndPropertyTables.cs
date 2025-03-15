using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Semsar_online.Migrations
{
    /// <inheritdoc />
    public partial class editCompanyAndPropertyTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "26ec72c3-6e18-43e8-8f01-eca4732106bf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "80546d2f-48dd-49ca-b278-aadcc868d41f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9e4ed66a-c364-4e5a-bae3-2640f7fb1a92");

            migrationBuilder.AddColumn<string>(
                name: "Images",
                table: "Properties",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Images",
                table: "Properties");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Companies");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "26ec72c3-6e18-43e8-8f01-eca4732106bf", "95cf941b-8cb4-441a-84a8-e8eb6b7f1bae", "Admin", "ADMIN" },
                    { "80546d2f-48dd-49ca-b278-aadcc868d41f", "1c584855-665a-4a8c-9ecd-b3ec752c6bd8", "Client", "CLIENT" },
                    { "9e4ed66a-c364-4e5a-bae3-2640f7fb1a92", "c4415e47-6c74-4d2a-af1a-1e76fca6af08", "Company", "COMPANY" }
                });
        }
    }
}
