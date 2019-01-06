const nconf = require('nconf');
const path = require('path');

nconf.argv().env().file({ file: path.join(__dirname, 'database.json') });

const env = process.env.NODE_ENV || nconf.get('defaultEnv');

module.exports = nconf.get(env);