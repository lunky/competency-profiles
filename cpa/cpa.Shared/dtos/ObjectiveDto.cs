using cpa.Shared.enums;

namespace cpa.Shared.dtos
{
	public class ObjectiveDto
	{
		public int Id { get; set; }
		public bool Communication { get; set; }
		public bool Leadership { get; set; }
		public bool Interpersonal { get; set; }
		public bool Conflict { get; set; }
		public bool Citizenship { get; set; }
		public int Score { get; set; }
		public GateLevel GateLevel { get; set; }
		public int CompetencyWeighting { get; set; }
		public string Description { get; set; }
		public string SupportingExample { get; set; }
		public string CounterExample { get; set; }
		public string Evidence { get; set; }
		public bool IsMet { get; set; }
	}
}