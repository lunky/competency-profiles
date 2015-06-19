namespace cpa.Model
{
	public class ProfileObjective : EntityBase
	{
		public Objective Objective { get; set; }
		public string Evidence { get; set; }
		public bool IsMet { get; set; }
	}
}