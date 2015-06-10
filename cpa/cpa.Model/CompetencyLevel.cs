using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cpa.Model
{
	public class CompetencyLevel:EntityBase
	{
		public string GateLevelDescription { get; set; }
		public string Description { get; set; }
		public int MinimumScore { get; set; }
		public int MinimumGateScore { get; set; }
	}
}
