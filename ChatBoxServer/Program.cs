using ChatBoxServer.Dtos;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
const string GetChatBoxEndpointName = "chatBox";

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add controller support
builder.Services.AddControllers(); // Add this line to support controllers

var app = builder.Build();

// Use the CORS policy
app.UseCors("AllowAll");

List<RobotHelper> chatBox = new List<RobotHelper>
{

    new RobotHelper(1, "Kayhan", "kayhan@example.com", new DateOnly(2024, 8, 15), "Hello, I need help, please."),
    new RobotHelper(2, "Ahmet", "ahmet@example.com", new DateOnly(2024, 8, 16), "I need help with my payments."),
    new RobotHelper(3, "Zeynep", "zeynep@example.com", new DateOnly(2024, 8, 17), "Can someone assist with my order?"),
    new RobotHelper(4, "Elif", "elif@example.com", new DateOnly(2024, 8, 18), "I'm having trouble logging in."),
    new RobotHelper(5, "Mert", "mert@example.com", new DateOnly(2024, 8, 19), "Is there a discount code available?"),
    new RobotHelper(6, "Aylin", "aylin@example.com", new DateOnly(2024, 8, 20), "I can't find the product I'm looking for."),
    new RobotHelper(7, "Emir", "emir@example.com", new DateOnly(2024, 8, 21), "How do I track my shipment?"),
    new RobotHelper(8, "Deniz", "deniz@example.com", new DateOnly(2024, 8, 22), "My payment was declined, what should I do?"),
    new RobotHelper(9, "Melis", "melis@example.com", new DateOnly(2024, 8, 23), "I need help updating my account information."),
    new RobotHelper(10, "Bora", "bora@example.com", new DateOnly(2024, 8, 24), "Can I cancel my order?")

};

// Get all chatBox items
app.MapGet("chatBox", () => chatBox);

// Get a specific chatBox item by id
app.MapGet("chatBox/{id}", (int id) => 
{
    var chat = chatBox.Find(c => c.Id == id);
    return chat is not null ? Results.Ok(chat) : Results.NotFound();
}).WithName(GetChatBoxEndpointName);

// POST /chatBox
app.MapPost("chatBox", (CreateChatBoxDto newChat) => {
    Console.WriteLine("Received POST request");
    Console.WriteLine($"Id: {newChat.Id}, Name: {newChat.Name}, Email: {newChat.Email}, DateCreated: {newChat.CreatedAt}, ChatText: {newChat.ChatMessage}");

    var createdAt = newChat.CreatedAt != default(DateTime) ? newChat.CreatedAt : DateTime.Now;
    var chatMessage = !string.IsNullOrWhiteSpace(newChat.ChatMessage) ? newChat.ChatMessage : "No message provided";

    var chat = new RobotHelper(
        chatBox.Count + 1,
        newChat.Name,
        newChat.Email,
        DateOnly.FromDateTime(createdAt),
        chatMessage
    );

    chatBox.Add(chat);

    return Results.CreatedAtRoute(GetChatBoxEndpointName, new { id = chat.Id }, chat);
});

// Map the controllers
app.MapControllers(); // Add this line to map controller endpoints, including the upload endpoint

app.MapGet("/", () => "Hello World!");

app.Run();