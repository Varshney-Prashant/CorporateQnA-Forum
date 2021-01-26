using System;

namespace Models.Models.CoreModels
{
    public class AnswerDTO
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int NoOfLikes { get; set; }
        public int NoOfDislikes { get; set; }
        public DateTime PostingTime { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; }
       
    }
}
