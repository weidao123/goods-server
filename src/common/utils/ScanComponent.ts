const path = require('path');
const fs = require('fs');

export function scanComponent(dir: string) {
  const dirStr = path.resolve(process.cwd(), dir);
  const files = fs.readdirSync(dirStr);
  const arr = [];
  for (const file of files) {
    const url = path.resolve(dirStr, file);
    if (fs.statSync(url).isDirectory()) {
      arr.push(...scanComponent(dir + '/' + file));
    } else {
      const target = Object.values(require(url)).filter(
        (f) => typeof f === 'function',
      );
      arr.push(...target);
    }
  }
  return arr;
}
