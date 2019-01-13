core.component('app-tasks', {
    dependencies: ['$scope', '$tasksService'],
    templateUrl: './app/components/tasks/tasks.component.html',
    store: [
        'allSelected',
        'tasks'
    ],
    controller: function ($scope, $tasksService) {
        console.log('app-tasks started...');

        $scope.$on('all-tasks-fetched', function (tasks) {
            $scope.tasks = tasks;
        });

        $scope.$on('all-check', function (checked) {
            $scope.tasks = $scope.tasks.map(function (task) {
                task.checked = checked;
                return task;
            });
        });

        $scope.$on('add-new-task', function (task) {
            $scope.allSelected = false;
            $scope.tasks.push(task);
        });

        $scope.onDelete = function ($event) {
            var id = extractTaskId($event);
            $tasksService.delete(id, function () {
                $scope.tasks = $scope.tasks.filter(function (task) {
                    return task.id !== id;
                });
                $scope.$notify('delete-task', $scope.tasks);
            });
        };

        $scope.onCheckTaskChange = function ($event) {
            var taskId = extractTaskId($event);
            var taskForUpdate = $scope.tasks.find(function (task) {
                return task.id === taskId;
            });
            taskForUpdate.checked = $event.target.checked;
            $tasksService.update(taskForUpdate, function (updatedTask) {
                $scope.tasks = $scope.tasks.map(function (task) {
                    return task.id === updatedTask.id ? updatedTask : task;
                });
                $scope.$notify('check-task-change', $scope.tasks);
            });
        };

        $scope.updateTask = function ($event) {
            var dataForUpdate = {
                id: extractTaskId($event),
                title: $event.target.value
            };
            $tasksService.update(dataForUpdate, function (updatedTask) {
                var tasks = $scope.tasks.map(function (task) {
                    return task.id === updatedTask.id ? updatedTask : task;
                });
                console.log(tasks);
                $scope.tasks = tasks;
                $scope.$notify('update-task', updatedTask);
            });
        };

        $tasksService.getAllTasks(function (tasks) {
            $scope.tasks = tasks;
            $scope.$notify('all-tasks-fetched', tasks);
        });

        function extractTaskId($event) {
            return $($event.target).closest('[data-task-id]').data('task-id');
        }
    }
});