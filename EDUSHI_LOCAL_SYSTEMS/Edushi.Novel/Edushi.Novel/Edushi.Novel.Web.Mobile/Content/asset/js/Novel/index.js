var datas = new Vue({
    el: '#app',
    data: {
        bannerLists: [{}],// banner
        indexRecommendLists: [{}], //首页推荐
        channelMaleLists: [{}], // 男频道
        channelFemaleLists: [{}], //女频道
        BookCityRecommend: [{}],// 书城推荐
        top6Category3: [{}],//6个三级频道
        loginMsg: "",
        isShow:false
    },
    created: function () {
        var flag = 'male'
        this.getBanners()
        this.indexRecommendList()
        this.indexChannelList(flag)
        this.indexBookCityRecommend()

    },
    watch: {
        bannerLists: function () {
            this.$nextTick(function () {
                this.lunBo()
            })
        },
        BookCityRecommend: function () {
            this.$nextTick(function () {
                this.eachClass()
            })
        }
    },
    computed: {
        newMaleFirstchannelLists: function () {
            return this.channelMaleLists.slice(0, 3)
        },
        newMaleNextchannelLists: function () {
            return this.channelMaleLists.slice(3)
        },
        newFemaleFirstchannelLists: function () {
            return this.channelFemaleLists.slice(0, 3)
        },
        newFemaleNextchannelLists: function () {
            return this.channelFemaleLists.slice(3)
        },
    },
    //created: function () {
    //    this.isLogin()
    //},
    methods: {
        // 首页banner
        getBanners: function () {
            $.ajax({
                type: "get",
                url: "/Home/GetBannerList?rnd=" + Math.random(),
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.bannerLists = data;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        // 首页推荐
        indexRecommendList: function () {
            $.ajax({
                type: "get",
                url: "/Home/GetIndexRecommendList?rnd=" + Math.random(),
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.indexRecommendLists = data;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        // 首页男女频道
        indexChannelList: function (flag) {
            $.ajax({
                type: "get",
                url: "/Home/GetChannelList?rnd=" + Math.random() + "&flag=" + flag,
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        if (flag == 'male') {
                            datas.channelMaleLists = data;
                        } else {
                            datas.channelFemaleLists = data;
                        }
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        // 首页书城推荐
        indexBookCityRecommend: function () {
            $.ajax({
                type: "get",
                url: "/Home/GetIndexBookCityRecommend?rnd=" + Math.random(),
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.BookCityRecommend = data;
                        datas.isShow = true;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        lunBo: function () {
            if ($(".focus-box li").length > 1) {
                var mySwiper = new Swiper('.focus-box', {
                    loop: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    //lazy: {
                    //    loadPrevNext: true,
                    //},
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    on: {
                        slideChangeTransitionStart: function () {
                            $(".on-num").text(this.realIndex + 1);
                        }
                    }
                });
                $(".total-num").text(mySwiper.slides.length - 2);
            }
        },
        eachClass: function () {
            $(".module-li").each(function () {
                //var _index = $(this).index()
                var caregory2 = $(this).attr('data-id')
                $(this).find(".module-li-title span").attr("class", "categoryid_" + caregory2);
            });
        },
        hrefGO: function (ID) {
            window.location.href = "/Book/Detail/" + ID
        },
        /**
        mes: header显示文字：当分类不为三级时                                                                             s
        category1：一级分类ID
        category2：二级分类ID
        category3：三级分类ID（没有 ''）
        */
        goBookList: function (mes, category1, category2, category3,isNewBook) {
            var category1IsNull = category1 == '' ? '' : ("&category1=" + category1);
            var category2IsNull = category2 == '' ? '' : ("&category2=" + category2);
            var category3IsNull = category3 == '' ? '' : ("&category3=" + category3);
            var isNewBookIsNull = isNewBook == '' ? '' : ("&isnewbook=" + isNewBook);
            window.location.href = "http://m.xiaoshuo.edushi.com/info/category.html" + "?category=" + escape(mes) + category1IsNull + category2IsNull + category3IsNull + isNewBookIsNull
        },
        getFemaleList: function (flag) {
            this.indexChannelList(flag)
        },
        //isLogin: function () {
        //    $.ajax({
        //        type: "get",
        //        url: "/Home/IsLogin",
        //        //dataType: "json",
        //        success: function (data) {
        //            if (data != null) {
        //                datas.loginMsg = data;
        //            }
        //        },
        //        error: function (data) {
        //            console.log(data);
        //        }
        //    })
        //},
        login: function () {
            $.ajax({
                type: "POST",
                url: "/Home/IsLogin",
                //dataType: "json",
                success: function (data) {
                    if (data == "OK") {
                        datas.loginMsg = data;
                        window.location.href = "http://m.edushi.com/user/Xiaoshuo/Home/Personal";
                    }
                    else{
                        var backUrl = escape(window.location.href);
                        window.location.href = "http://m.edushi.com/user/Login.html?BackUrl=" + backUrl;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        bookStore: function () {
            $.ajax({
                type: "POST",
                url: "/Home/IsLogin",
                success: function (data) {
                    if (data == "OK") {
                        datas.loginMsg = data;
                        window.location.href = "http://m.edushi.com/user/xiaoshuo/mybookrack.html";
                    }
                    else {
                        var backUrl = escape(window.location.href);
                        window.location.href = "http://m.edushi.com/user/Login.html?BackUrl=" + backUrl;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        }
    }
})