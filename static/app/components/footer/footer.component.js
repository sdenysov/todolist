core.component('app-footer', {
    dependencies: ['$scope', '$tasksService'],
    templateUrl: './app/components/footer/footer.component.html',
    store: [
        'tasks',
        'selectedTasks'
    ],
    controller: function ($scope, $tasksService) {
        console.log('app-footer started...');

        $scope.$on('get-all-tasks', function () {
            $scope.taskCount = $scope.tasks.length
        });

        $scope.$on('add-new-task', function () {
            $scope.taskCount = $scope.tasks.length
        });

        $scope.$on('delete-task', function () {
            $scope.taskCount = $scope.tasks.length
        });

        $scope.onAllTasksFilter = function () {
            $scope.$notify('all-task-filter')
        };
        $scope.onActiveTasksFilter = function () {
            $scope.$notify('active-task-filter')
        };
        $scope.onCompletedTasksFilter = function () {
            $scope.$notify('completed-task-filter')
        }
    }
});