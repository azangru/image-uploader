/*

  File access on the disk is thought to be the fastest when there aren't too many
  files in a single directory.

  This helper provides a naming convention for directories intended to
  distribute files fairly evenly among different directories

  The approach is borrowed shamelessly from
  - Michael Andrews’ answer on Stack Overflow: https://stackoverflow.com/a/44787915/3925302
  - His post on medium describing the approach in further detail:
    https://medium.com/eonian-technologies/file-name-hashing-creating-a-hashed-directory-structure-eabb03aa4091
  - A translation of a Java hashing function into JavaScript:
    https://stackoverflow.com/a/7616484/3925302

*/

// translation of Java’s String.hashCode method into JavaScript
// (https://stackoverflow.com/a/7616484/3925302)
function hashCode(string) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    let charCode = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + charCode;
    hash |= 0; // convert to 32bit integer
  }
  return hash;
}

// builds a path two directories deep based on a file name
// (https://stackoverflow.com/a/44787915/3925302)
function buildPathForFilename(fileName) {
  const hash = hashCode(fileName);
  const mask = 255;
  const firstDirName = hash & mask;
  const secondDirName = (hash >> 8) & mask;

  return `${firstDirName}/${secondDirName}`;
}

module.exports = {
  buildPathForFilename
};
