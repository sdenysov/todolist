core.component('app-footer', {
    dependencies: ['$scope', '$tasksService'],
    templateUrl: './app/components/footer/footer.component.html',
    store: [
        'tasks'
    ],
    controller: function ($scope, $tasksService) {
        console.log('app-footer started...');

        $scope.$on('all-tasks-fetched', function (tasks) {
            $scope.taskCount = tasks.length
        });

        $scope.$on('add-new-task', function () {
            $scope.taskCount = $scope.tasks.length
        });

        $scope.$on('delete-task', function () {
            $scope.taskCount = $scope.tasks.length
        });

        $scope.filterAll = function () {
            $tasksService.getAllTasks(function (tasks) {
                $scope.$notify('all-tasks-fetched', tasks);
            });
        };
        $scope.filterActive = function () {
            $tasksService.getByStatus(1, function (tasks) {
                $scope.$notify('all-tasks-fetched', tasks);
            });
        };
        $scope.filterCompleted = function () {
            $tasksService.getByStatus(3, function (tasks) {
                $scope.$notify('all-tasks-fetched', tasks);
            });
        };
        $scope.clearCompleted = function () {
            var tasksIdForDelete = $scope.tasks
                .filter(function (task) {
                    return task.checked === true;
                })
                .map(function (task) {
                    return task.id
                });
            $tasksService.deleteAllCompleted(tasksIdForDelete, function () {
                $scope.tasks = $scope.tasks.filter(function (task) {
                    return tasksIdForDelete.includes(task.id);
                });
                $scope.$notify('all-tasks-fetched', $scope.tasks);
            })
        }
    }
});