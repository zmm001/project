var PoiPopControl = Class.create();
Object.extend(PoiPopControl.prototype, ControlBase.prototype);  //继承基类


Object.extend(PoiPopControl.prototype, {
    _loadUI: function() {
        this.LoadUI('PoiPopControl');
    },
    _loadComplete: function() {
        this.$('btnClose').onclick = this.Hide.bind(this);
        this.onLoadComplete();
    },
    //企业ID
    CID: 0,

    Tab: null,
    ShowPop: function(name, address, tel, x, y) {
        this.$('Name_h3').innerHTML = '<span class="Til">' + name + '</span>';
        this.$('Address_p').innerHTML = address;
        this.$('Tel_p').innerHTML = tel;
        this.$('btnCavil').onclick = this.onCavil.bind(this, x, y, 0, name);
        this.Show();
        if (!this.HasLoadAd) {
            this.HasLoadAd = true;
            _script = this.$C('script');
            _script.charset = 'utf-8';
            _script.src = this.Config.DataCetnerAdDataUrl + 'Ad2.0/ads.aspx?citycode=' + this.Config.CityCode + '&l=' + this.Config.Language + '&key=dingweipaopao&domid=RowNav';
            this.Body.contentWindow.document.getElementsByTagName('head')[0].appendChild(_script);
        }
    },
    onCavil: function(x, y, id, name) {

    }
});