using CorporateQnA.Services.QuestionService;
using CorporateQnAModels.Models.CoreModels;
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
        public IEnumerable<Question> Get()
        {
            return QuestionService.GetQuestions();
        }

        // GET: api/Category/5
        [Route("{id}")]
        public Question Get(int id)
        {
            return QuestionService.GetQuestion(id);
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

        [Route("delete/{id}")]
        public void Delete(int id)
        {
            QuestionService.DeleteQuestion(id);
        }
    }
}
