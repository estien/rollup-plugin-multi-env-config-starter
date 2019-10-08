import fs from 'fs';

export default function config() {
  let skip = true;
  let env = '';
  if (process.env.ENVIRONMENT) {
    skip = false;
    env = '.' + process.env.ENVIRONMENT;
  }
  let src = `./src/environment/config${env}.js`;
  const destination = './src/environment/config.js'
  const tmpDestination = './src/environment/config.temp';

  function revertConfigFiles() {
    if (skip) return;
    fs.renameSync(destination, src);
    fs.renameSync(tmpDestination, destination);
  }

  function swapConfigFiles() {
    if (skip) return;
    fs.renameSync(destination, tmpDestination);
    fs.renameSync(src, destination);
  }

  return {
    buildStart() {
      swapConfigFiles();
    },

    buildEnd() {
      revertConfigFiles();
    },

    buildError() {
      revertConfigFiles();
    }
  }
}