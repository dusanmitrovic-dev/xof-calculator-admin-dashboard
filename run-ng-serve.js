// run-ng-serve.js
require('dotenv').config({ path: '.env' });
const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || 4200;
const args = [
  'serve',
  '--port', port,
  '--proxy-config', 'proxy.conf.json'
];

const ngBin = path.join(__dirname, 'node_modules', '.bin', process.platform === 'win32' ? 'ng.cmd' : 'ng');
const child = spawn(ngBin, args, { stdio: 'inherit', shell: true });

child.on('exit', code => process.exit(code));
