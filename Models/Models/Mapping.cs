using AutoMapper;
using CorporateQnAModels.Models.Enums;

namespace CorporateQnAModels.Models
{
    public class Mapping:Profile
    {
        public Mapping()
        {
            CreateMap<CoreModels.Answer, DataModels.Answer>().ReverseMap();
            CreateMap<CoreModels.Category, DataModels.Category>().ReverseMap();
            CreateMap<DataModels.Question, CoreModels.Question>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (QuestionStatus)src.Status));
            CreateMap<CoreModels.Question, DataModels.Question>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (int)src.Status));
        }
    }
}
