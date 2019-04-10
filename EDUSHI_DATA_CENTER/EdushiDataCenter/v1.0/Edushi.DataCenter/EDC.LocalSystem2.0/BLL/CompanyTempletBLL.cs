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
            sReplaceHtml = sReplaceHtml.Replace("{$ģ�濪ʼ}", GetIncFile("SystemHeader.config"));
            sReplaceHtml = sReplaceHtml.Replace("{$ϵͳ�ű�}", GetIncFile("SystemScript.config"));
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵID}", "<%=_MCI_ID%>");
            sReplaceHtml = sReplaceHtml.Replace("{$���д���}", "<%=_MCI_CityCode%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵX}", "<%=_MCI_X%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵY}", "<%=_MCI_Y%>");
            sReplaceHtml = sReplaceHtml.Replace("{$����չʾ}", "<%=_MCI_Pic%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ����}", "<%=_MCI_Name%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ�ȼ�}", "<%=_MCI_Level%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ�绰}", "<%=_MCI_Tel%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ��ַ}", "<%=_MCI_Address%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ��ַ}", "<%=_MCI_Internet%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ����}", "<%=_MCI_Fax%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ�ʱ�}", "<%=_MCI_Post%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ����}", "<%=_MCI_Traffic%>");

            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ���}", "<%=_MCI_Des%>");
            sReplaceHtml = sReplaceHtml.Replace("{$��ҵ��ע}", "<%=_MCI_Remark%>");
            sReplaceHtml = sReplaceHtml.Replace("{$�̼ҹؼ���}", "<%=_MCI_Keyword%>");


            sReplaceHtml = sReplaceHtml.Replace("{$����·��}", "<%=this.CityPath%>");
            if (sReplaceHtml.Contains("{$��Ʒ�б�}"))
            {
                sReplaceHtml = sReplaceHtml.Replace("{$��Ʒ�б�}", GetIncFile("ProductList.config"));
            }
            if (sReplaceHtml.Contains("{$��ҵ����������}"))
            {
                sReplaceHtml = sReplaceHtml.Replace("{$��ҵ����������}", GetIncFile("CommentGuestBook.config"));
            }
            if (sReplaceHtml.Contains("{$��ҵ��Ѷ}"))
            {
                sReplaceHtml = sReplaceHtml.Replace("{$��ҵ��Ѷ}", GetIncFile("News.config"));
            }

            sReplaceHtml = sReplaceHtml.Replace(EDC.Framework.EdushiDataCenter.Current.ApplicationConfigProvider.GetApplicationProperty(LOCAL_SYSTEM_KEY, "UploadFileUrl").EAP_Value + "/cityresource2/", System.Configuration.ConfigurationManager.AppSettings["PicUrl"]); //����̨����Դ����·������Ϊǰ̨
            return sReplaceHtml;
        }

        private static string GetIncFile(string sFileName)
        {
            return File.ReadAllText(HttpContext.Current.Server.MapPath("/Member/Company/Templet/" + sFileName), Encoding.UTF8);
        }
    }
}
