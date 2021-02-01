using Microsoft.AspNet.Identity.EntityFramework;

namespace CorporateQnAModels.Models.AuthenticationModels
{
    public class ApplicationUser:IdentityUser
    {
        public string FullName { get; set; }
        public string Designation { get; set; }
        public string Company { get; set; }
        public string ImageUrl { get; set; }
        public int NoOfLikes { get; set; }
        public int NoOfDislikes { get; set; }

    }
}
