using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Semsar_online.Migrations
{
    /// <inheritdoc />
    public partial class images : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Companies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "21786df4-43b4-417e-828d-dbc47fea697f", "ea132c17-c92a-4c18-bc94-f16c103817bf", "Company", "COMPANY" },
                    { "45d2926e-8871-4475-98cf-735725907d93", "9d14a913-9085-4f5e-8ff1-68a6631777fc", "Admin", "ADMIN" },
                    { "db380a82-f1f7-4c50-9dd5-7b330c6a5b9d", "26c07ac3-e40b-4411-bbd2-3b96941742e4", "Client", "CLIENT" }
                });
        }
    }
}
