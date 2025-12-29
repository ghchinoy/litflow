import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function() {
  // Read the root package.json
  const packageJsonPath = path.resolve(__dirname, '../../../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  return {
    version: packageJson.version,
    name: packageJson.name,
    repository: packageJson.repository.url.replace('git+', '').replace('.git', ''),
    npmUrl: `https://www.npmjs.com/package/${packageJson.name}`
  };
};