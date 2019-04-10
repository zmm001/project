var _ePage = 0; //索引  起始第几个
var _step = 8; //步长个数
var _showcount = 11; //显示的个数
var _W = 28; //步长长度
var _PageCount = 0;
var _eDiv;

jQuery(function() {
    // 下一版
    jQuery("#next").click(MoveRight);
    // 上一版
    jQuery("#prev").click(MoveLeft);
    _PageCount = jQuery("#buslinelist td").length;
    _eDiv = jQuery("#buslinelist");
    var index = jQuery("#inputindex").val();
    _ePage = index - (_showcount);
    //初始索引
    if (_ePage < _PageCount - (_showcount - 1) && _ePage > 0) {//判断当前索引小于最大索引
        if ((_ePage + _showcount - 1) < _PageCount) {
            _eDiv.animate({ left: "-=" + (_W * _ePage) });
        } else {
            _eDiv.animate({ left: "-=" + (_W * (_PageCount - (_showcount - 1) - _ePage)) });
            _ePage = _PageCount - 1 - (_showcount - 1);
        }
    } else {
        _ePage = 0;
    }
});

function MoveLeft() {
    if (_PageCount < _showcount)
        return;
    if (!_eDiv.is(":animated")) {
        if (_ePage > 0) {
            if (_ePage < _step) {
                _eDiv.animate({ left: "+=" + (_W * _ePage) }, 1000);
                _ePage = 0;
            } else {
                _eDiv.animate({ left: "+=" + (_W * _step) },1000);
                _ePage = _ePage - _step;
            }
        }
    }
}
function MoveRight() {
    if (_PageCount < _showcount)
        return;
    if (!_eDiv.is(":animated")) {
        if (_PageCount - 1 - (_ePage + _showcount - 1) < _step) {
            _eDiv.animate({ left: "-=" + (_W * (_PageCount - 1 - (_ePage + _showcount - 1))) }, 1000);
            _ePage = _PageCount - 1 - (_showcount - 1);
        } else {
            _eDiv.animate({ left: "-=" + (_W * _step) }, 1000);
            _ePage = _ePage + _step;
        }
    }
}

