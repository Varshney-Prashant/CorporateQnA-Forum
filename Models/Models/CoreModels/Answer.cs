﻿using System;

namespace CorporateQnAModels.Models.CoreModels
{
    public class Answer
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int NoOfLikes { get; set; }
        public int NoOfDislikes { get; set; }
        public DateTime PostingTime { get; set; }
        public bool BestAnswer { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; }
       
    }
}
