
function toPage(url) {
    leavePage_Before_Track();//离开页面前先进行埋点跟踪
    window.location.href = url;
}

function leavePage_Before_Track() {
    var date_end = new Date();    //离开页面的结束时间
    var date_temp = (date_end.getTime() - date_begin.getTime()) / 1000;  //时间差的毫秒数/1000
    var leaveContentDetail = {
        contentType: viewContentDetail.contentType,
        contentID: viewContentDetail.contentID,
        contentTitle: viewContentDetail.contentTitle,
        contentChannel: viewContentDetail.contentChannel,
        contentTag: viewContentDetail.contentTag,
        event_duration: date_temp
    };

    sensors_data.track('leaveContentDetail', leaveContentDetail);
}