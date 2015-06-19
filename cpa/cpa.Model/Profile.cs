using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace cpa.Model
{
	public class Profile : EntityBase
	{
		public Profile()
		{
			Objectives = new Collection<ProfileObjective>();
		}

		public string UserId { get; set; }
		public string DisplayName { get; set; }
		public string Level { get; set; }
		
		public virtual ICollection<ProfileObjective> Objectives { get; set; }
	}
}