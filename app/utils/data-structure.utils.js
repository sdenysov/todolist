
function normalize(list, idField) {
    // TODO rewrite to normalize lib
    idField = idField || 'id';
    return list.reduce(function (result, item) {
        return result[item[idField]] = item;
    }, {});
}

module.exports.normalize = normalize;