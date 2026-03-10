namespace SpendTrack.Api.DTOs
{
    public record CategoryReportSummaryDto(
        List<CategoryTotalsDto> Categories,
        decimal TotalIncome,
        decimal TotalExpense,
        decimal Balance
        );
}