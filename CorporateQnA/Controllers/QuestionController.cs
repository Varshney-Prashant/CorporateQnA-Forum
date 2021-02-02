using CorporateQnA.Services.QuestionService;
using CorporateQnAModels.Models.CoreModels;
using Models.Models.ViewModels;
using System.Collections.Generic;
using System.Web.Http;

namespace CorporateQnA.Controllers
{
    [RoutePrefix("api/question")]
    public class QuestionController : ApiController
    {
        private readonly IQuestionService QuestionService;
        public QuestionController(IQuestionService questionService)
        {
            QuestionService = questionService;
        }

        [Route("all")]
        public IEnumerable<Models.Models.ViewModels.QuestionWithUserViewModel> Get()
        {
            return QuestionService.GetQuestions();
        }

        // GET: api/Category/5
        [Route("{id}")]
        public Question Get(int id)
        {
            return QuestionService.GetQuestion(id);
        }

        [Route("questionWithUser/{id}")]
        public QuestionWithUserViewModel GetQuestionWithUser(int id)
        {
            return QuestionService.GetQuestionWithUser(id);
        }

        [Route("questionsByCategoryId/{id}")]
        public QuestionWithUserViewModel GetQuestionsByCategoryId(int id)
        {
            return QuestionService.GetQuestionsByCategoryId(id);
        }

        [Route("byUserId/{id}")]
        public IEnumerable<QuestionWithUserViewModel> GetQuestionsByUserId(string id)
        {
            return QuestionService.GetQuestionsByUserId(id);
        }

        [Route("answerCount/{id}")]
        public int GetAnswerCount(int id)
        {
            return QuestionService.GetAnswerCount(id);
        }

        // POST: api/Category
        [Route("add")]
        public int Post(Question question)
        {
            return QuestionService.PostQuestion(question);
        }

        // PUT: api/Category/5
        [Route("update/{id}")]
        public void Put(int id, Question question)
        {
            QuestionService.PutQuestion(id, question);
        }

        [Route("updateActivity/{id}")]
        [HttpPut]
        public void UpdateActivity(int id, QuestionActivity activity)
        {
            QuestionService.UpdateActivity(id, activity);
        }

        [Route("delete/{id}")]
        public void Delete(int id)
        {
            QuestionService.DeleteQuestion(id);
        }
    }
}
