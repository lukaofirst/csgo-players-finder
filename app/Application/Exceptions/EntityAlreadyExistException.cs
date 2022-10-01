namespace Application.Exceptions
{
    public class EntityAlreadyExistException : ApplicationException
    {
        public EntityAlreadyExistException(string message) : base(message)
        {
        }
    }
}
