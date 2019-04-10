var datas = new Vue({
    el: '#app',
    data: {
        bookList: [{}],
        lastestBookList: [{}],
        topBookList: [{}],
        ccName:""
    },
    created: function () {
        ccName = $("#tagName").val()
        this.getBookList(ccName);
        this.getLastestBookList(ccName);
        this.getTopBookList(ccName);
    },
    mounted: function () {
        this.fetchOtherBookList(ccName)
        window.addEventListener('scroll', this.loding)
    },
    computed: {
        firstBookList: function () {
            return this.bookList.slice(0, 3);
        },
        secondBookList: function () {
            return this.bookList.slice(3, 6);
        },
        firstTopBookList: function() {
            return this.topBookList.slice(0, 3);
        },
        secondTopBookList: function() {
            return this.topBookList.slice(3, 8);
        }
    },
    methods: {
        getBookList: function () {
            $.ajax({
                type:"post",
                url: "/Channel/GetRandomBookList",
                data: { channelCategoryName: ccName },
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.bookList = data;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        getLastestBookList: function (ccName) {
            $.ajax({
                type: "post",
                url: "/Channel/GetLastestBookList?ccName=" + ccName,
                data: { channelCategoryName: ccName },
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.lastestBookList = data;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        getTopBookList: function(ccName) {
            $.ajax({
                type: "post",
                url: "/Channel/GetTopBookList?ccName=" + ccName,
                data: { channelCategoryName: ccName },
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.topBookList = data;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        fetchOtherBookList: function (ccName) {
            $.ajax({
                type: "post",
                url: "/Channel/GetRandomBookList",
                data: { channelCategoryName: ccName },
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.bookList = data;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        loding: function () {
            var pHeight = $("footer").outerHeight(true) + $(".books-list li:last").outerHeight(true);
            if ($(document).scrollTop() + $(window).height() >= $(document).height() - pHeight) {
                if (this.gate) {
                    this.pageIndex++;
                    // 数据大于100条
                    if (this.pageIndex > this.totalPage) {
                        this.gate = false;
                        $('.loading').hide();
                        return false;
                    } else {
                        this.getBookList('1', this.pageIndex, true);
                    }
                } else {
                    $('.loading').hide();
                }
            }
        },
    }
})
function getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//从?之后开始匹配如getQuery(courseid)返回一个数组["courseid=8","","8","&",index:0,input:"courseid=8"]
    if (r != null) return decodeURIComponent(r[2]); return null;
}