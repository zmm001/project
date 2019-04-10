function CityTileLayer(city) {
    var layer = new AMap.TileLayer({
        tileSize: 256,
        getTileUrl: function (x, y, z) {
            var z1 = zeroPad(z, 2, 10);
            var x1 = zeroPad(x, 8, 16);
            var y1 = zeroPad(y, 8, 16);
            return 'http://map3dimg.edushi.com/Data/' + city + '/' + "L" + z1 + "/" + "R" + y1 + "/" + "C" + x1;
        },
        opacity: 1,
        zooms: [3, 19],
        zIndex: 2
    });

    return layer;
}

var guangzhou = new CityTileLayer("Guangzhou");// 广州
var nanchang = new CityTileLayer("Nanchang");// 南昌
var shenyang = new CityTileLayer("Shenyang");// 沈阳
var zhengzhou = new CityTileLayer("Zhengzhou");// 郑州
var changchun = new CityTileLayer("Changchun");   // 长春
var haikou = new CityTileLayer("Haikou"); // 海口
var suzhou = new CityTileLayer("Suzhou");    // 苏州
var hangzhou = new CityTileLayer("HangZhou");  //杭州
var hefei = new CityTileLayer("Hefei");  //合肥
var chongqing = new CityTileLayer("Chongqing") //重庆
var fuzhou = new CityTileLayer("Fuzhou");    // 福州
var xiamen = new CityTileLayer("Xiamen");  // 厦门市
var guiyang = new CityTileLayer("Guiyang");   //贵阳
var fuqing = new CityTileLayer("Fuqing"); //福清
var zhuzhou = new CityTileLayer("Zhuzhou"); //株洲市
var chifeng = new CityTileLayer("Chifeng"); //赤峰市
var eerduosi = new CityTileLayer("Eerduosi"); //鄂尔多斯市
var wuhan = new CityTileLayer("Wuhan");   //武汉市
var changsha = new CityTileLayer("Changsha");  //长沙市
var yongzhou = new CityTileLayer("Yongzhou"); //永州市
var xian = new CityTileLayer("Xian");            //西安市
var hanzhong = new CityTileLayer("Hanzhong");    //汉中市
var huizhou = new CityTileLayer("Huizhou");      //惠州市
var shenzhen = new CityTileLayer("Shenzhen");    //深圳市
var jining = new CityTileLayer("Jining");           //济宁市
var dezhou = new CityTileLayer("Dezhou");  //德州市
var qingdao = new CityTileLayer("Qingdao");   //青岛市
var heze = new CityTileLayer("Heze");   //菏泽市
var xuchang = new CityTileLayer("Xuchang"); // 许昌市
var nanjing = new CityTileLayer("Nanjing");  //南京
var tianjin = new CityTileLayer("Tianjin");  // 天津市
var chengdu = new CityTileLayer("Chengdu");   //成都市
var shanghai = new CityTileLayer("Shanghai"); //上海市
var dongguan = new CityTileLayer("Dongguan"); // 东莞

var foshan = new CityTileLayer("Foshan"); // 佛山
var huhehaote = new CityTileLayer("Huhehaote"); // 呼和浩特
var lanzhou = new CityTileLayer("Lanzhou"); // 兰州
var kunming = new CityTileLayer("Kunming"); // 昆明

var nanning = new CityTileLayer("Nanning");  // 南宁
var yantai = new CityTileLayer("Yantai");  // 烟台
var haerbin = new CityTileLayer("Haerbin");  // 哈尔滨
var xining = new CityTileLayer("Xining");   // 西宁
var zibo = new CityTileLayer("Zibo");     // 淄博市
var shaoxing = new CityTileLayer("Shaoxing");  //绍兴
var jiamusi = new CityTileLayer("Jiamusi");  //桦南
var liling = new CityTileLayer("Liling");  // 醴陵
var yuncheng = new CityTileLayer("Yuncheng") // 郓城

cities = {
    '杭州市': hangzhou, '重庆市': chongqing, '福州市': fuzhou, '贵阳市': guiyang, '福清市': fuqing, '广州市': guangzhou,
    '株洲市': zhuzhou, '赤峰市': chifeng, '武汉市': wuhan, '长沙市': changsha, '汉中市': hanzhong, '南昌市': nanchang, '郑州市': zhengzhou,
    '惠州市': huizhou, '深圳市': shenzhen, '济宁市': jining, '许昌市': xuchang, '德州市': dezhou, '沈阳市': shenyang, '长春市': changchun,
    '永州市': yongzhou, '南京市': nanjing, '天津市': tianjin, '成都市': chengdu, '西安市': xian, '苏州市': suzhou, '海口市': haikou,
    '菏泽市': heze, '鄂尔多斯市': eerduosi, '上海市': shanghai, '合肥市': hefei, '厦门市': xiamen, '青岛市': qingdao, '东莞市': dongguan,
    '佛山市': foshan, '呼和浩特市': huhehaote, '兰州市': lanzhou, '昆明市': kunming, '南宁市': nanning,
    '哈尔滨市': haerbin, '西宁市': xining, '淄博市': zibo, '绍兴市': shaoxing, '烟台市': yantai, '佳木斯市': jiamusi, '醴陵县': liling, '郓城县': yuncheng
};

//进制转换
function zeroPad(num, len, radix) {
    var str = num.toString(radix || 10);
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}