using MappingExtensions;
using System;
using System.Collections.Generic;
using System.Configuration;

namespace CorporateQnA.Services.QuestionService
{
    public class QuestionService : IQuestionService
    {
        private readonly PetaPoco.Database db;
        public QuestionService()
        {
            db = new PetaPoco.Database(ConfigurationManager.ConnectionStrings["CorporateQNA"].ConnectionString, "System.Data.SqlClient");
        }

        public IEnumerable<Models.Models.ViewModels.QuestionWithUserViewModel> GetQuestions()
        {
            List<CorporateQnAModels.Models.DataModels.QuestionWithUserViewModel> questions = db.Fetch<CorporateQnAModels.Models.DataModels.QuestionWithUserViewModel>("SELECT * FROM QuestionWithUserView ");
            var x= questions.MapCollectionTo<CorporateQnAModels.Models.DataModels.QuestionWithUserViewModel, Models.Models.ViewModels.QuestionWithUserViewModel>();
            return x;
        }

        public CorporateQnAModels.Models.CoreModels.Question GetQuestion(int id)
        {
            CorporateQnAModels.Models.DataModels.Question question = db.SingleOrDefault<CorporateQnAModels.Models.DataModels.Question>(
                                                                        @"SELECT * FROM Questions WHERE IsDeleted=0 AND Id=@id",
                                                                        new { id });
            return question.MapTo<CorporateQnAModels.Models.CoreModels.Question>();
        }

        public Models.Models.ViewModels.QuestionWithUserViewModel GetQuestionWithUser(int id)
        {
            var x= db.SingleOrDefault<CorporateQnAModels.Models.DataModels.QuestionWithUserViewModel>(
                    @"SELECT * FROM QuestionWithUserView WHERE QuestionId=@id",
                    new { id }
                    ).MapTo<Models.Models.ViewModels.QuestionWithUserViewModel>();
            return x;
        }

        public Models.Models.ViewModels.QuestionWithUserViewModel GetQuestionsByCategoryId(int id)
        {
            return db.SingleOrDefault<CorporateQnAModels.Models.DataModels.QuestionWithUserViewModel>(
                    @"SELECT * FROM QuestionWithUserView WHERE CategoryId=@id",
                    new { id }
                    ).MapTo<Models.Models.ViewModels.QuestionWithUserViewModel>();
        }

        public int PostQuestion(CorporateQnAModels.Models.CoreModels.Question question)
        {
            return Convert.ToInt32(db.Insert(
                question.MapTo<CorporateQnAModels.Models.DataModels.Question>())
                );
        }

        public void PutQuestion(int id, CorporateQnAModels.Models.CoreModels.Question question)
        {
            var currentQuestion = db.SingleOrDefault<CorporateQnAModels.Models.DataModels.Question>(id)
                                    .MapTo<CorporateQnAModels.Models.CoreModels.Question>();
            if (currentQuestion != null)
            {
                db.Update(question.MapTo<CorporateQnAModels.Models.DataModels.Question>());
            }
        }

        public void DeleteQuestion(int id)
        {
            var question = db.SingleOrDefault<CorporateQnAModels.Models.DataModels.Question>(id)
                             .MapTo<CorporateQnAModels.Models.CoreModels.Question>();
            if (question != null)
            {
                db.Execute(@"UPDATE Questions SET IsDeleted=1, DateDeleted=@CurrentDate WHERE Id=@Id", new { Id = id, CurrentDate = DateTime.Now });
            }
        }
    }
}