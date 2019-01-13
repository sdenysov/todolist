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
                var url = baseUrl + id;
                $httpService.delete(url, function () {
                    callback();
                })
            },
            deleteAllCompleted: function (ids, callback) {
                var url = '/api/deleteAllCompleted';
                $httpService.post(url, {ids: ids}, function () {
                    callback();
                })
            },
            update: function (task, callback) {
                $httpService.put(baseUrl, task, function (updatedTask) {
                    callback(updatedTask);
                })
            },
            updateAllStatuses: function (status, callback) {
                var url = '/api/selectAll';
                $httpService.put(url, {checked: status}, function (tasks) {
                    callback(tasks);
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