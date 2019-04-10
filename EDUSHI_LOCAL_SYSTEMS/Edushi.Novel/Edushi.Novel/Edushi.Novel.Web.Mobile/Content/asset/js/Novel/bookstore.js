var datas = new Vue({
    el: '#app',
    data: {
        maleCategoryList: [{}],//男生
        femaleCategoryList:[{}],//女生
        gate: true,
        pageIndex: 1,
        totalPage: 0,
    },
    created: function () {
        this.getCategoryList("1",true) // 默认男生
    },
    mounted: function () {
        window.addEventListener('scroll', this.loding)
    },
    methods: {
        // 分类列表
        getCategoryList: function (category1,isMale) {
            $.ajax({
                type: "post",
                url: "/Book/GetCategoryList",
                data: { categoryID: category1 },
                dataType: "json",
                success: function (data) {
                    if (data != null && data.childrenCategories != null || data.childrenCategories.length > 0) {
                        if (isMale) {
                            datas.maleCategoryList = data.childrenCategories
                        } else {
                            datas.femaleCategoryList = data.childrenCategories
                        }
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },   
        hrefGO: function (mes, ParentID, category2) {
            var category1IsNull = ParentID == '' ? '' : ("&category1=" + ParentID);
            var category2IsNull = category2 == '' ? '' : ("&category2=" + category2);
            window.location.href = "http://m.xiaoshuo.edushi.com/info/category.html" + "?category=" + escape(mes) + category1IsNull + category2IsNull
        }
    }
})