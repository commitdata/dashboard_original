namespace slim_commit.cache
{
    using System;
    using System.Collections.Specialized;
    using System.Configuration;
    using System.Runtime.Caching;

    public static class CommitCache
    {

        private static MemoryCache memCache = MemoryCache.Default;

        public static T Get<T>(string cacheKey)
        {
            T returnItem = (T)memCache[cacheKey];
            return returnItem;
        }

        public static bool TryGet<T>(string cacheKey, out T returnItem)
        {
            returnItem = (T)memCache[cacheKey];
            return returnItem != null;
        }

        public static T Get<T>(string cacheKey, Func<T> getData)
        {
            T returnItem = (T)memCache[cacheKey];
            if (returnItem == null)
            {
                returnItem = getData();
                Set(cacheKey, returnItem);
            }
            return returnItem;
        }

        public static void Set<T>(string cacheKey, T cacheItem)
        {
            memCache.Set(cacheKey, cacheItem, new CacheItemPolicy() { SlidingExpiration = new TimeSpan(0, int.Parse(ConfigurationManager.AppSettings["CacheTimeMinutes"]), 0) });
        }


        public static void Dispose()
        {
            memCache.Dispose();
        }
    }


}