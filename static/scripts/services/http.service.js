var HttpService = (function () {

    return {
        delete: function (url, callback) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: callback
            });
        },

        update: function (url, data, successCallback) {
            $.ajax({
                type: "PUT",
                url: url,
                data: {taskTitle: data.title},
                success: successCallback
            });
        }
    }
})();