const StatusDto = require('./status.dto');

module.exports = {
    toDto: function(status) {
        return new StatusDto({
            id: status.id,
            name: status.name
         });
    },
    toModel: function() {
        throw new Error('Unsupported operation');
    }
};