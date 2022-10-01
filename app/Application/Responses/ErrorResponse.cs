namespace Application.Responses
{
    public class ErrorResponse
    {
        public string? Message { get; }
        public int StatusCode { get; }
        public string? StackTrace { get; set; }

        public ErrorResponse(string message, int statusCode, string stackTrace)
        {
            Message = message;
            StatusCode = statusCode;
            StackTrace = stackTrace;
        }
    }
}
