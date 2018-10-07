const StatusDto = require('./status.dto');

module.exports = {
    toDto: function(source) {
        return new StatusDto({
            id: source.id,
            name: source.name
         });
    },
    toModel: function() {
        throw new Error('Unsupported operation');
    }
};