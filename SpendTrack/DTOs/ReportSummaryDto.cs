namespace SpendTrack.Api.DTOs
{
    public record ReportSummaryDto(
        List<PersonTotalsDto> Persons,
        decimal TotalIncome,
        decimal TotalExpense,
        decimal Balance
        );
}