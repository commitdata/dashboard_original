using slim_commit.cache;
using slim_commit.Controllers;
using slim_commit.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace slim_commit.App_Start
{
    public class WarmUp
    {
        public static void CacheData()
        {
            //CommitCache.Get<List<District>>(districtSingleController.cacheKey, districtSingleController.DistrictFromDB);
            //CommitCache.Get<List<Campus>>(campusSingleController.cacheKey, campusSingleController.CampusFromDB);
        }
        public static void ResetCacheData()
        {
            CommitCache.Dispose();
        }
    }
}