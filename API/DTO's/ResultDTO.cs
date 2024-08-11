namespace Semsar_online.DTO_s
{
    public class ResultDTO
    {
        public bool IsSuccess { get; set; } = false;
        public string? Message { get; set; }
        public ResultDTO(string message,bool isSuccess) 
        {
            Message = message;
            IsSuccess = isSuccess;
        }
        public ResultDTO(string message) {
            Message = message;
        }
    }
}
