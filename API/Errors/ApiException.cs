namespace API.Errors
{
    public class ApiException : ApiResponse
    {
        public ApiException(int statusCode, string message = null, string details = null) 
            : base(statusCode, message) 
        {
            Details = details;
        }

        //For Internal Server Error with Stack Traces
        public string Details { get; set; }
    }
}
