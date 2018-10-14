var TaskService = (function () {

    var baseUrl = "/tasks/";

    return {
        remove: function (id, callback) {
            HttpService.delete(baseUrl + id, callback)
        },

        update: function (id, taskTitle, callback) {
            HttpService.update(baseUrl + id, taskTitle, callback)
        }
    }
})();