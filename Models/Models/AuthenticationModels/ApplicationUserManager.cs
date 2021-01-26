using Microsoft.AspNet.Identity;

namespace CorporateQnAModels.Models.AuthenticationModels
{
    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store) : base(store)
        {
        }
    }
}
