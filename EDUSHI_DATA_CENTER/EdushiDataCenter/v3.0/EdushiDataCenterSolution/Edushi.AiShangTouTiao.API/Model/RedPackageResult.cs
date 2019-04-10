using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Edushi.AiShangTouTiao.API.Model
{
    public class RedPackageResult
    {
        /// <summary>
        /// 状态（code: 200成功、400失败）
        /// </summary>
        public int code { get; set; }

        /// <summary>
        /// 对象信息
        /// </summary>
        public RedPackageData data { get; set; }

        /// <summary>
        /// 提示信息
        /// </summary>
        public string msg { get; set; }
    }

    public class RedPackageData
    {
        /// <summary>
        /// 红包金额(分)
        /// </summary>
        public int money { get; set; }
    }
}
