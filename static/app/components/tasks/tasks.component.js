core.component('app-tasks', {
    dependencies: ['$scope'],
    templateUrl: './app/components/tasks/tasks.component.html',
    controller: function ($scope) {
        console.log('app-tasks started...');
        $scope.$on('add-new-task', function (task) {

        });
    }
});