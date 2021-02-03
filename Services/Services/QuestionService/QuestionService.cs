using MappingExtensions;
using System;
using System.Collections.Generic;
using System.Configuration;
using ViewModels = Models.Models.ViewModels;
using DataModels = CorporateQnAModels.Models.DataModels;
using CoreModels = CorporateQnAModels.Models.CoreModels;

namespace CorporateQnA.Services.QuestionService
{
    public class QuestionService : IQuestionService
    {
        private readonly PetaPoco.Database db;
        public QuestionService()
        {
            db = new PetaPoco.Database(ConfigurationManager.ConnectionStrings["CorporateQNA"].ConnectionString, "System.Data.SqlClient");
        }

        public IEnumerable<ViewModels.QuestionWithUserViewModel> GetQuestions()
        {
            List<DataModels.QuestionWithUserViewModel> questions = db.Fetch<DataModels.QuestionWithUserViewModel>("SELECT * FROM QuestionWithUserView ");
            return questions.MapCollectionTo<DataModels.QuestionWithUserViewModel, ViewModels.QuestionWithUserViewModel>();           
        }

        public IEnumerable<ViewModels.QuestionWithUserViewModel> GetQuestionsByUserId(string id)
        {
            return db.Fetch<DataModels.QuestionWithUserViewModel>(@"SELECT * FROM Questions WHERE UserId=@id", new { id})
                .MapCollectionTo<DataModels.QuestionWithUserViewModel, ViewModels.QuestionWithUserViewModel>();
        }       

        public CoreModels.Question GetQuestion(int id)
        {
            DataModels.Question question = db.SingleOrDefault<DataModels.Question>(
                                                                        @"SELECT * FROM Questions WHERE IsDeleted=0 AND Id=@id",
                                                                        new { id });
            return question.MapTo<CoreModels.Question>();
        }

        public ViewModels.QuestionWithUserViewModel GetQuestionWithUser(int id)
        {
            return db.SingleOrDefault<DataModels.QuestionWithUserViewModel>(
                    @"SELECT * FROM QuestionWithUserView WHERE QuestionId=@id",
                    new { id }
                    ).MapTo<ViewModels.QuestionWithUserViewModel>();
        }

        public ViewModels.QuestionWithUserViewModel GetQuestionsByCategoryId(int id)
        {
            return db.SingleOrDefault<DataModels.QuestionWithUserViewModel>(
                    @"SELECT * FROM QuestionWithUserView WHERE CategoryId=@id",
                    new { id }
                    ).MapTo<ViewModels.QuestionWithUserViewModel>();
        }

        public int GetAnswerCount(int id)
        {
            return db.ExecuteScalar<int>(@"UPDATE Questions SET AnswersCount=AnswersCount+1 OUTPUT CAST(INSERTED.AnswersCount AS INT) WHERE Id=@id", new { id });
        }

        public int PostActivity(CoreModels.QuestionActivity activity)
        {
            return Convert.ToInt32(db.Insert(
                activity.MapTo<DataModels.QuestionActivity>())
                );
        }

        public int PostQuestion(CoreModels.Question question)
        {
            return Convert.ToInt32(db.Insert(
                question.MapTo<DataModels.Question>())
                );
        }

        public void PutQuestion(int id, CoreModels.Question question)
        {
            var currentQuestion = db.SingleOrDefault<DataModels.Question>(id)
                                    .MapTo<CoreModels.Question>();
            if (currentQuestion != null)
            {
                db.Update(question.MapTo<DataModels.Question>());
            }
        }

        public void UpdateActivity(int id, CoreModels.QuestionActivity activity)
        {
            var currentActivity = db.SingleOrDefault<DataModels.QuestionActivity>(id)
                                    .MapTo<CoreModels.QuestionActivity>();
            if (currentActivity != null)
            {
                db.Update(activity.MapTo<DataModels.QuestionActivity>());
            }
        }

        public void DeleteQuestion(int id)
        {
            var question = db.SingleOrDefault<DataModels.Question>(id)
                             .MapTo<CoreModels.Question>();
            if (question != null)
            {
                db.Execute(@"UPDATE Questions SET IsDeleted=1, DateDeleted=@CurrentDate WHERE Id=@Id", new { Id = id, CurrentDate = DateTime.Now });
            }
        }
    }
}