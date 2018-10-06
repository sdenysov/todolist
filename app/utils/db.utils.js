
function handleError(error, connection, callback) {
    if (error) {
        connection.release();
        callback(error);
        return true;
    }
    return false;
}

module.exports = handleError;