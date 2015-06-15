using System.Collections.Generic;

namespace cpa.Ui
{
	public class CompetencyProfileModel
	{
		public IEnumerable<ObjectiveModel> data { get; set; }
	}

	public class CompetencyLevelModel
	{
		public string GateLevelDescription { get; set; }
		public string Description { get; set; }
		public int MinimumScore { get; set; }
		public int MinimumGateScore { get; set; }
	}
}