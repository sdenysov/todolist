core.service('tasksService', {
    dependencies: ['$httpService'],
    constructor: function ($httpService) {
        var baseUrl = '/api/tasks/';
        return {
            getAllTasks: function (callback) {
                $httpService.get(baseUrl, function (tasks) {
                    callback(tasks);
                })
            },
            getByStatus: function (statusId, callback) {
                var url = baseUrl + '?statusId=' + statusId;
                $httpService.get(url, function (tasks) {
                    callback(tasks);
                })
            },
            delete: function (id, callback) {
                var deleteTaskUrl = baseUrl + id;
                $httpService.delete(deleteTaskUrl, function () {
                    callback(id);
                })
            },
            update: function (task, callback) {
                $httpService.put(baseUrl, task, function (updatedTask) {
                    callback(updatedTask);
                })
            },
            save: function (task, callback) {
                $httpService.post(baseUrl, task, function (insertedId) {
                    task.id = insertedId;
                    callback(task);
                })
            }
        };
    }
});