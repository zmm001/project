function call_ajax(async, type, dataType, url, data, cb) {
    $.ajax({
        async: async,
        type: type,
        dataType: dataType,
        url: url,
        data: data,
        success: function (data) {
            if (cb)
                cb(data);
        }
    });
}