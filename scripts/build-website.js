const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { execSync } = require('child_process');

const websitePath = path.join(__dirname, '..', 'website');
const websiteDistPath = path.join(websitePath, 'dist');
const examplesSourcePath = path.join(websitePath, 'examples');
const examplesDistPath = path.join(websiteDistPath, 'examples');

const examplePaths = glob.sync(path.join(examplesSourcePath, '*'));
const staticPaths = ['assets'];

execSync(`mkdir -p ${examplesDistPath}`);

staticPaths.forEach(staticPath => {
  const sourcePath = path.join(websitePath, staticPath);
  const destPath = path.join(websiteDistPath, staticPath);

  execSync(`cp -r ${sourcePath} ${destPath}`);
});

examplePaths.forEach(examplePath => {
  const dirName = path.basename(examplePath);

  execSync(`cd ${examplePath} && yarn && PUBLIC_URL="." yarn build`, {
    stdio: 'inherit',
  });

  fs.renameSync(
    path.join(examplesSourcePath, dirName, 'build'),
    path.join(examplesDistPath, dirName)
  );
});
