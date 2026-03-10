using SpendTrack.Api.Enums;

namespace SpendTrack.Api.DTOs
{
    public record CreateTransactionDto(
        string Description,
        decimal Amount,
        TransactionType Type,
        int CategoryId,
        int PersonId
        );
}