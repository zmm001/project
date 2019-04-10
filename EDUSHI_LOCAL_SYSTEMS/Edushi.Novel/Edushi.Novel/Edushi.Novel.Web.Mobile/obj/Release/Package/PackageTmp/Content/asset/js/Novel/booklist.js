var datas = new Vue({
    el: '#app',
    data: {
        hotBookList: [{}],  //最热
        newBookList: [{}], //最新
        longPieceList: [{}],  //长篇/中篇
        freeBookList: [{}],  //免费
        categoryName: "",
        categoryID1: 0,
        categoryID2: 0,
        categoryID3: 0,
        categoryList: [],
        gate: true,
        pageIndex: 1,
        totalPage: 0,
        isShowStyle:false
    },
    created: function () {
        // 获取地址栏参数，分类1，2，3 以及分类名称
        // 如果三级分类有的话，查找分类上一级分类  
        this.categoryID1 = this.getQueryString("category1") // 获取分类一级
        this.categoryID2 = this.getQueryString("category2") // 获取分类二级
        this.categoryID3 = this.getQueryString("category3") // 获取分类三级
        if (this.getQueryString("isnewbook") != null) {       // 男女频道新书
            this.typeTab(2)
            this.isShowStyle = true
            this.getCategoryList(this.categoryID1)
            this.categoryName = this.getQueryString("category")
            this.getBookList(this.categoryID1, true, null, null, 2)
        } else {
            if (this.getQueryString("parentid") != null) {//一期只有二级分类
                // 查找三级分类的上一级分类名称
                this.getParentedCategoryList(this.categoryID3)
            } else {
                if (this.categoryID3 == null) {
                    this.getParentedCategoryList(this.categoryID2) 
                    if (this.categoryID1 != null) {
                        this.getCategoryList(this.categoryID1)
                        this.categoryName = this.getQueryString("category")
                    }
                    else {
                        this.getCategoryList(this.categoryID2)
                    }
                    this.getBookList(this.categoryID1, this.categoryID2 == null ? true : false, this.categoryID2, this.categoryID3, 1)
                } else {//获取三级分类的上一级
                    // 查找三级分类的上一级分类名称
                    this.getParentedCategoryList(this.categoryID3)
                }
            }
        }
    },
    mounted: function () {
        window.addEventListener('scroll', this.loding)
    },
    watch: {
        categoryList: function () {
            this.$nextTick(function () {
                this.tab()
            })
        }
    },
    methods: {
        // 分类列表
        /**
        catagory1：一级分类
        isAll：全部
        catagory2：二级分类
        category3：三级分类
        type：        1：最热 2：最新 3：长篇/中篇 4：免费
        isLoad：是否重新加载
        */
        getBookList: function (catagory1, isAll, catagory2, category3, type, isLoad, pageIndex) {
            $.ajax({
                type: "post",
                url: "/Book/GetBookList",
                data: { category1: catagory1, isAll: isAll, category2: catagory2, category3: category3, type: type, pageIndex: pageIndex == null ? 1 : this.pageIndex },
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        switch (type) {
                            case 1:
                                if (isLoad) {//是否重新加载
                                    datas.hotBookList = datas.hotBookList.concat(data);
                                } else {
                                    datas.hotBookList = data;
                                    datas.totalPage = data[0].TotalPage
                                    datas.pageIndex = 1
                                }
                                break;
                            case 2:
                                if (isLoad) {
                                    datas.newBookList = datas.newBookList.concat(data);
                                } else {
                                    datas.newBookList = data;
                                    datas.totalPage = data[0].TotalPage
                                    datas.pageIndex = 1
                                }
                                break;
                            case 3:
                                if (isLoad) {
                                    datas.longPieceList = datas.longPieceList.concat(data);
                                } else {
                                    datas.longPieceList = data;
                                    datas.totalPage = data[0].TotalPage
                                    datas.pageIndex = 1
                                }
                                break;
                            case 4:
                                if (isLoad) {
                                    datas.freeBookList = datas.freeBookList.concat(data);
                                } else {
                                    datas.freeBookList = data;
                                    datas.totalPage = data[0].TotalPage
                                    datas.pageIndex = 1
                                }
                                break;
                        }

                    } else {
                        datas.hotBookList = null
                        datas.newBookList = null
                        datas.longPieceList = null
                        datas.freeBookList = null
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        getQueryString: function (name) {
            if (name.length > 0) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {
                    return unescape(r[2]);
                }
            }
            return null;
        },
        getCategoryList: function (categoryID1_2) {
            $.ajax({
                type: "post",
                url: "/Book/GetCategoryList",
                data: { categoryID: categoryID1_2 },
                dataType: "json",
                success: function (data) {
                    if (data != null && data.childrenCategories != null || data.childrenCategories.length > 0) {
                        datas.categoryList = data.childrenCategories
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        // 三级分类查找上级分类
        getParentedCategoryList: function (category3) {
            $.ajax({
                type: "post",
                url: "/Book/getParentedCategoryList",
                data: { categoryID: category3 },
                dataType: "json",
                success: function (data) {
                    // 已经当前三级分类所有同类的分类
                    if (data != null) {
                        datas.categoryName = data.Name // 当前三级分类的上一级名称
                        datas.categoryList = data.CategoryList // 三级分类列表
                        datas.categoryID2 = data.ID // 上级ID
                    }
                    datas.$nextTick(function () {//三级分类到指定分类名称上
                        datas.category3Tab(category3)
                        //datas.getBookList(datas.categoryID1, false, datas.categoryID2, datas.categoryID3, 1)//默认为最热
                    })
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        category3Tab: function (category3) {
            var documents = $('.nav p')
            $.each(documents, function (i, n) {
                if ($(n).data('id') == parseInt(category3)) {
                    $(n).addClass("on category").siblings().removeClass("on category");
                }
            })
        },
        typeTab: function (type) {
            var documents = $('.tab-nav span')
            $.each(documents, function (i, n) {
                if ($(n).data('id') == parseInt(type)) {
                    $(n).addClass("on type").siblings().removeClass("on type");
                }
            })
        },
        tab: function () {
            $('.category-sort .nav p').click(function () {
                var _index = $(this).index();
                $(this).addClass("on category").siblings().removeClass("on category");
                datas.gate = true;
            })
        },
        getCategoryTabData: function (isAll, category2_3, type) {
            datas.gate = true
            if (type == null) {
                var type1 = this.getClassNameByID(".tab-nav .on")//最新、最热、长/中篇、免费
                type = type1;
            }
            if (this.categoryID3 == null) {//不是三级分类，一级或者二级分类
                // 获取带on category的id属性值
                if (isAll) {
                    //this.getBookList(this.categoryID1, true, category2_3, this.categoryID3, type)
                    if (category2_3 == null && !isAll) {//当前不是一级分类
                        category2_3 = this.getClassNameByID(".category")
                        this.getBookList(this.categoryID1, false, category2_3, this.categoryID3, type)
                    } else {
                        //this.getBookList(this.categoryID1, true, category2_3, this.categoryID3, type)
                        this.getBookList(this.categoryID1, true, category2_3, this.categoryID3, type)
                    }
                } else {
                    if (this.categoryID1 == null) {//当前不是一级分类
                        category2_3 = this.getClassNameByID(".category")
                        if (parseInt(category2_3) == 000000) {//全部
                            this.getBookList(this.categoryID1, true, this.categoryID2, this.categoryID3, type)
                        } else {
                            this.getBookList(this.categoryID1, false, category2_3, this.categoryID3, type)
                        }
                    } else {
                        if (category2_3 != null) {
                            this.getBookList(this.categoryID1, false, category2_3, this.categoryID3, type)
                        } else {
                            category2_3 = this.getClassNameByID(".category")
                            if (parseInt(category2_3) === 000000) {//全部
                                this.getBookList(this.categoryID1, true, this.categoryID2, this.categoryID3, type)
                            } else {
                                this.getBookList(this.categoryID1, false, category2_3, this.categoryID3, type)
                            }
                        }
                    }
                }
            } else {//三级分类功能
                if (isAll) {// 全部
                    if (category2_3 == null && !isAll) {
                        category2_3 = this.getClassNameByID(".category")
                        this.getBookList(this.categoryID1, false, category2_3, this.categoryID3, type)
                    } else {
                        this.getBookList(this.categoryID1, true, this.categoryID2, category2_3, type)
                    }
                } else {
                    if (category2_3 == null) {
                        category2_3 = this.getClassNameByID(".category")
                        if (parseInt(category2_3) === 000000) {//全部
                            this.getBookList(this.categoryID1, true, this.categoryID2, category2_3, type)
                        } else {
                            this.getBookList(this.categoryID1, false, this.categoryID2, category2_3, type)
                        }
                    }
                    else {
                        this.getBookList(this.categoryID1, false, this.categoryID2, category2_3, type)
                    }
                }
            }
        },
        getClassNameByID: function (className) {
            return $(className).data("id")
        },
        loding: function () {
            var pHeight = $("footer").outerHeight(true) + $(".books-list li:last").outerHeight(true);
            if ($(document).scrollTop() + $(window).height() >= $(document).height() - pHeight) {
                if (this.gate) {
                    var category2 = this.getClassNameByID(".category")
                    var type = this.getClassNameByID(".tab-nav .on")
                    this.pageIndex++;
                    // 数据大于100条
                    if (this.pageIndex > this.totalPage) {
                        this.gate = false;
                        $('.loading').hide();
                        return false;
                    } else {
                        if (parseInt(category2) === 000000) {//全部
                            // 获取小说分类1级，分类2级，type
                            this.getBookList(this.categoryID1, true, category2, this.categoryID3, type, true, this.pageIndex);
                        } else {
                            this.getBookList(this.categoryID1, false, category2, this.categoryID3, type, true, this.pageIndex);
                        }
                        //$('.loading').show();
                    }
                } else {
                    $('.loading').hide();
                }
            }
        },
    }
})