var datas = new Vue({
    el: '#app',
    data: {
        recommendLists: [{}],
    },
    created: function() {
        this.getRecommendLists();
    },
    methods: {
        getRecommendLists: function () {
            $.ajax({
                type: "get",
                url: "/Home/GetIndexRecommendListForSearch",
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.recommendLists = data;
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },
        getclassId: function (index) {
            var rnd = rnd = Math.floor((Math.random() * 7) + 1);
            
            return "color" + rnd.toString()
        },
        getUrl: function(name) {
            return "http://m.xiaoshuo.edushi.com/info/searchResult.html?s=" + name;
        }
    },
});


$(function () {
    $(".search-btn").click(function () {
        window.location.href = "http://m.xiaoshuo.edushi.com/info/searchResult.html" + "?s=" + $("#search").val();
    });
});


