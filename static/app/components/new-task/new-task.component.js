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
            $scope.allSelected = $event.target.checked;
            $scope.$notify('select-all-tasks', $scope.allSelected);
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

        $scope.$on('check-task-change', updateAllTasksChecked);
        $scope.$on('delete-task', updateAllTasksChecked);

        function updateAllTasksChecked() {
            $scope.allSelected = $scope.tasks.every(function (t) {return t.checked});
        }
    }
});