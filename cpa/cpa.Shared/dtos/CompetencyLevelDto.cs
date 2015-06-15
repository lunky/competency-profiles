namespace cpa.Shared.dtos
{
	public class CompetencyLevelDto
	{
		public int Id { get; set; }
		public string GateLevelDescription { get; set; }
		public string Description { get; set; }
		public int MinimumScore { get; set; }
		public int MinimumGateScore { get; set; }
	}
}