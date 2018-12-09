'use strict';
var async = require('async');
var dbm;
var type;
var seed;
var TABLE_NAME = 'tasks';

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
    return db.createTable(TABLE_NAME, {
        columns: {
            id: {type: 'int', primaryKey: true, autoIncrement: true},
            title: {type: 'string', notNull: true},
            status_id: {
                type: 'int',
                notNull: true,
                foreignKey: {
                    name: 'tasks_statuses_id_fk',
                    table: 'statuses',
                    rules: {
                        onDelete: 'NO ACTION',
                        onUpdate: 'NO ACTION'
                    },
                    mapping: 'id'
                }
            }
        },
        ifNotExists: true
    });
};

exports.down = function (db) {
    return db.dropTable(TABLE_NAME);
};

exports._meta = {
    "version": 1
};
