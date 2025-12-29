const fs = require('fs');
const path = require('path');

module.exports = function() {
  // Read the root package.json
  const packageJsonPath = path.resolve(__dirname, '../../../../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  return {
    version: packageJson.version,
    name: packageJson.name,
    repository: packageJson.repository.url.replace('git+', '').replace('.git', ''),
    npmUrl: `https://www.npmjs.com/package/${packageJson.name}`
  };
};
