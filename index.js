#!/usr/bin/env node
/* eslint-disable no-console */
const { MetasysServerApi } = require('@metasys/nodekit');
const fs = require('fs');

const { processArguments, promptPassword } = require('./lib/helpers');

function isoDateString(value) {
  return (new Date(value)).toISOString();
}

function humanDateString(value) {
  return (new Date(value)).toLocaleString();
}

async function main() {
  const options = processArguments();

  const password = options.password || promptPassword();

  const api = new MetasysServerApi();
  const loginSuccessful = await api.login(options.username,
    password, options.hostname, options.requestOptions);

  if (!loginSuccessful) {
    return;
  }


  // create output/ directory
  try {
    fs.mkdirSync('./output');
  } catch (e) {
    // If it already exists, that's fine; else log error and quit.
    if (e.code !== 'EEXIST') {
      console.log(e);
      return;
    }
  }

  const endTimeValue = Date.now();
  const startTimeValue = endTimeValue - (24 * 60 * 60 * 1000);

  const endTime = isoDateString(endTimeValue);
  const startTime = isoDateString(startTimeValue);

  console.log(`Fetching alarms in the range ${humanDateString(startTimeValue)} - ${humanDateString(endTimeValue)}`);
  /* eslint-disable-next-line no-restricted-syntax */
  for await (const alarm of await api.alarms({ startTime, endTime })) {
    process.stdout.write('.');
    fs.writeFileSync(`output/${alarm.id}.json`, JSON.stringify(alarm, null, 2));
  }
}

main();
