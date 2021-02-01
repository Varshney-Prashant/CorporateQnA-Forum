using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateQnAModels.Models.ViewModels
{
    public class UserInfoViewModel
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string ImageUrl { get; set; }
        public string Designation { get; set; }
        public string Company { get; set; }
        public int NoOfLikes { get; set; }
        public int NoOfDislikes { get; set; }
        public int QuestionsAsked { get; set; }
        public int QuestionsAnswered { get; set; }
        public int QuestionsSolved { get; set; }

    }
}
