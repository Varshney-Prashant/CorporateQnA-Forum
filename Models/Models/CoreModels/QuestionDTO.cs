﻿using Models.Models.Enums;
using System;

namespace Models.Models.CoreModels
{
    public class QuestionDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public QuestionStatus Status { get; set; }
        public DateTime PostingTime { get; set; }
        public string UserId { get; set; }
        public int CategoryId { get; set; }
    }
}