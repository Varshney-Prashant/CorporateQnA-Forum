using AutoMapper;
using Models.Models.CoreModels;
using Models.Models.DataModels;
using Models.Models.Enums;

namespace Models.Models
{
    public class Mapping:Profile
    {
        public Mapping()
        {
            CreateMap<AnswerDTO, Answer>().ReverseMap();
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<Question, QuestionDTO>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (QuestionStatus)src.Status));
            CreateMap<QuestionDTO, Question>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (int)src.Status));
        }
    }
}
