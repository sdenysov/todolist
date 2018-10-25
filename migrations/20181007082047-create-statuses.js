'use strict';
var async = require('async');
var dbm;
var type;
var seed;
var TABLE_NAME = 'statuses';

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
    return async.series(
        [db.createTable.bind(TABLE_NAME, {
            columns: {
                id: {type: 'int', primaryKey: true, autoIncrement: true},
                name: {type: 'string', notNull: true}
            },
            ifNotExists: true
        })]
    );
};

exports.down = function (db) {
    return async.series([db.dropTable.bind(TABLE_NAME)]);
};

exports._meta = {
    "version": 1
};
