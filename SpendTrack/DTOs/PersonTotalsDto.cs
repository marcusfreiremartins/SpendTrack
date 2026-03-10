namespace SpendTrack.Api.DTOs
{
    public record PersonTotalsDto(
        int PersonId,
        string Name,
        decimal TotalIncome,
        decimal TotalExpense,
        decimal Balance
        );
}