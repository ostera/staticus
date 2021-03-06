import fs from 'fs';
import path from 'path';

// Helpers
let readdir = fs.readdirSync;
let stat    = fs.lstatSync;
let exists  = fs.existsSync;
let join    = path.join;

// Filters
let hidden       = i => (i[0] !== '.')
let node_modules = i => (i !== 'node_modules')

let tree = root => {
  return readdir(root)
    .filter(hidden)
    .filter(node_modules)
    .reduce( (obj, key) => {
      let abs   = join(root, key);
      let isdir = stat(abs).blocks === 0;
      obj[key]  = (isdir ? tree(abs) : key);
      return obj
    }, {});
}

export default tree;
