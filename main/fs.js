import { readFile, writeFile, rename } from 'fs/promises';
import * as path from 'path';
import { state } from './state.js';
import { checkPathExistAndExecCb } from '../utils/navigation.js';

export const cat = (_path) => {
  const cb = async (_path) => {
    const promise = readFile(_path);
    const res = await promise;
    console.log(res.toString());
  };

  checkPathExistAndExecCb(_path, cb);
};

export const add = (fileName) => {
  writeFile(
    `${state.currentDirectory}${path.sep}${fileName}`,
    '',
    function (err) {
      if (err) throw err;
    }
  );
};

export const rn = async (_path, newName) => {
  const cb = async (_path) => {
    rename(
      _path,
      `${path.dirname(_path)}${path.sep}${newName}`,
      function (err) {
        if (err) console.log('ERROR: ' + err);
      }
    );
  };

  checkPathExistAndExecCb(_path, cb);
};

export const cd = async (_path) => {
  const cb = async (_path) => {
    state.currentDirectory = _path;
  };

  checkPathExistAndExecCb(_path, cb);
};
