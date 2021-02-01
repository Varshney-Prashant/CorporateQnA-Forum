using ViewModels=CorporateQnAModels.Models.ViewModels;
using DataModels = CorporateQnAModels.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MappingExtensions;

namespace Services.Services.UserServices
{
    public class UserService:IUserService
    {
        private readonly PetaPoco.Database db;
        public UserService()
        {
            db = new PetaPoco.Database(ConfigurationManager.ConnectionStrings["CorporateQNA"].ConnectionString, "System.Data.SqlClient");
        }

        public IEnumerable<ViewModels.UserInfoViewModel> GetUsers()
        {
            return db.Fetch<DataModels.UserInfoViewModel>("SELECT * FROM UserInfoView")
                .MapCollectionTo<DataModels.UserInfoViewModel, ViewModels.UserInfoViewModel>();
                ;
        }
    }
}
