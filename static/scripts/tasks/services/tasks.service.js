var TaskService = (function () {

    var baseUrl = "/tasks/";

    return {
        remove: function (id, callback) {
            HttpService.delete(baseUrl + id, callback)
        },

        update: function (id, taskData, callback) {
            HttpService.update(baseUrl + id, taskData, callback)
        }
    }
})();