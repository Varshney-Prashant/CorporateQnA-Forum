using Microsoft.AspNet.Identity.EntityFramework;

namespace CorporateQnAModels.Models.AuthenticationModels
{
    public class ApplicationUserStore : UserStore<ApplicationUser>
    {
        public ApplicationUserStore(AuthenticationContext context) : base(context)
        {
        }
    }
}
