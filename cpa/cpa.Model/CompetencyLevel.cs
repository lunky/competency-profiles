﻿namespace cpa.Model
{
	public class CompetencyLevel : EntityBase
	{
		public string GateLevelDescription { get; set; }
		public string Description { get; set; }
		public int MinimumScore { get; set; }
		public int MinimumGateScore { get; set; }
	}
}
