using CorporateQnAModels.Models.CoreModels;
using Models.Models.ViewModels;
using System.Collections.Generic;

namespace CorporateQnA.Services.QuestionService
{
    public interface IQuestionService
    {
        IEnumerable<QuestionWithUserViewModel> GetQuestions();
        IEnumerable<QuestionWithUserViewModel> GetQuestionsByUserId(string id);
        Question GetQuestion(int id);
        QuestionWithUserViewModel GetQuestionWithUser(int id);
        QuestionWithUserViewModel GetQuestionsByCategoryId(int id);       
        int PostQuestion(Question question);
        int PostActivity(QuestionActivity activity);
        int GetAnswerCount(int id);
        void PutQuestion(int id, Question question);
        void UpdateActivity(int id, QuestionActivity activity);
        void DeleteQuestion(int id);
    }
}
