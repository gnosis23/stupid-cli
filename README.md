# stupid-cli
如何制作一个CLI工具

## 目的
假设公司里开发了一套很牛逼的框架，然后每次开新项目的时候都要：
- 复制粘贴骨架代码
- 然后npm install一下
- 然后修改一些变量名称，比如包名
- git init 下
- 等等等等

有没有办法自动化一下以上步骤？
stupid-cli就是这么一个工具(轮子)

## 命令
```bash
stupid-cli <directory>
```

## 第一步：复制骨架代码
假设我们要初始化一个 vue 项目，首先我们把骨架文件扔到 template 文件夹下面，里面要有 package.json 文件，用来记录它的依赖。
```javascript
const fs = require('fs-extra');

log(`copy template to ${workingPath}`);
fs.copySync(templatePath, workingPath);
```


## 第二步：npm install
使用 child_process.execSync 调用 npm install 命令。
```javascript
const cwd = process.chdir(dirName);
log(`cwd ${chalk.yellow(cwd)}`);
log('npm install --verbose');
execSync('npm install --verbose', {stdio: 'inherit'});
log(chalk.green('npm install success!'));
```

## 第三步：修改变量
使用 inquirer 来获取用户输入。
```javascript
inquirer.prompt([question])
  .then(answer => {
    packageJson.name = answer.project;
    fs.writeFileSync(
      packagePath,
      JSON.stringify(packageJson, null, 2) + os.EOL
    );
  });
```


## 第四步：git


## Installation
```sh
npm link
stupid-cli aaa
```