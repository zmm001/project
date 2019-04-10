function GetHotels(currentid) {
    var loading = '<div style="text-align:center; line-height:200%;font-size=12px;"><img src="images/loading.gif"><br />正在加载...</div>';
    this.$('jd').innerHTML = loading;
    var url = "Channel/Hotel.aspx?mid=" + currentid + "&rnd=" + Math.random();
    ENetwork.DownloadScript(url, function() { fnGetHotelInfo(); });
}
function fnGetHotelInfo() {
    var hotelHTML = '';
    var hotelList = '';
    this.$('jd').innerHTML = '';
    if (typeof SearchTable != 'undefined') {
        var hotels = SearchTable;
        var htLength = hotels.length;
        if (htLength > 0) {
            $('jd').innerHTML = '<div class="title">预定...</div>';
            hotelHTML = '<ul class="ul_2" id="subDivHotel{$index}"><li class="li_title">{$HotelName}</li>{$hotellist}</ul>';
            for (var i = 0; i < htLength; i++) {
                hotelHTML = hotelHTML.replace('{$HotelName}', hotels[i].HotelName).replace('{$index}', i);

                hotelList += ' <li><span class="span5 y5">高级客房</span> <span class="span6 y6"><a href="{$HotelUrl}" target="_blank">{$sityName} </a> </span><span class="span7 y5">{$price} </span><span class="span8"><a href="{$HotelUrl}" target="_blank">预定</a> </span></li>';
                hotelList = hotelList.replace("{$HotelUrl}", hotels[i].HotelUrl);
                hotelList = hotelList.replace("{$sityName}", hotels[i].SiteName);
                if (hotels[i].Price == '') {
                    hotelList = hotelList.replace("{$price}", '无');
                }
                else {
                    hotelList = hotelList.replace("{$price}", hotels[i].Price + '元');
                }
                hotelList = hotelList.replace("{$HotelUrl}", hotels[i].HotelUrl);
            }
            hotelHTML = hotelHTML.replace("{$hotellist}", hotelList);
            $('jd').innerHTML += hotelHTML; 
        }
        
    }
}