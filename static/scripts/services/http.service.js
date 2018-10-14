var HttpService = (function () {

    return {
        delete: function (url, callback) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: callback
            });
        },

        update: function (url, taskTitleValue, callback) {
            $.ajax({
                type: "POST",
                url: url,
                data: {taskTitle: taskTitleValue},
                success: callback
            });
        }
    }
})();