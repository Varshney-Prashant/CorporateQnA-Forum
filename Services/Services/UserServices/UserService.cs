using ViewModels=CorporateQnAModels.Models.ViewModels;
using DataModels = CorporateQnAModels.Models.DataModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MappingExtensions;

namespace CorporateQnAServices.Services.UserServices
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

        public ViewModels.UserInfoViewModel GetUser(string id)
        {
            return db.SingleOrDefault<DataModels.UserInfoViewModel>(@"SELECT * FROM UserInfoView WHERE Id=@id", new { id }).MapTo<ViewModels.UserInfoViewModel>();
        }

        public void Like(string id)
        {
            db.Execute(@"UPDATE AspNetUsers SET NoOfLikes=NoOfLikes+1 WHERE Id=@id", new { id });
        }

        public void Dislike(string id)
        {
            db.Execute(@"UPDATE AspNetUsers SET NoOfDislikes=NoOfDislikes+1 WHERE Id=@id", new { id });
        }
    }
}
