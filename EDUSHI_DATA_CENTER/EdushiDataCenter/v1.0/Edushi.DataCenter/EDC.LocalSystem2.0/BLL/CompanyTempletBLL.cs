using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Web;

namespace EDC.LocalSystem.BLL
{
    public class CompanyTempletBLL
    {
        const string LOCAL_SYSTEM_KEY = "LocalSystem";
        public static string CompanyTempletReplace(string sReplaceHtml)
        {
            sReplaceHtml = sReplaceHtml.Replace("{$模版开始}", GetIncFile("SystemHeader.config"));
            sReplaceHtml = sReplaceHtml.Replace("{$系统脚本}", GetIncFile("SystemScript.config"));
            sReplaceHtml = sReplaceHtml.Replace("{$企业ID}", "<%=_MCI_ID%>");
            sReplaceHtml = sReplaceHtml.Replace("{$城市代码}", "<%=_MCI_CityCode%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业X}", "<%=_MCI_X%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业Y}", "<%=_MCI_Y%>");
            sReplaceHtml = sReplaceHtml.Replace("{$形象展示}", "<%=_MCI_Pic%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业名称}", "<%=_MCI_Name%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业等级}", "<%=_MCI_Level%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业电话}", "<%=_MCI_Tel%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业地址}", "<%=_MCI_Address%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业网址}", "<%=_MCI_Internet%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业传真}", "<%=_MCI_Fax%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业邮编}", "<%=_MCI_Post%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业公交}", "<%=_MCI_Traffic%>");

            sReplaceHtml = sReplaceHtml.Replace("{$企业简介}", "<%=_MCI_Des%>");
            sReplaceHtml = sReplaceHtml.Replace("{$企业备注}", "<%=_MCI_Remark%>");
            sReplaceHtml = sReplaceHtml.Replace("{$商家关键字}", "<%=_MCI_Keyword%>");


            sReplaceHtml = sReplaceHtml.Replace("{$城市路径}", "<%=this.CityPath%>");
            if (sReplaceHtml.Contains("{$产品列表}"))
            {
                sReplaceHtml = sReplaceHtml.Replace("{$产品列表}", GetIncFile("ProductList.config"));
            }
            if (sReplaceHtml.Contains("{$企业点评和留言}"))
            {
                sReplaceHtml = sReplaceHtml.Replace("{$企业点评和留言}", GetIncFile("CommentGuestBook.config"));
            }
            if (sReplaceHtml.Contains("{$企业资讯}"))
            {
                sReplaceHtml = sReplaceHtml.Replace("{$企业资讯}", GetIncFile("News.config"));
            }

            sReplaceHtml = sReplaceHtml.Replace(EDC.Framework.EdushiDataCenter.Current.ApplicationConfigProvider.GetApplicationProperty(LOCAL_SYSTEM_KEY, "UploadFileUrl").EAP_Value + "/cityresource2/", System.Configuration.ConfigurationManager.AppSettings["PicUrl"]); //将后台的资源访问路径调整为前台
            return sReplaceHtml;
        }

        private static string GetIncFile(string sFileName)
        {
            return File.ReadAllText(HttpContext.Current.Server.MapPath("/Member/Company/Templet/" + sFileName), Encoding.UTF8);
        }
    }
}
