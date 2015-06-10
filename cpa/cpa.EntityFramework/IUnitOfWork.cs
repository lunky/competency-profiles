namespace cpa.EntityFramework
{
	public interface IUnitOfWork
	{
		int SaveChanges(string user);
	}
}