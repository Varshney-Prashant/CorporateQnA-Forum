using AutoMapper;
using CorporateQnAModels.Models;
using System.Collections.Generic;
using System.Linq;

namespace MappingExtensions
{
    public static class MappingExtensions
    {
        private static readonly IMapper Mapper = CorporateQnAMapping.Mapper;
        public static T MapTo<T>(this object source)
        {
            return (source == default(object) ? default(T) : Mapper.Map<T>(source));
        }

        public static IEnumerable<TDestination> MapCollectionTo<TSource, TDestination>(this IEnumerable<TSource> source)
        {
            return (source == null ? null : Mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(source));
        }

        public static IMappingExpression<TSource, TDestination> IgnoreAllNonExisting<TSource, TDestination>(this IMappingExpression<TSource, TDestination> expression)
        {
            var sourceType = typeof(TSource);
            var destinationType = typeof(TDestination);
            var existingMaps = Mapper.ConfigurationProvider.GetAllTypeMaps().First(x => x.SourceType.Equals(sourceType) && x.DestinationType.Equals(destinationType));
            foreach (var property in existingMaps.GetUnmappedPropertyNames())
            {
                expression.ForMember(property, opt => opt.Ignore());
            }
            return expression;
        }
    }
}
