using Microsoft.AspNet.Identity.EntityFramework;

namespace CorporateQnAModels.Models.AuthenticationModels
{
    public class AuthenticationContext : IdentityDbContext<ApplicationUser>
    {
        public AuthenticationContext() : base("CorporateQNA", throwIfV1Schema:false)
        {

        }
    }
}
