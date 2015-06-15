using cpa.Shared.enums;
using Newtonsoft.Json;

namespace cpa.Ui
{
	public class ObjectiveModel
	{
		[JsonProperty(PropertyName = "objectiveId")]
		public int Id { get; set; }
		[JsonProperty(PropertyName = "communication")]
		public bool Communication { get; set; }
		[JsonProperty(PropertyName = "leadership")]
		public bool Leadership { get; set; }
		[JsonProperty(PropertyName = "interpersonal")]
		public bool Interpersonal { get; set; }
		[JsonProperty(PropertyName = "conflict")]
		public bool Conflict { get; set; }
		[JsonProperty(PropertyName = "citizenship")]
		public bool Citizenship { get; set; }
		[JsonProperty(PropertyName = "score")]
		public int Score { get; set; }
		[JsonProperty(PropertyName = "gateLevel")]
		public string GateLevel { get; set; }
		[JsonProperty(PropertyName = "competencyWeighting")]
		public int CompetencyWeighting { get; set; }
		[JsonProperty(PropertyName = "description")]
		public string Description { get; set; }
		[JsonProperty(PropertyName = "supportingExample")]
		public string SupportingExample { get; set; }
		[JsonProperty(PropertyName = "counterExample")]
		public string CounterExample { get; set; }
		public bool IsMet { get; set; }
	}
}