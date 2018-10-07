const TaskDto = require('./task.dto');
const StatusConvertor = require('../statuses/status.convertor');

module.exports = {
    toDto: function(source) {
        return new TaskDto({
            id: source.id,
            title: source.title,
            status: getStatus(source)
         });
    },
    toModel: function() {
        throw new Error('Unsupported operation');
    }
};

function getStatus(source) {
    return StatusConvertor.toDto({
        id: source.status.id,
        name: source.status.name
    });
}