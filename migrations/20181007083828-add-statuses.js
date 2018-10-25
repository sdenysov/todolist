'use strict';
var async = require('async');
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
    return async.series([db.insert.bind('statuses', ['name'], ['NOT STARTED'], function () {
        db.insert.bind('statuses', ['name'], ['IN PROGRESS'], function () {
            db.insert.bind('statuses', ['name'], ['COMPLETED'], noop);
        })
    })]);
};

exports.down = function (db) {
    return null;
};

exports._meta = {
    "version": 1
};
