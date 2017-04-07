namespace slim_commit.Models
{
    /// <summary>
    /// Base response model
    /// </summary>
    public class BaseResponse
    {
        /// <summary>
        /// IsSuccess
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Error message any
        /// </summary>
        public string Message { get; set; }
    }
}