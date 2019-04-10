let states = {
    mode: 'block',
    pageCount: 0,
    list: [],
    options: {
        sort: "1",
        gender: 'female',
        category: 0,
        status: 2,
        size: "",
        time: "",
        pageIndex: 1
    }
}
var setting = {
    TotalNum: ko.observable(),
    TotalPage: ko.observable(),
    BookList: ko.observable([{
        ID: ko.observable(),
        Name: ko.observable(),
        Description: ko.observable(),
        CoverImage: ko.observable(),
        Author: ko.observable(),
        CategoryId: ko.observable(),
        CategoryName: ko.observable(),
        Status: ko.observable(),
        StatusDesc: ko.observable(),
        Href: ko.observable(),
        TotalNum: ko.observable(),
        TotalPage: ko.observable(),
        wordNum: 0,
        time: ko.observable(),
        chapterNum: ko.observable(),
    }]),
    data: ko.observable({
        category1Id: 2,                       //一级分类    (1:男 2:女)
        category2Id: null,                  // 二级分类
        isAll: true,                             //是否显示全部
        NovelRecommendType: 1, // 推荐类型（最热、最新、推荐、收藏）
        BookStatus: 2,                      //   状态（0全部 1连载 2完本）
        WordNumType: 0,              // 字数（0 全部 1.30w 2.50-100 ...)
        UpdateType: 0,                     //更新时间（0 全部 ...）
        pageIndex: 0,
    }),
    pageIndex: ko.observable(0),
    gate: ko.observable(true),
}
var action = {
    init: function () {
        var self = this
        self.GetBookList(setting.data())
        self.scrollLoad()
    },
    scrollLoad: function () {
        $(window).bind("scroll", function () {
            if ($(document).scrollTop() + $(window).height() >= $(document).height()) { //- pHeight
                if (setting.gate()) {
                    if (setting.TotalPage() <= 1) {
                        setting.gate(false)
                        return false;
                    }
                    setting.data().pageIndex = setting.data().pageIndex + 1
                    if (setting.data().pageIndex  >= setting.TotalPage()) {
                        setting.gate(false)
                        return false;
                    }
                    action.GetBookList(setting.data());
                }
            }
        });
    },
    GetBookList: function (data) {
        $.ajax({
            type: 'POST',
            url: "/Book/GetBookList",
            dataType: "json",
            data: data,
            success: function (data) {
                $('.content .list-box.block ul').show()
                if (data.length > 0) {
                    setting.TotalNum(data[0].TotalNum)
                    setting.TotalPage(data[0].TotalPage)
                    if (setting.data().pageIndex > 0) {
                        var booklist = setting.BookList();
                        var temp = booklist.concat(data)
                        setting.BookList(temp)
                    } else {
                        setting.BookList(data)
                    }
                } else {
                    setting.TotalNum(0)
                    setting.TotalPage(0)
                    setting.BookList([])
                }
            },
            error: function (xhr, type) {
                // showMsg('加载异常，请刷新页面重试！');
            }
        });
    }
}
ko.applyBindings(setting)
action.init()
createState('mode', function (val) {
    $('.list-box').attr('class', 'list-box ' + val)
    $(".content").css({ "min-height": $(window).height() - $(".content").offset().top });
})
$('.list-option .sort').on("click", 'a', function () {
    $(".list-option .sort").attr('data-sort', states.options.sort)
    $('.options .selected').css("display", "none")
    if ((setting.data().category2Id == 0 || setting.data().category2Id == null) && setting.data().BookStatus == 0 && setting.data().WordNumType == 0 && setting.data().UpdateType == 0) {
        $('.options .selected').css("display", "none")
    } else {
        $('.options .selected').css("display", "block")
    }
})
createState('options', function (data) {
    function handle() {
        //$(".list-option .sort").attr('data-sort', states.options.sort)
        $('.options').attr('class', 'options ' + states.options.gender)
        setting.data().pageIndex = 0
        $('.options .selected').html(foreOptions)
        setting.data({
            category1Id: states.options.category == '' || states.options.category == '0' ? (states.options.gender == 'female' ? 2 : 1) : null,                       //一级分类
            category2Id: states.options.category == '' || states.options.category == '0' ? null : parseInt(states.options.category),                  // 二级分类
            isAll: true,                             //是否显示全部
            NovelRecommendType: states.options.sort == '' ? 1 : parseInt(states.options.sort), // 推荐类型（最热、最新、推荐、收藏）
            BookStatus: states.options.status == '' ? 0 : parseInt(states.options.status),                      //   状态（0全部 1连载 2完本）
            WordNumType: states.options.size == '' ? 0 : parseInt(states.options.size),              // 字数（0 全部 1.30w 2.50-100 ...)
            UpdateType: states.options.time == '' ? 0 : parseInt(states.options.time),                     //更新时间（0 全部 ...）
            pageIndex: 0,
        });
        setting.gate(true)
        action.GetBookList(setting.data());
    }
    for (let i in states.options) {
        let _state = states.options[i]
        Object.defineProperty(states.options, i, {
            get: function () { return _state },
            set: function (val) {
                _state = val
                if (val != "0") {
                    $('.options .selected').css("display", "block")
                    handle()
                }
                //else
                //    $('.options .selected').css("display", "none")
            }
        })
    }
})
//把url参数赋值给states.options
var parms = window.location.href.match(/[?&]([^=&#]+)=([^&#]*)/g)
if (parms) {
    parms.map(function (str) {
        var _arr = str.slice(1).split('=')
        states.options[_arr[0]] = _arr[1]
    })
}
$('.box .item:not(.selected)').on('click', 'a', function () {
    $(this).parents('.item').find('a').removeClass('current')
    $(this).addClass('current')
    if ($(this).attr('data-id') == 0) {
        $('.item.selected a[data-name=' + $(this).parent().attr('data-option') + ']').remove()
        setting.data().pageIndex = 0
        setting.gate(true)
        switch ($(this).parent().attr('data-option')) {
            case "category":
                setting.data().category1Id = states.options.gender == 'female' ? 2 : 1
                setting.data().category2Id = 0
                break;
            case "status":
                setting.data().BookStatus = 0
                break;
            case "size":
                setting.data().WordNumType = 0
                break;
            case "time":
                setting.data().UpdateType = 0
                break;
        }
        if ((setting.data().category2Id == 0 || setting.data().category2Id == null) && setting.data().BookStatus == 0 && setting.data().WordNumType == 0 && setting.data().UpdateType == 0) {
            $('.options .selected').css("display", "none")
        } else {
            $('.options .selected').css("display", "block")
        }
        action.GetBookList(setting.data())
    }
    states.options[$(this).parents('.item').attr('data-option')] = $(this).attr('data-id')
})
function tabGender(data) {
    $('.' + data).removeClass('current').addClass("current")
    $('.options .item').each(function () {
        $(this).find("a").removeClass('current').eq(0).addClass('current');
    })
    states.options.status = 0
    states.options.size = 0
    states.options.time = 0
    states.options.category = 0
    states.options.gender = data;
    $('.options .selected').css("display", "none")
    $('.item.selected').find("a").remove();
}
function foreOptions() {
    var str = '';
    var arr = ['category', 'status', 'size', 'time'];
    [states.options.category, states.options.status, states.options.size, states.options.time].map(function (item, index) {
        if (item != 0 && item != "") {
            var a = '<a data-name=' + arr[index] + ' data-item=' + item + '>' + $('.box').find('.item:not(.selected):visible').eq(index).find('a[data-id=' + item + ']').html() + '<i></i></a>'
            str += a
        }
    })
    return str;
}
$('.item.selected').on('click', 'a', function () {
    $(this).remove()
    setting.data().pageIndex = 0
    setting.gate(true)
    $('.item[data-option=' + $(this).attr('data-name') + ']').each(function (i) {
        $(this).find('a:eq(0)').click()
    })
    switch ($(this).attr('data-name')) {
        case "category":
            setting.data().category1Id = states.options.gender == 'female' ? 2 : 1
            setting.data().category2Id = 0
            break;
        case "status":
            setting.data().BookStatus = 0
            break;
        case "size":
            setting.data().WordNumType = 0
            break;
        case "time":
            setting.data().UpdateType = 0
            break;
    }
    action.GetBookList(setting.data())
})
states.options = states.options





