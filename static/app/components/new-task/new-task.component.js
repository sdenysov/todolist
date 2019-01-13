core.component('app-new-task', {
    dependencies: ['$scope', '$tasksService'],
    templateUrl: './app/components/new-task/new-task.component.html',
    store: [
        'allSelected',
        'tasks'
    ],
    controller: function ($scope, $tasksService) {
        console.log('app-new-task started...');
        $scope.onSelectAllClick = function ($event) {
            var allSelected = $event.target.checked;
            $scope.allSelected = allSelected;
            $tasksService.updateAllStatuses(allSelected, function () {
                $scope.$notify('all-check', allSelected);
            });
        };
        $scope.addNewTask = function ($event) {
            var task = {
                title: $event.target.value,
                status: {name: 'status_name'}
            };
            $tasksService.save(task, function (task) {
                $event.target.value = '';
                $scope.$notify('add-new-task', task);
            });
        };

        $scope.$on('all-tasks-fetched', updateAllTasksChecked);
        $scope.$on('check-task-change', updateAllTasksChecked);
        $scope.$on('delete-task', updateAllTasksChecked);

        function updateAllTasksChecked(tasks) {
            $scope.allSelected = tasks.every(function (t) {
                return t.checked;
            });
        }
    }
});