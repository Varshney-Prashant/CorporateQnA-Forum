using CorporateQnAModels.Models.CoreModels;
using Models.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CorporateQnA.Services.QuestionService
{
    public interface IQuestionService
    {
        IEnumerable<Models.Models.ViewModels.QuestionWithUserViewModel> GetQuestions();
        Question GetQuestion(int id);
        QuestionWithUserViewModel GetQuestionWithUser(int id);
        QuestionWithUserViewModel GetQuestionsByCategoryId(int id);
        int PostQuestion(Question question);
        void PutQuestion(int id, Question question);
        void DeleteQuestion(int id);
    }
}
