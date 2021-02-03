using MappingExtensions;
using System;
using System.Collections.Generic;
using System.Configuration;
using DataModels = CorporateQnAModels.Models.DataModels;
using CoreModels = CorporateQnAModels.Models.CoreModels;
using ViewModels = CorporateQnAModels.Models.ViewModels;

namespace CorporateQnA.Services.AnswerService
{
    public class AnswerService : IAnswerService
    {

        private readonly PetaPoco.Database db;
        public AnswerService()
        {
            db = new PetaPoco.Database(ConfigurationManager.ConnectionStrings["CorporateQNA"].ConnectionString, "System.Data.SqlClient");
        }

        public IEnumerable<CoreModels.Answer> GetAnswers()
        {
            List<DataModels.Answer> answers = db.Fetch<DataModels.Answer>("SELECT * FROM Answers WHERE IsDeleted=0");
            return answers.MapCollectionTo<DataModels.Answer, CoreModels.Answer>();
        }

        public IEnumerable<ViewModels.AnswerWithUserViewModel> GetAnswerWithUser(int id)
        {
            return db.Fetch<DataModels.AnswerWithUserViewModel>(
                    @"SELECT * FROM AnswerWithUserView WHERE QuestionId=@id ORDER BY NoOfLikes DESC, NoOfDisLikes",
                    new { id }
                    ).MapCollectionTo<DataModels.AnswerWithUserViewModel, ViewModels.AnswerWithUserViewModel>();
        }

        public CoreModels.Answer GetAnswer(int id)
        {
            DataModels.Answer answer = db.SingleOrDefault<DataModels.Answer>(
                                                                    @"SELECT * FROM Answers WHERE IsDeleted=0 AND Id=@id",
                                                                    new { id });
            return answer.MapTo<CoreModels.Answer>();
        }

        public int PostAnswer(CoreModels.Answer answer)
        {
            return Convert.ToInt32(db.Insert(
                answer.MapTo<DataModels.Answer>())
                );
        }

        public void PutAnswer(int id, CoreModels.Answer answer)
        {
            var currentAnswer = db.SingleOrDefault<DataModels.Answer>(id)
                                  .MapTo<CoreModels.Answer>();
            if (currentAnswer != null)
            {
                db.Update(answer.MapTo<DataModels.Answer>());
            }
        }

        public void DeleteAnswer(int id)
        {
            var answer = db.SingleOrDefault<DataModels.Answer>(id)
                           .MapTo<CoreModels.Answer>();
            if (answer != null)
            {
                db.Execute(@"UPDATE Answers SET IsDeleted=1, DateDeleted=@CurrentDate WHERE Id=@Id", new { Id = id, CurrentDate = DateTime.Now });
            }
        }

    }
}