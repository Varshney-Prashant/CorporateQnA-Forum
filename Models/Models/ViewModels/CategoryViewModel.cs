using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateQnAModels.Models.ViewModels
{
    public class CategoryViewModel
    {
		public int CategoryId { get; set; }
		public string CategoryName { get; set; }
		public string CategoryDescription { get; set; }
		public int QuestionId { get; set; }
		public int DayDiff { get; set; }
	}
}
