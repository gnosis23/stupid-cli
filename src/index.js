const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const inquirer = require('inquirer');
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
const packagePath = path.resolve(appPath, 'package.json');
const packageJson = require(packagePath);
if (!packageJson.devDependencies) {
  log(`${chalk.red('resolve dependencies error')}`);
  process.exit(1);
}

// npm install
log('');
const cwd = process.chdir(dirName);
log(`cwd ${chalk.yellow(cwd)}`);
log('npm install --verbose');
execSync('npm install --verbose', {stdio: 'inherit'});
log(chalk.green('npm install success!'));


// define variables
const question = {
  type: 'input',
  name: 'project',
  message: "What's your project name?",
  default: dirName,
  validate: function(value) {
    const pass = value.match(
      /^[0-9a-zA-Z\-]+$/
    );
    if (pass) {
      return true;
    }

    return 'Please enter a valid phone number';
  }
};
inquirer.prompt([question])
  .then(answer => {
    packageJson.name = answer.project;
    fs.writeFileSync(
      packagePath,
      JSON.stringify(packageJson, null, 2) + os.EOL
    );
  });

