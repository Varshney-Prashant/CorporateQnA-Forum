using Microsoft.AspNet.Identity.EntityFramework;

namespace Models.Models.AuthenticationModels
{
    public class AuthenticationContext : IdentityDbContext<ApplicationUser>
    {
        public AuthenticationContext() : base("CorporateQNA", throwIfV1Schema:false)
        {

        }
    }
}
