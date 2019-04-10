using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Edushi.ZT.Model
{
    /// <summary>
    /// InfoTypeModel:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class InfoTypeModel
    {
        public InfoTypeModel()
        { }

        [BsonRepresentation(BsonType.ObjectId)]
        public string id;

        #region Model
        private int _it_id;
        private string _it_name;
        private string _it_citycode;
        private string _it_key;
        private int _it_rootid = 0;
        private int _it_parentid = 0;
        private string _it_parentpath;
        private int _it_depth = 0;
        private string _it_url;
        private string _it_pic;
        private int _it_order = 0;
        private int _it_isshowfirst = 0;
        private int _it_isallcity = 0;
        private int _it_isjoiner = 0;
        private int _it_state = 0;
        private int _it_issystem = 0;
        private int _it_articalcount = 0;
        private DateTime _it_createdate = DateTime.Now;
        private DateTime _it_updatedate = DateTime.Now;

        /// <summary>
        /// 
        /// </summary>
        public int IT_ID
        {
            set { _it_id = value; }
            get { return _it_id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IT_Name
        {
            set { _it_name = value; }
            get { return _it_name; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IT_CityCode
        {
            set { _it_citycode = value; }
            get { return _it_citycode; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IT_Key
        {
            set { _it_key = value; }
            get { return _it_key; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IT_RootID
        {
            set { _it_rootid = value; }
            get { return _it_rootid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IT_ParentID
        {
            set { _it_parentid = value; }
            get { return _it_parentid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IT_ParentPath
        {
            set { _it_parentpath = value; }
            get { return _it_parentpath; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IT_Depth
        {
            set { _it_depth = value; }
            get { return _it_depth; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IT_Url
        {
            set { _it_url = value; }
            get { return _it_url; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string IT_Pic
        {
            set { _it_pic = value; }
            get { return _it_pic; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IT_Order
        {
            set { _it_order = value; }
            get { return _it_order; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IT_IsShowFirst
        {
            set { _it_isshowfirst = value; }
            get { return _it_isshowfirst; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IT_IsAllCity
        {
            set { _it_isallcity = value; }
            get { return _it_isallcity; }
        }
        /// <summary>
        /// 0：否（默认），1：是【主要用于 婚嫁 母婴 吃玩 丽人等区别加盟商】
        /// </summary>
        public int IT_IsJoiner
        {
            set { _it_isjoiner = value; }
            get { return _it_isjoiner; }
        }
        /// <summary>
        /// 暂时未用到
        /// </summary>
        public int IT_State
        {
            set { _it_state = value; }
            get { return _it_state; }
        }
        /// <summary>
        /// 0：否（默认），1：是
        /// </summary>
        public int IT_IsSystem
        {
            set { _it_issystem = value; }
            get { return _it_issystem; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int IT_ArticalCount
        {
            set { _it_articalcount = value; }
            get { return _it_articalcount; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime IT_CreateDate
        {
            set { _it_createdate = value; }
            get { return _it_createdate; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime IT_UpdateDate
        {
            set { _it_updatedate = value; }
            get { return _it_updatedate; }
        }
        #endregion Model

    }
}