using CorporateQnAModels.Models.CoreModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateQnA.Services.QuestionService
{
    public interface IQuestionService
    {
        IEnumerable<Question> GetQuestions();
        Question GetQuestion(int id);
        int PostQuestion(Question question);
        void PutQuestion(int id, Question question);
        void DeleteQuestion(int id);
    }
}
