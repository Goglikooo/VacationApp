using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VacationAppBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class addNextWorkingDay : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "NextWorkingDay",
                table: "VacationRequests",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextWorkingDay",
                table: "VacationRequests");
        }
    }
}
