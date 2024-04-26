using DatingApp.Exceptions;
using System.Net;

namespace DatingApp.Middleware
{
    public class ExceptionMiddleware
    {
        public ILogger<ExceptionMiddleware> logger { get; set; }
        public RequestDelegate requestDelegate { get; set; }
        public IHostEnvironment environment { get; set; }
        public ExceptionMiddleware(ILogger<ExceptionMiddleware> Logger, RequestDelegate RequestDelegate, IHostEnvironment Environment)
        {
            logger = Logger;
            requestDelegate = RequestDelegate;
            environment = Environment;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await requestDelegate(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex,ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                if(environment.IsDevelopment())
                {
                    await context.Response.WriteAsync(new CustomException()
                    {
                        statusCode = context.Response.StatusCode,
                        message = ex.Message,
                        details = ex.StackTrace?.ToString()
                    }.ToString());
                }
                else
                {
                    await context.Response.WriteAsync(new CustomException()
                    {
                        statusCode = context.Response.StatusCode,
                        message = ex.Message,
                        details = "Internal server error"
                    }.ToString());
                }
               
            }
        }
    }
}