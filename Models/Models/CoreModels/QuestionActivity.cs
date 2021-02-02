using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateQnAModels.Models.CoreModels
{
    public class QuestionActivity
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public int ViewCount { get; set; }
        public int UpVotes { get; set; }

    }
}
