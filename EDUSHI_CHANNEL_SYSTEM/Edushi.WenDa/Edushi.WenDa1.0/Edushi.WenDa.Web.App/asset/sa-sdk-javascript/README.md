# sa-sdk-javascript

Sensors Analytics JavaScript SDK

完整文档请[点击这里](http://www.sensorsdata.cn/manual/js_sdk.html)，如有疑问请联系邮箱 shengyonggen@sensorsdata.cn。

需要使用的文件说明：

* sensorsdata.min.js：打包压缩后的，数据采集文件， sdk_url 使用这个文件的位置   
* heatmap.min.js：打包压缩后的，点击图渲染时候需要用的文件（ 1.9 以上版本新加 ）， heatmap_url 指定这个文件的位置   

> 注意 SDK 可能不完全向前兼容，请阅读具体的 Release Log。如果不确定是否支持，请联系神策技术支持人员！例如使用 1.9 版本 SDK ，神策分析系统必须也升级到 1.9 以上！
 
请根据需要 [Releases](https://github.com/sensorsdata/sa-sdk-javascript/releases) 里下载对应的文件     

插播广告一条：
 * 紧急招聘前端工程师，求发送到我邮箱 (shengyonggen@sensorsdata.cn)

 
最近更新：   
1.11.6 优化超时机制，增加自定义域名   
1.11.7 使用npm模块引入时候，多次init的判断   
1.11.8 在1.10.1 - 1.11.7间的版本有这个问题，必须更新！部分浏览器，发送相同数据时，不会发送，导致丢失数据的问题！  
1.11.9 heatmap增加了setContent参数，setContent是一个函数，有一个element参数，用户可以对元素内容进行操作，然后返回想要显示的内容，返回的内容会在点击图中的"当前内容"中显示  
1.11.10 增加autoTrackSinglePage首次可以触发profile_set_once的功能  
1.12.1 增加点击图第二版，按快捷键z和x，可切换点击图的渲染模式，用于解决某些点击图页面的样式冲突问题。增加配置heatmap:{element_selector:'not_use_id'} 不会使用id做为选择器，防止随机id导致的点击图不能使用。增加触达率图左右滚动的检查，禁止左右滚动触发scroll。增加scrollmap:{collect_url:false}{collect_url:function(){}}的配置。配置false的话，不采集$WebStay也就没有触达率图，配置function的话，会执行fucntion看返回值，返回真就采集，返回假不采集。  
1.12.2 增加点击图采集数据时候，采集浏览器宽度。调整点击图开始渲染的时间为1秒间隔。  
1.12.3 去除1.12.1增加的$WebStay的$viewport_left属性导致的埋点管理报错 
1.12.5 优化关闭页面前，如果有多次发数据时候的性能，queue_timeout 设置成 0 的时候，不再使用setTimeout 0发送，改成直接发送。会脱离队列数据发送的流程，变为直接发送数据。  


