namespace ChatBoxServer.Dtos;

public record class CreateChatBoxDto(int Id, string Name, string Email, DateTime CreatedAt, string? ChatMessage, string? FilePath);

