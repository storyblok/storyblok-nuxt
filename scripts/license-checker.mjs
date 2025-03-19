import licenseChecker from 'license-checker';
import { resolve } from 'node:path';

// valid excluded licenses
const EXCLUDED_LICENSES = [
  'MIT',
  'ISC',
  'Apache-2.0',
  'BSD-3-Clause',
  'BSD-2-Clause',
  'BlueOak-1.0.0',
  'CC0-1.0',
  '0BSD',
  'CC-BY-4.0',
  'MIT*',
  'WTFPL',
  'MIT-0',
  'Python-2.0',
  'Public Domain',
  'CC-BY-3.0',
  'BSD*',
  'Unlicense',
];

console.log(
  'Licenser-checker: Starting to check if project uses only allowed licenses',
);

licenseChecker.init(
  {
    start: resolve(import.meta.dirname, '../'),
    production: true,
    json: true,
    exclude: EXCLUDED_LICENSES.join(','),
  },
  (err, packages) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    // we have licenses for @tipatap-pro and intro.js
    const packagesWithInvalidLicenses = Object.entries(packages);

    if (packagesWithInvalidLicenses.length > 0) {
      console.error('Invalid licenses found:');
      console.error(packagesWithInvalidLicenses);
      process.exit(1);
    }
    else {
      console.log('All licenses are valid');
    }
  },
);
