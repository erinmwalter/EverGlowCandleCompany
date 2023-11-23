using EverGlow.DataAccess;
using EverGlow.DataAccess.DbModels;
using System.Reflection;

namespace EverGlow.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile($"appsettings.json", optional: false)
            .AddJsonFile($"appsettings.{EnvironmentName}.json", optional: false, reloadOnChange: true)
            .AddUserSecrets(Assembly.GetExecutingAssembly(), true)
            .AddEnvironmentVariables();

            // Add services to the container.
            builder.Services.AddControllers();


            var dbConnectionOptions = builder.Configuration.GetSection(DbConnectionOptions.Key).Get<DbConnectionOptions>();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbServices(dbConnectionOptions);

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();
            app.MapFallbackToFile("index.html");

            app.Run();
          
        }
        private static string EnvironmentName =>
          Environment
               .GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
               ?.ToLowerInvariant()
          ?? "Development";
    }
}