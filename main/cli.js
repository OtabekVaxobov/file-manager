import * as readline from 'node:readline';
import { byeUser, currentDir } from '../utils/notifications.js';
import { osCommandHandler } from './os.js';
import { up, cd, ls } from './nav.js';
import { cat, add, rn } from './fs.js';
import { compress, decompress } from './zip.js';
import { calculateHash } from './hash.js';
import { EventEmitter } from 'events';
import { state } from '../main/state.js';

state.eventEmitter = new EventEmitter();
let rl;

export const initCLI = () => {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'WRITE_HERE> ',
  });

  rl.prompt();

  rl.on('line', (line) => {
    currentDir();
    parseInput(line);
  }).on('close', () => {
    byeUser();
    process.exit(0);
  });

  state.eventEmitter.on('jobDone', () => {
    currentDir();
    rl.prompt();
  });
};

export const parseInput = (input) => {
  const [command, ...args] = input.trim().split(' ');

  switch (command) {
    case 'up':
      up();
      break;
    case 'cd':
      cd(args[0]);
      break;
    case 'ls':
      ls();
      break;
    case 'cat':
      cat(args[0]);
      break;
    case 'add':
      add(args[0]);
      break;
    case 'rn':
      rn(args[0], args[1]);
      break;
    case 'cp':
      break;
    case 'mv':
      break;
    case 'add':
      break;
    case 'rm':
      break;
    case 'os':
      osCommandHandler(args);
      break;
    case 'hash':
      calculateHash(args[0]);
      break;
    case 'compress':
      compress(args[0], args[1]);
      break;
    case 'decompress':
      decompress(args[0], args[1]);
      break;
    default:
      console.log(`Invalid input: ${command}`);
      state.eventEmitter.emit('jobDone');
  }
};
