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
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
    return async.series([db.insert.bind('tasks', ['title', 'status_id'], ['to do 1', '1'], function () {
        db.insert.bind('tasks', ['title', 'status_id'], ['to do 2', '1'], noop);
    })]);
};

exports.down = function(db) {
  return async.series([db.runSql.bind('delete from tasks where id in (1, 2);')]);
};

exports._meta = {
  "version": 1
};
