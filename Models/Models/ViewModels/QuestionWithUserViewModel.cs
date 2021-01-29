using CorporateQnAModels.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Models.ViewModels
{
    public class QuestionWithUserViewModel
    {
        public int QuestionId { get; set; }
        public string Title { get; set; }       
        public string Description { get; set; }
        public string UserFullName { get; set; }
        public QuestionStatus Status { get; set; }
        public DateTime PostingTime { get; set; }
        public int AnswersCount { get; set; }
        public int CategoryId { get; set; }
        public string UserId { get; set; }
        
    }
}
