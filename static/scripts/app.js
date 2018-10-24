var ENTER_KEY_CODE = 13;
var $taskContainer = $('#app-tasks-container');

$taskContainer.on('click', '.delete-task-btn', function () {
    var $deleteTaskBtn = $(this);
    const taskId = $deleteTaskBtn.closest('.app-task').attr("data-task-id");
    TaskService.remove(taskId, function (data, status) {
        if (status === 'success') {
            $deleteTaskBtn.closest('.app-task').remove();
        }
    });
});

$taskContainer.on("keypress", "input", function (event) {
    if (event.keyCode === ENTER_KEY_CODE) {
        var $taskInput = $(this);
        var taskId = $taskInput.closest('.app-task').attr("data-task-id");
        var taskData = {title: $taskInput.val()};
        TaskService.update(taskId, taskData, function (data, status) {
            if (status === 'success') {
                location.reload();
            }
        });
    }
});