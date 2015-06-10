using System.Collections.Generic;

namespace cpa.Shared.dtos
{
	public class ProfileDto
	{
		public string UserId { get; set; }
		public string DisplayName { get; set; }
		public string Level { get; set; }

		public virtual ICollection<ObjectiveDto> MetObjectives { get; set; }
	}
}