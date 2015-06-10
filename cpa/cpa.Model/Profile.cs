using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace cpa.Model
{
	public class Profile : EntityBase
	{
		public Profile()
		{
			MetObjectives = new Collection<Objective>();
		}
		public string UserId { get; set; }
		public string DisplayName { get; set; }
		public string Level { get; set; }
		
		public virtual ICollection<Objective> MetObjectives { get; set; }
	}
}