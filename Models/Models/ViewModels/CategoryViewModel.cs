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
		public int TotalTags { get; set; }
		public int WeekTags { get; set; }
		public int MonthTags { get; set; }
		
	}
}
