var datas = new Vue({
    el: '#app',
    data: {
        searchResultList: [{}],
        count: 0,
        searchKey: '',
        display: false,
        isNull: false
    },
    created: function () {
        var name = getQuery("s");
        this.getSearchResult(name);
    },
    methods: {
        getSearchResult: function (name) {
            $.ajax({
                type: "post",
                url: "/Search/SearchBooks",
                data: { name: name },
                dataType: "json",
                success: function (data) {
                    if (data != null) {
                        datas.searchResultList = data;
                        datas.count = data.length;
                        datas.searchKey = name;
                        datas.display = data.length > 15;
                        datas.isNull = false
                    } else {
                        datas.isNull = true
                    }
                    
                },
                error: function (data) {
                    console.log(data);
                }
            })
        },

        search: function () {
            var name = $("#search").val();
            if (!name) {
                return;
            }
            else {
                this.getSearchResult(name);
            }
        },
        trimName: function (name) {
            if (name.indexOf(searchKey) > -1) {
                name = name.slice(0, name.indexOf(searchKey));
            }
        }
    }
});

function getQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//从?之后开始匹配如getQuery(courseid)返回一个数组["courseid=8","","8","&",index:0,input:"courseid=8"]
    if (r != null) return decodeURIComponent(r[2]); return null;
}