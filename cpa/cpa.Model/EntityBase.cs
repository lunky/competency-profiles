using System.ComponentModel.DataAnnotations;

namespace cpa.Model
{
	public class EntityBase
	{
		[Key]
		public int Id { get; set; }
	}
}