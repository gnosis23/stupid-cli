const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const log = console.log;

const dirName = 'hello-project';

const appPath = path.resolve(process.cwd(), dirName);
const templatePath = path.resolve(__dirname, '../template');

log(appPath);
log(templatePath);

if (!fs.existsSync(appPath)) {
  log('');
  log(`creating directory ${dirName}`);
  fs.mkdirSync(appPath);
}

// copy template to appPath
log(`copy template to ${appPath}`);
fs.copySync(templatePath, appPath);


// get dependencies
const packageJson = require(path.resolve(appPath, 'package.json'));
if (!packageJson.devDependencies) {
  log(`${chalk.red('resolve dependencies error')}`);
  process.exit(1);
}
