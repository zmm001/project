/*
 * 文字滚动
 *
 * Copyright (c) 2011-7-5 wsd
 */
(function($) {

    $.tmove = function(options) {
        var setting = {
            leftevent: null,
            rightevent: null,
            showindex: 1,
            moveli: null,
            moveol: null,
            moveparol: null
        };
        if (options) {
            $.extend(setting, options);
        }
        var _ULW, _RunW, _stepdiff, _index, _selW, _step;
        setting.leftevent.click(MoveLeft);
        setting.rightevent.click(MoveRight);
        _ULW = 0; //集合宽度
        _selW = 0;  //当前集合宽度
        _step = setting.moveparol.width(); //集合显示宽度
        _index = 1;
        setting.moveli.each(function() { _selW = _selW + jQuery(this).width(); if (setting.showindex == _index) { return false; }; _index++ });
        setting.moveli.each(function() { _ULW = _ULW + jQuery(this).width() });
        _RunW = 66; //移动宽度

        if (_ULW > _step) {
            setting.leftevent.css("display", "block");
            setting.rightevent.css("display", "block");
        }
        if (_selW > _step) {
            _selW = parseInt(setting.moveol.css("left")) - (_selW - _step);
            setting.moveol.css("left", _selW);
            _stepdiff = _step - _selW;
        }
        else
            _stepdiff = _step;

        //左移
        function MoveLeft() {

            var _diff = _stepdiff - _step;

            if (!setting.moveol.is(":animated") && (_stepdiff > _step) && _diff >= _RunW) {
                setting.moveol.animate({ left: "+=" + _RunW });
                _stepdiff = _stepdiff - _RunW;
            }
            else {
                if (_diff > 0) {
                    setting.moveol.animate({ left: "+=" + _diff });
                    _stepdiff = _stepdiff - _diff;
                }
            }

        }
        //右移
        function MoveRight() {
            var _diff = _ULW - _stepdiff;
            if (!setting.moveol.is(":animated") && (_stepdiff < _ULW) && _diff >= _RunW) {
                setting.moveol.animate({ left: "-=" + _RunW });
                _stepdiff = _stepdiff + _RunW;
            }
            else {
                if (_diff > 0) {
                    setting.moveol.animate({ left: "-=" + _diff });
                    _stepdiff = _stepdiff + _diff;
                }
            }
        } 
    }
})(jQuery);
