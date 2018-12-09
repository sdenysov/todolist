core.component('app-new-task', {
    dependencies: ['$scope'],
    templateUrl: './app/components/new-task/new-task.component.html',
    controller: function ($scope) {
        console.log('app-new-task started...');
        $scope.$notify('add-new-task', {});
    }
});