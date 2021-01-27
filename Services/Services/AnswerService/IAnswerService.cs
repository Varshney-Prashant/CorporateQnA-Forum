using CorporateQnAModels.Models.CoreModels;
using System.Collections.Generic;

namespace CorporateQnA.Services.AnswerService
{
    public interface IAnswerService
    {
        IEnumerable<Answer> GetAnswers();
        Answer GetAnswer(int id);
        int PostAnswer(Answer answer);
        void PutAnswer(int id, Answer answer);
        void DeleteAnswer(int id);
    }
}
