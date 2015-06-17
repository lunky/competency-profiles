using Newtonsoft.Json;

namespace cpa.Ui
{
	public class CompetencyLevelModel
	{
		[JsonProperty(PropertyName = "id")]
		public int Id { get; set; }
		[JsonProperty(PropertyName = "gateLevelDescription")]
		public string GateLevelDescription { get; set; }
		[JsonProperty(PropertyName = "description")]
		public string Description { get; set; }
		[JsonProperty(PropertyName = "minimumScore")]
		public int MinimumScore { get; set; }
		[JsonProperty(PropertyName = "minimumGateScore")]
		public int MinimumGateScore { get; set; }
	}
}