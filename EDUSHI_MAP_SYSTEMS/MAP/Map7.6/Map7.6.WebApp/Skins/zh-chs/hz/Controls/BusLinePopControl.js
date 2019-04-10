var BusLinePopControl = Class.create();
Object.extend(BusLinePopControl.prototype, ControlBase.prototype);  //继承基类
Object.extend(BusLinePopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('BusLinePopControl');
    },
    Tab: null,
    ShowPop: function(index, Data, type) {
        this.Show();
        var html = '<td><div>{$No}</div><div title="{$stationName}">{$sName}</div></td>';
        var htmlon = '<td class="on"><div>{$No}</div><div title="{$stationName}">{$sName}</div></td>';
        var cc = '';
        if (type == '1') {
            if (Data.BusUp.length > 0) {
                for (var i = 0; i < Data.BusUp.length; i++) {
                    var temp = '';
                    if (index == i) {
                        temp = htmlon;
                    }
                    else {
                        temp = html;
                    }
                    cc += temp.replace('{$No}', i + 1).replace('{$stationName}', Data.BusUp[i].StationName).replace('{$sName}', CutString(Data.BusUp[i].StationName));
                }
            }
            this.$('BusTime').innerHTML = '首班：' + Data.LineInfo.UpStartTime + ' 末班：' + Data.LineInfo.UpEndTime;
            this.$('stName').innerHTML = Data.BusUp[index].StationName;
        } else {
            if (Data.BusDown.length > 0) {
                for (var j = 0; j < Data.BusDown.length; j++) {
                    var temp = '';
                    if (index == j) {
                        temp = htmlon;
                    }
                    else {
                        temp = html;
                    }
                    cc += temp.replace('{$No}', j + 1).replace('{$stationName}', Data.BusDown[j].StationName).replace('{$sName}', CutString(Data.BusDown[j].StationName));
                }
            }
            this.$('BusTime').innerHTML = '首班：' + Data.LineInfo.DownStartTime + ' 末班：' + Data.LineInfo.DownEndTime;
            this.$('stName').innerHTML = Data.BusDown[index].StationName;
        }

        this.$('list').innerHTML = '<table border="0" cellspacing="2" cellpadding="0" style="position: relative;" id="buslinelist"><tr>' + cc + '</tr></table>';
        this.$('inputindex').value = index + 1;
        this.$('BusLineName').innerHTML = Data.LineInfo.VehicleName;
        this.$('BusLineInfo').innerHTML = Data.LineInfo.StartStation + '-' + Data.LineInfo.EndStation;
        this.$('TicketPrice').innerHTML = '票价：' + Data.LineInfo.BusPrice + '元';

        var script = this.$C('script');
        script.type = 'text/javascript';
        script.language = 'javascript';
        script.src = '/Controls/BusLinePopScroll.js';
        this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
    },
    _loadComplete: function() {
        this.Body.contentWindow.BusLinePopControl = this;
        this.$('btnClose').onclick = this.ClosePop.bind(this);
        this.Body.contentWindow.BusLinePopControl = this;
        var script = this.$C('script');
        script.type = 'text/javascript';
        script.language = 'javascript';
        script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?key=gongjiaopaopao&citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&domid=divStationAd';
        this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
        this.onLoadComplete(this);
    },
    ClosePop: function() {
        this.Hide();
    },
    loadImgErr: function(imgpath) {
        if (this.src == imgpath) {
            return;
        }
        this.src = imgpath;
        this.onerror = null;
    }
});

function CutString(str) {
    if (str == '')
        return;
    str = str.replace('公交', '');
    if (str.toString().length > 6) {
        return str.substring(0, 5) + ' ：';
    }
    else
        return str;
}


