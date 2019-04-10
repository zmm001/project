using System;
using System.IO;
using System.Net;
using System.Text;

namespace Edushi.AiShangTouTiao.API
{
    public class PageRequest
    {
        //public string ExecuteQeury(string json_query)
        //{


        //    var response = (HttpWebResponse)request.GetResponse();
        //    using (var sr = new StreamReader(response.GetResponseStream()))
        //    {
        //        return sr.ReadToEnd();
        //    }
        //}

        #region 页面动态请求（POST方式）
        /// <summary>
        /// 页面动态请求（POST方式）
        /// </summary>
        /// <param name="url">请求的URL</param>
        /// <param name="bytes">请求内容</param>
        /// <param name="encoding">编码</param>
        /// <param name="isNeedGetCookie">是否需要获取Cookie</param>
        /// <param name="cc"></param>
        /// <returns></returns>
        public static string Post(string url, string json_query, string encoding, bool isNeedGetCookie, CookieContainer cc)
        {
            string reader = string.Empty;
            HttpWebResponse response = null;
            try
            {
                //创建一个HTTP请求  
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                //Post请求方式  
                request.Method = "POST";
                //内容类型
                request.ContentType = "aplication/json";
                request.Timeout = 1000 * 60;

                //设置请求的ContentLength   
                //request.ContentLength = bytes.Length;

                if (isNeedGetCookie)
                {
                    request.CookieContainer = new CookieContainer();
                }

                //发送请求，获得请求流
                //using (dataStream = request.GetRequestStream())
                //{
                //    dataStream.Write(bytes, 0, bytes.Length);
                //}
                using (var sw = new StreamWriter(request.GetRequestStream()))
                {
                    sw.Write(json_query);
                    sw.Flush();
                    sw.Close();
                }

                //获得响应
                response = (HttpWebResponse)request.GetResponse();
                reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding(encoding)).ReadToEnd();

                if (isNeedGetCookie)
                {
                    cc.Add(response.Cookies);
                }
            }
            catch (Exception)
            {
                return reader;
            }
            finally
            {
                if (response != null)
                {
                    response.Close();
                }
            }
            return reader;
        }
        #endregion

        #region 页面动态请求（POST方式）
        /// <summary>
        /// 页面动态请求（POST方式）
        /// </summary>
        /// <param name="url">API对应的URL</param>
        /// <param name="bytes">字节数组</param>
        /// <param name="encoding">编码格式</param>
        /// <returns></returns>
        public static string Post(string url, byte[] bytes, string encoding)
        {
            string reader = string.Empty;
            HttpWebResponse response = null;
            Stream dataStream = null;
            try
            {
                //创建一个HTTP请求  
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                //Post请求方式  
                request.Method = "POST";
                //内容类型
                request.ContentType = "application/x-www-form-urlencoded";

                //设置请求的ContentLength   
                request.ContentLength = bytes.Length;

                //发送请求，获得请求流
                using (dataStream = request.GetRequestStream())
                {
                    dataStream.Write(bytes, 0, bytes.Length);
                }

                //获得响应
                response = (HttpWebResponse)request.GetResponse();
                reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding(encoding)).ReadToEnd();
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (response != null)
                {
                    response.Close();
                }

                if (dataStream != null)
                {
                    dataStream.Close();
                    dataStream.Dispose();
                }
            }
            return reader;
        }
        #endregion

        #region 动态请求网址（GET方式）
        /// <summary>
        /// 动态请求网址（GET方式）
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static string GetHtml(string url)
        {
            string reader = string.Empty;
            HttpWebResponse response = null;
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = "GET";
                //request.ContentType = "application/json";
                response = (HttpWebResponse)request.GetResponse();
                reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("utf-8")).ReadToEnd();
            }
            catch (Exception ex)
            {

            }
            finally
            {
                if (response != null)
                {
                    response.Close();
                }
            }
            return reader;
        }
        #endregion

        #region 页面动态请求（POST方式）
        /// <summary>
        /// 页面动态请求（POST方式）
        /// </summary>
        /// <param name="url">请求URL</param>
        /// <param name="Method">请求方式</param>
        /// <param name="ContentType">请求数据类型</param>
        /// <param name="htHeaders">请求头</param>
        /// <param name="bytes">请求字节内容</param>
        /// <param name="encoding">响应编码</param>
        /// <returns></returns>
        public static string Post(string url, string Method, string ContentType, System.Collections.Hashtable htHeaders, byte[] bytes, string encoding, ref string exMessage, ref int statusCode)
        {
            string reader = string.Empty;
            HttpWebResponse response = null;
            Stream dataStream = null;
            try
            {
                //创建一个HTTP请求  
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                //Post请求方式  
                request.Method = Method;
                //内容类型
                request.ContentType = ContentType;

                foreach (string key in htHeaders.Keys)
                {
                    request.Headers[key] = htHeaders[key].ToString();
                }

                //设置请求的ContentLength   
                request.ContentLength = bytes.Length;

                //发送请求，获得请求流
                using (dataStream = request.GetRequestStream())
                {
                    dataStream.Write(bytes, 0, bytes.Length);
                }

                //获得响应
                response = (HttpWebResponse)request.GetResponse();
                reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding(encoding)).ReadToEnd();
            }
            catch (Exception ex)
            {
                exMessage = ex.Message;
                if (response != null)
                    statusCode = (int)response.StatusCode;
            }
            finally
            {
                if (response != null)
                {
                    response.Close();
                }

                if (dataStream != null)
                {
                    dataStream.Close();
                    dataStream.Dispose();
                }
            }
            return reader;
        }
        #endregion
    }
}