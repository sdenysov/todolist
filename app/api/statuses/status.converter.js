const StatusDto = require('./status.dto');
const TaskStatus = require('../../models/task-status');
const Status = require('../../models').Status;

module.exports = {
    toDto: function(status) {
        return new StatusDto({
            id: status.id,
            name: status.name
         });
    },
    toModel: function(isCompleted, callback) {
        const statusId = isCompleted === "true" ? TaskStatus.COMPLETED : TaskStatus.NOT_STARTED;
        Status.findByPk(statusId).then(callback);
    }
};