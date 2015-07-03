using System.Collections.Generic;

namespace cpa.Ui
{
	public class CompetencyProfileModel
	{
        public string DisplayName { get; set; }
		public IEnumerable<ObjectiveModel> data { get; set; }
	    public string UserId { get; set; }
	}
}