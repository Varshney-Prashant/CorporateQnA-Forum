using AutoMapper;
using CorporateQnAModels.Models;
using System.Collections.Generic;

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
    }
}
