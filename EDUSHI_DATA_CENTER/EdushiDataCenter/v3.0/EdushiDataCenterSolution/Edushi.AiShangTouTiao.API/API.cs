using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Edushi.AiShangTouTiao.API
{
    public class API
    {
        #region 获取爱上头条接口内容
        /// <summary>
        /// 获取爱上头条接口内容
        /// </summary>
        /// <param name="url">接口URL</param>
        /// <param name="htHeaders">请求头</param>
        /// <returns></returns>
        public static string GetApiResult(string url, System.Collections.Hashtable htHeaders, ref string exMessage, ref int statusCode)
        {
            return PageRequest.Post(url, "POST", "application/json", htHeaders, System.Text.Encoding.UTF8.GetBytes(""), "utf-8", ref exMessage, ref statusCode);
        }
        #endregion
    }
}