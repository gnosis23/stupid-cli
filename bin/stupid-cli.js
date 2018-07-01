#!/usr/bin/env node
const chalk = require('chalk');
const Cli = require('../src/index');
const log = console.log;

if (process.argv.length < 3) {
  log('');
  log('usage: stupid-cli ' + chalk.yellow('<Directory>'));
  log('');
  process.exit(1);
}

const dirName = process.argv[2];
Cli.buildStupidApp(dirName);