core.component('app-tasks', {
    dependencies: ['$scope', '$tasksService'],
    templateUrl: './app/components/tasks/tasks.component.html',
    store: [
        'tasks',
        'selectedTasks'
    ],
    controller: function ($scope, $tasksService) {
        console.log('app-tasks started...');

        $scope.$on('get-all-tasks', function (tasks) {
            $scope.allSelected = false;
            $scope.tasks = tasks;
            $scope.selectedTasks = [];
        });

        $scope.$on('select-all-tasks', function (checked) {
            $scope.selectedTasks = checked
                ? $scope.tasks.map(function (task) {
                    return {id: task.id}
                })
                : [];
        });

        $scope.$on('add-new-task', function (task) {
            $scope.allSelected = false;
            $scope.tasks.push(task);
        });

        $scope.$on('update-task', function (updatedTask) {
            console.log('...');
            $scope.tasks = $scope.tasks.map(function (task) {
                return task.id === updatedTask.id ? updatedTask : task;
            });
        });

        $scope.$on('completed-task-filter', function () {
            $scope.tasks = $scope.tasks.filter(function (task) {
                return $scope.selectedTasks.map(function (selectedTask) {
                    return selectedTask.id
                }).includes(task.id)
            });
        });

        $scope.$on('active-task-filter', function () {
            $scope.tasks = $scope.tasks.filter(function (task) {
                return !$scope.selectedTasks.map(function (selectedTask) {
                    return selectedTask.id
                }).includes(task.id)
            });
        });

        $scope.$on('all-task-filter', function () {
            $tasksService.getAllTasks(function (tasks) {
                $scope.tasks = tasks;
            });
        });

        $scope.isSelected = function (task) {
            return $scope.selectedTasks.some(function (item) {
                return item.id === task.id;
            });
        };

        $scope.onDelete = function ($event) {
            var id = extractTaskId($event);
            $tasksService.delete(id, function (id) {
                $scope.tasks = $scope.tasks.filter(function (task) {
                    return task.id !== id;
                });
                $scope.$notify('delete-task', id);
            });
        };

        $scope.onCheckTaskChange = function ($event) {
            var taskId = extractTaskId($event);
            $scope.selectedTasks = $event.target.checked
                ? $scope.selectedTasks.concat([{id: taskId}])
                : $scope.selectedTasks.filter(function (item) {
                    return item.id !== taskId
                });
            $scope.$notify('check-task-change');
        };

        $scope.updateTask = function ($event) {
            var dataForUpdate = {
                id: extractTaskId($event),
                title: $event.target.value,
                status_id: 1
            };
            $tasksService.update(dataForUpdate, function (updatedTask) {
                $scope.$notify('update-task', updatedTask);
            });
        };

        $tasksService.getAllTasks(function (tasks) {
            $scope.$notify('get-all-tasks', tasks);
        });

        function extractTaskId($event) {
            return $($event.target).closest('[data-task-id]').data('task-id');
        }
    }
});