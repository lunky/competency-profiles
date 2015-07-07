using Newtonsoft.Json;

namespace cpa.Ui.Models
{
    public class ProfileObjectiveModel
    {
        [JsonProperty(PropertyName = "objectiveId")]
        public int ObjectiveId { get; set; }

        [JsonProperty(PropertyName = "evidence")]
        public string Evidence { get; set; }

        [JsonProperty(PropertyName = "isObjectiveMet")]
        public bool IsObjectiveMet { get; set; }
    }
}