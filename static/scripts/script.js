console.log('Script run...');

$(".delete-task-btn").click(function(e) {
    e.preventDefault();
    let task_id = $(".delete-task-btn").closest('.app-task').last().attr("data-task-id");
    $.ajax({
        type: "DELETE",
        url: "/tasks/" + task_id,
        success: function (data, status) {
            if (status === 'success') {
                location.reload();
            }
        }
    });
});