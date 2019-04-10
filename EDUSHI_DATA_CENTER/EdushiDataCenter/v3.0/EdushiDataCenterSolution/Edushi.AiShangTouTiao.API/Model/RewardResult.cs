using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Edushi.AiShangTouTiao.API.Model
{
    public class RewardResult
    {
        /// <summary>
        /// 状态（code: 200成功、400失败）
        /// </summary>
        public int code { get; set; }

        /// <summary>
        /// 对象信息
        /// </summary>
        public RewardData data { get; set; }

        /// <summary>
        /// 提示信息
        /// </summary>
        public string msg { get; set; }
    }

    public class RewardData
    {
        /// <summary>
        /// 已阅读数量
        /// </summary>
        public int read_count { get; set; }

        /// <summary>
        /// 本次奖励金币数
        /// </summary>
        public int gold_award { get; set; }
    }
}
