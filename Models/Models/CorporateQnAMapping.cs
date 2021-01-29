using AutoMapper;
using CorporateQnAModels.Models.Enums;
using MappingExtensions;
using Models.Models.ViewModels;

namespace CorporateQnAModels.Models
{
    public class CorporateQnAMapping:Profile
    {
        public static IMapper Mapper { get; set; }
        /*public static void Init()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CoreModels.Answer, DataModels.Answer>().ReverseMap();
                cfg.CreateMap<CoreModels.Category, DataModels.Category>().ReverseMap();
                cfg.CreateMap<DataModels.Question, CoreModels.Question>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (QuestionStatus)src.Status));
                cfg.CreateMap<CoreModels.Question, DataModels.Question>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (int)src.Status));
            });

            Mapper = config.CreateMapper();
        }*/
        public CorporateQnAMapping()
        {
            this.CreateMap<CoreModels.Answer, DataModels.Answer>().ReverseMap();
            this.CreateMap<CoreModels.Category, DataModels.Category>().ReverseMap();
            this.CreateMap<ViewModels.AnswerWithUserViewModel, DataModels.AnswerWithUserViewModel>().ReverseMap();
            this.CreateMap<QuestionWithUserViewModel,DataModels.QuestionWithUserViewModel>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (int)src.Status));
            this.CreateMap<DataModels.QuestionWithUserViewModel, QuestionWithUserViewModel>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (QuestionStatus)src.Status));
            this.CreateMap<DataModels.Question, CoreModels.Question>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (QuestionStatus)src.Status));
            this.CreateMap<CoreModels.Question, DataModels.Question>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => (int)src.Status));
        }

    }

    /*public class MyRegistrar
    {
        public void Register(Container container)
        {
            // Injectable service
            container.RegisterSingleton<IService, SomeService>();

            // Automapper
            container.RegisterSingleton(() => GetMapper(container));
        }

        private AutoMapper.IMapper GetMapper(Container container)
        {
            var mp = container.GetInstance<MapperProvider>();
            return mp.GetMapper();
        }
    }*/


}
