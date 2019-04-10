var datas = new Vue({
    el: '#app',
    data: {
        categorys: [{}], //分类
        booksList: [{}],
        gate: true,
        pageIndex: 1,
        totalPage: 0,
    },
    created: function () {
        this.getCategoryList()
        this.getBookList('1', 1, false)

    },
    mounted: function () {
        window.addEventListener('scroll', this.loding)
    },
    methods: {
        // 分类列表
        getCategoryList: function () {
            $.ajax({
                type: "get",
                url: "/Rank/GetCategotyList",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.categorys = data;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        getBookList: function (catagory2, pageIndex, isLoad) {
            $.ajax({
                type: "post",
                url: "/Rank/GetBookList",
                data: { catagory: catagory2, pageIndex: pageIndex },
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        if (isLoad) {
                            datas.booksList = datas.booksList.concat(data);
                        } else {
                            datas.booksList = data;
                        }
                        datas.totalPage = data[0].TotalPage
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        hrefGO: function (ID) {
            window.location.href = "/Book/Detail/" + ID
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
                        //$('.loading').show();
                    }
                } else {
                    $('.loading').hide();
                }
            }
        },
    }
})