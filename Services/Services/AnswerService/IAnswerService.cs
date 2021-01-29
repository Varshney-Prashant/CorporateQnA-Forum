using CorporateQnAModels.Models.CoreModels;
using CorporateQnAModels.Models.ViewModels;
using System.Collections.Generic;

namespace CorporateQnA.Services.AnswerService
{
    public interface IAnswerService
    {
        IEnumerable<Answer> GetAnswers();
        IEnumerable<AnswerWithUserViewModel> GetAnswerWithUser(int id);
        Answer GetAnswer(int id);
        int PostAnswer(Answer answer);
        void PutAnswer(int id, Answer answer);
        void DeleteAnswer(int id);
    }
}
