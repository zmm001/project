using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Edushi.AiShangTouTiao.API.Model
{
    public class UserResult
    {
        /// <summary>
        /// 状态（code: 200成功、400失败）
        /// </summary>
        public int code { get; set; }

        /// <summary>
        /// 对象信息
        /// </summary>
        public UserData data { get; set; }

        /// <summary>
        /// 提示信息
        /// </summary>
        public string msg { get; set; }
    }

    public class UserData
    {
        /// <summary>
        /// E都市用户ID
        /// </summary>
        public int eId { get; set; }

        /// <summary>
        /// app用户ID 
        /// </summary>
        public int appId { get; set; }

        /// <summary>
        /// app用户昵称
        /// </summary>
        public string appNickname { get; set; }

        /// <summary>
        /// app用户头像（相对路径）
        /// </summary>
        public string appAvatar { get; set; }
    }
}
