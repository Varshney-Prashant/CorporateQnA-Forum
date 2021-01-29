using CorporateQnA.Services.AnswerService;
using CorporateQnAModels.Models.CoreModels;
using CorporateQnAModels.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CorporateQnA.Controllers
{
    [RoutePrefix("api/answer")]
    public class AnswerController : ApiController
    {
        private readonly IAnswerService AnswerService;
        public AnswerController(IAnswerService answerService)
        {
            AnswerService = answerService;
        }

        [Route("all")]
        public IEnumerable<Answer> Get()
        {
            return AnswerService.GetAnswers();
        }

        [Route("{id}")]
        public Answer Get(int id)
        {
            return AnswerService.GetAnswer(id);
        }

        [Route("answerWithUser/{id}")]
        public IEnumerable<AnswerWithUserViewModel> GetAnswerWithUser(int id)
        {
            return AnswerService.GetAnswerWithUser(id);
        }

        [Route("add")]
        public int Post(Answer answer)
        {
            return AnswerService.PostAnswer(answer);
        }

        [Route("update/{id}")]
        public void Put(int id, Answer answer)
        {
            AnswerService.PutAnswer(id, answer);
        }

        [Route("delete/{id}")]
        public void Delete(int id)
        {
            AnswerService.DeleteAnswer(id);
        }
    }
}
