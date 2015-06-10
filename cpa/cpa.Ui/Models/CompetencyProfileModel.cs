using System.Collections.Generic;

namespace cpa.Ui
{
	public class CompetencyProfileModel
	{
		public ProfileSummaryModel summary { get; set; }
		public IEnumerable<ObjectiveModel> data { get; set; }
	}
}