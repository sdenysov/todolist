var HttpService = (function () {

    return {
        delete: function (url, callback) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: callback
            });
        },
        put: function (url, data, successCallback) {
            $.ajax({
                type: 'PUT',
                url: url,
                data: data,
                success: successCallback
            });
        },
        post: function (url, data, successCallback) {
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                success: successCallback
            });
        }
    };
})();