namespace SpendTrack.Api.DTOs
{
    public record CategoryTotalsDto(
        int CategoryId,
        string Description,
        decimal TotalIncome,
        decimal TotalExpense,
        decimal Balance
        );
}