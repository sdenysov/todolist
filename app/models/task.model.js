class Task {

    constructor(params) {
        this.id = params.id || null;
        this.title = params.title;
        this.status = params.status;
    }
}

module.exports = Task;