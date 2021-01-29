using MappingExtensions;
using System;
using System.Collections.Generic;
using System.Configuration;
using DataModels = CorporateQnAModels.Models.DataModels;

namespace CorporateQnA.Services.AnswerService
{
    public class AnswerService : IAnswerService
    {

        private readonly PetaPoco.Database db;
        public AnswerService()
        {
            db = new PetaPoco.Database(ConfigurationManager.ConnectionStrings["CorporateQNA"].ConnectionString, "System.Data.SqlClient");
        }

        public IEnumerable<CorporateQnAModels.Models.CoreModels.Answer> GetAnswers()
        {
            List<DataModels.Answer> answers = db.Fetch<DataModels.Answer>("SELECT * FROM Answers WHERE IsDeleted=0");
            return answers.MapCollectionTo<DataModels.Answer, CorporateQnAModels.Models.CoreModels.Answer>();
        }

        public IEnumerable<CorporateQnAModels.Models.ViewModels.AnswerWithUserViewModel> GetAnswerWithUser(int id)
        {
            return db.Fetch<DataModels.AnswerWithUserViewModel>(
                    @"SELECT * FROM AnswerWithUserView WHERE QuestionId=@id ORDER BY NoOfLikes DESC, NoOfDisLikes",
                    new { id }
                    ).MapCollectionTo<DataModels.AnswerWithUserViewModel, CorporateQnAModels.Models.ViewModels.AnswerWithUserViewModel>();
        }

        public CorporateQnAModels.Models.CoreModels.Answer GetAnswer(int id)
        {
            DataModels.Answer answer = db.SingleOrDefault<DataModels.Answer>(
                                                                    @"SELECT * FROM Answers WHERE IsDeleted=0 AND Id=@id",
                                                                    new { id });
            return answer.MapTo<CorporateQnAModels.Models.CoreModels.Answer>();
        }

        public int PostAnswer(CorporateQnAModels.Models.CoreModels.Answer answer)
        {
            return Convert.ToInt32(db.Insert(
                answer.MapTo<DataModels.Answer>())
                );
        }

        public void PutAnswer(int id, CorporateQnAModels.Models.CoreModels.Answer answer)
        {
            var currentAnswer = db.SingleOrDefault<DataModels.Answer>(id)
                                  .MapTo<CorporateQnAModels.Models.CoreModels.Answer>();
            if (currentAnswer != null)
            {
                db.Update(answer.MapTo<DataModels.Answer>());
            }
        }

        public void DeleteAnswer(int id)
        {
            var answer = db.SingleOrDefault<DataModels.Answer>(id)
                           .MapTo<CorporateQnAModels.Models.CoreModels.Answer>();
            if (answer != null)
            {
                db.Execute(@"UPDATE Answers SET IsDeleted=1, DateDeleted=@CurrentDate WHERE Id=@Id", new { Id = id, CurrentDate = DateTime.Now });
            }
        }

    }
}