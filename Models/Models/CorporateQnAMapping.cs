using AutoMapper;
using CorporateQnAModels.Models.Enums;
using Models.Models.ViewModels;

namespace CorporateQnAModels.Models
{
    public class CorporateQnAMapping:Profile
    {
        public static IMapper Mapper { get; set; }
        public CorporateQnAMapping()
        {
            this.CreateMap<CoreModels.Answer, DataModels.Answer>().ReverseMap();
            this.CreateMap<CoreModels.Category, DataModels.Category>().ReverseMap();
            this.CreateMap<CoreModels.Employee, DataModels.Employee>().ReverseMap();
            this.CreateMap<CoreModels.QuestionActivity, DataModels.QuestionActivity>().ReverseMap();
            this.CreateMap<CoreModels.Question, DataModels.Question>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (int)src.Status));

            this.CreateMap<ViewModels.AnswerWithUserViewModel, DataModels.AnswerWithUserViewModel>().ReverseMap();
            this.CreateMap<ViewModels.CategoryViewModel, DataModels.CategoryViewModel>().ReverseMap();           
            this.CreateMap<QuestionWithUserViewModel,DataModels.QuestionWithUserViewModel>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (int)src.Status));
            this.CreateMap<ViewModels.UserInfoViewModel, DataModels.UserInfoViewModel>().ReverseMap();
            this.CreateMap<DataModels.QuestionWithUserViewModel, QuestionWithUserViewModel>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (QuestionStatus)src.Status));
            this.CreateMap<DataModels.Question, CoreModels.Question>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (QuestionStatus)src.Status));
            
        }

    }
}
