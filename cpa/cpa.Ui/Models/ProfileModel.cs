using System.Collections.Generic;
using Newtonsoft.Json;

namespace cpa.Ui
{
	public class ProfileModel
	{
		[JsonProperty(PropertyName = "userId")]
		public string UserId { get; set; }
		[JsonProperty(PropertyName = "displayName")]
		public string DisplayName { get; set; }
		[JsonProperty(PropertyName = "level")]
		public string Level { get; set; }

		[JsonProperty(PropertyName = "objectives")]
		public virtual ICollection<ObjectiveModel> MetObjectives { get; set; }
	}
}