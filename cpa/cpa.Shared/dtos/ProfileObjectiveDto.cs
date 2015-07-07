namespace cpa.Shared.dtos
{
    public class ProfileObjectiveDto
    {
        public string UserId { get; set; }
        public int ObjectiveId { get; set; }
        public string Evidence { get; set; }
        public bool IsObjectiveMet { get; set; }
    }
}