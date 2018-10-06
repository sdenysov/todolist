console.log('Script run...');

$(".delete-task-btn").click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "DELETE",
        url: "/tasks",
        data: {
            task_id: $(".delete-task-btn").closest('.app-task').last().attr("data-task-id")
        }
    });
});