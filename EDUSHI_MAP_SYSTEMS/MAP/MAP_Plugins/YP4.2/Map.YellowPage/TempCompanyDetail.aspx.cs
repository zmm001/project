using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Map.YellowPageBLL.Model;
using Map.YellowPageBLL.DataProvider;
using EDC.Framework.Tools;
using System.Data;
using EDC.Framework.CityConfig;
using Map.YellowPageBLL.Bll;

namespace Map.YellowPage
{
    public partial class TempCompanyDetail : BasePage
    {
        protected string x = "0";
        protected string y = "0";
        protected string CompanyName = string.Empty;
        protected string CompanyType = string.Empty;
        protected string strFlashImages = string.Empty;
        protected string address = string.Empty;
        protected string tel = string.Empty;
        protected string des = string.Empty;
        protected string jdUrl = "#";
        protected string gzUrl = "#";
        protected string fcUrl = "#";
        protected string mapUrl = "#";
        protected DataTable dtCompabyImages = null;
        protected string liHTML = "";
        protected HYIndexDataHelper indexHelper = new HYIndexDataHelper();

        protected void Page_Load(object sender, EventArgs e)
        {

            if (!IsPostBack)
            {
                CompanyDataBind();
            }
        }
        private void CompanyDataBind()
        {
            DataTable dt = indexHelper.GetCompanyInfo(CityCode, Language, CurrentID);

            if (dt != null && dt.Rows.Count > 0)
            {
                DataRow dr = dt.Rows[0];
                string ypurl = this.HuangyeUrl;
                this.lbdh.Text = @"<a href=""" + ypurl + @""" traget='_black'>首页</a>>>
                                          <a href=""" + ypurl + GetStaticLink(ObjToStr(dr["MCT_ParentID"]), "BigTypeName") + @""" target='_blank'>" + ObjToStr(dr["BigTypeName"]) + @"</a>>>
                                          <a href=""" + ypurl + GetStaticLink(ObjToStr(dr["MCT_ID"]), "MCT_TypeName") + @""" target='_blank'>" + ObjToStr(dr["MCT_TypeName"]) + @"</a>>>" + dr["OCName"] + "";
                CompanyName = ObjToStr(dr["OCName"]);
                lblCompanyName.Text = CompanyName;

                CompanyType = ObjToStr(dr["MCT_TypeName"]);

                address = ObjToStr(dr["Address"]);
                des = WebHelper.HtmlFilter(ObjToStr(dr["Introduce"]), 10000); //简介
                tel = ObjToStr(dr["Telephone"]);



                x = ObjToStr(dr["X"]);
                y = ObjToStr(dr["Y"]);

                if (!String.IsNullOrEmpty(x))
                {
                    this.EshopControl.X = Convert.ToInt32(x);
                }
                else
                {
                    this.EshopControl.X = 0;
                }
                if (!String.IsNullOrEmpty(y))
                {
                    this.EshopControl.Y = Convert.ToInt32(y);
                }
                else
                {
                    this.EshopControl.Y = 0;
                }
                this.EshopControl.CurrentID = CurrentID;
                this.EshopControl.TypeValue = 1;
                this.lbtime.Text = ObjToStr(dr["CreateDate"]);

                this.lvInfo.CX = Convert.ToInt32(x);
                this.lvInfo.CY = Convert.ToInt32(y);
                this.lvInfo.PageNum = "100";
                this.lvInfo.PageSize = "1";
                this.lvInfo.Len = "500";
                this.lvInfo.IndexVersion = "6";

                dtCompabyImages = indexHelper.GetCompanyImages(CityCode, Language, CurrentID);
                GetULIndex();

                strFlashImages = this.GetCompanyImg(dtCompabyImages, GetUpImagesPath);
                BindBusInfo();

            }
            else
            {
                Server.Transfer("Error.aspx", true);

            }
        }
        protected int CurrentID
        {
            get
            {
                return SafeRequest("ID", 0); //（有酒店评论的）164340  家乐福 45070
            }
        }
        protected int zpPage
        {
            get
            {
                return SafeRequest("zpPage", 1);
            }
        }

        /// <summary>
        /// 根据参数获取对应配置属性
        /// </summary>
        /// <param name="sPropertyName"></param>
        /// <returns></returns>
        protected string GetSpecialProperty(string sPropertyName)
        {
            return EDC.Framework.EdushiDataCenter.Current.ApplicationConfigProvider.GetApplicationProperty(EDC.Framework.EdushiDataCenter.Current.ApplicationConfigProvider.GetApplicationInfo("LocalSystem"), sPropertyName).EAP_Value;
        }
        /// <summary>
        /// 截取cityCode第一个字母，返回大写，如hz->H
        /// </summary>
        protected string TopCharCity
        {
            get
            {
                if (!String.IsNullOrEmpty(CityCode))
                {
                    return CityCode.Substring(0, 1).ToUpper();
                }
                else
                {
                    return "H";
                }
            }
        }

        /// <summary>
        /// 周边公交
        /// </summary>
        protected void BindBusInfo()
        {
            BusDataHelper busHelper = new BusDataHelper();
            List<BusInfoModel> listBus = busHelper.GetBusJsonObject(EDataCenterUrl, Domain, x, y);
            int count = listBus.Count;
            if (count > 0)
            {
                rptBus.DataSource = listBus;
                rptBus.DataBind();
            }
        }
        public string GetBusLineName(object obj)
        {
            string str = "";
            if (obj != null)
            {
                List<Bus> bus = obj as List<Bus>;
                foreach (Bus b in bus)
                {
                    str += "<a href='http://" + Domain + "?bname=" + b.VehicleName + "&bid=" + b.VehicleID + "' target='_blank'>" + b.VehicleName.Trim() + "</a>" + ",";
                }
                if (str.Length > 1)
                {
                    str = str.Remove(str.Length - 1);
                }
            }
            return str;
        }
        public string GetBusStationUrl(object stationID, object stationName, object stationx, object staiony)
        {
            return "http://" + Domain + "?sid=" + stationID + "&sname=" + HttpUtility.UrlEncode(stationName.ToString()) + "&x=" + stationx + "&y=" + staiony;
        }

        protected void GetULIndex()
        {
            if (dtCompabyImages != null && dtCompabyImages.Rows.Count > 0)
            {
                for (int i = 0; i < dtCompabyImages.Rows.Count; i++)
                {
                    if (i == 0)
                    {
                        liHTML = "<li class='on'>1</li>";
                    }
                    else
                    {
                        liHTML += "<li>" + (i + 1) + "</li>";
                    }
                }
                if (dtCompabyImages.Rows.Count == 1)
                {
                    liHTML = "";
                }
            }
        }
    }
}
