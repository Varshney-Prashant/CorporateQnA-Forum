using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateQnAModels.Models.ViewModels
{
    public class AnswerWithUserViewModel
    {
        public int AnswerId { get; set; }
        public string Description { get; set; }
        public string UserFullName { get; set; }
        public int NoOfLikes { get; set; }
        public int NoOfDislikes { get; set; }
        public string ImageUrl { get; set; }
        public DateTime PostingTime { get; set; }
        public bool BestAnswer { get; set; }
        public int QuestionId { get; set; }
        public string UserId { get; set; }
    }
}
