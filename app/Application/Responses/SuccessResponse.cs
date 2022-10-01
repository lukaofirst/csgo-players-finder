namespace Application.Responses
{
    public class SuccessResponse
    {
        public dynamic? Body { get; }
        public int StatusCode { get; }
        public string? Message { get;  }

        public SuccessResponse(int statusCode, dynamic body)
        {
            StatusCode = statusCode;
            Body = body;
        }
        
        public SuccessResponse(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }
    }
}
