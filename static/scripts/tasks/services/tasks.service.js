var TaskService = (function () {

    var baseUrl = "/tasks/";

    return {
        insert: function (id, taskData, callback) {
            HttpService.post(baseUrl, taskData, callback)
        },
        remove: function (id, callback) {
            HttpService.delete(baseUrl + id, callback)
        },
        update: function (id, taskData, callback) {
            HttpService.put(baseUrl + id, taskData, callback)
        }
    };
})();