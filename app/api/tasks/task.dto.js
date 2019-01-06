class TaskDto {

    constructor(params) {
        this.id = params.id || null;
        this.title = params.title;
        this.checked = params.checked;
    }
}

module.exports = TaskDto;