using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Edushi.AiShangTouTiao.API.Model
{
    public class WalletResult
    {
        /// <summary>
        /// 状态（code: 200成功、400失败）
        /// </summary>
        public int code { get; set; }

        /// <summary>
        /// 对象信息
        /// </summary>
        public WalletData data { get; set; }

        /// <summary>
        /// 提示信息
        /// </summary>
        public string msg { get; set; }
    }

    public class WalletData
    {
        /// <summary>
        /// 余额(分)
        /// </summary>
        public int balance { get; set; }

        /// <summary>
        /// 金币
        /// </summary>
        public int gold { get; set; }
    }
}
