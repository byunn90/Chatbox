namespace ChatBoxServer.Dtos;

public record class RobotHelper(int Id, string Name, string Email, DateOnly CreatedAt, string ChatMessage);
