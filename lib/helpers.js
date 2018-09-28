const readlineSync = require('readline-sync');
const parseArgs = require('minimist');
const fs = require('fs');

function promptPassword() {
  return readlineSync.question('Password: ', { hideEchoBack: true });
}


function processArguments() {
  const args = parseArgs(process.argv.slice(2), { boolean: 'insecure' });

  const options = {};

  // Read file if one specified.
  const filename = args.f;

  if (filename) {
    const file = JSON.parse(fs.readFileSync(filename));

    options.username = file.username;
    options.hostname = file.hostname;
    options.password = file.password;
  }

  // If not set yet, check command line switches
  if (!options.username) {
    options.username = args.u || args.username;
  }
  if (!options.hostname) {
    options.hostname = args.h || args.hostname;
  }

  if (!options.password) {
    options.password = args.p || args.password;
  }

  // If still not set, check env variables
  if (!options.username) {
    options.username = process.env.METASYS_USERNAME;
  }
  if (!options.hostname) {
    options.hostname = process.env.METASYS_HOSTNAME;
  }

  if (args.ca) {
    options.requestOptions = { ca: fs.readFileSync(args.ca) };
  }

  if (args.insecure) {
    options.requestOptions = { strictSSL: false };
  }

  if (!options.username) {
    throw new Error('No username provided');
  }

  return options;
}

module.exports = { promptPassword, processArguments };
