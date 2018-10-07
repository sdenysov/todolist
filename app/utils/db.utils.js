
function breakIfErrorExists(error, callback) {
    if (error) {
        callback(error);
        return true;
    }
    return false;
}

module.exports.breakIfErrorExists = breakIfErrorExists;