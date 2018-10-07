'use strict';

var dbm;
var type;
var seed;
var noop = function () {};

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db) {
    return db.insert('statuses', ['name'], ['NOT STARTED'], function () {
        db.insert('statuses', ['name'], ['IN PROGRESS'], function () {
            db.insert('statuses', ['name'], ['COMPLETED'], noop);
        })
    })
};

exports.down = function (db) {
    return null;
};

exports._meta = {
    "version": 1
};
