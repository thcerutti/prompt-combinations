const fs = require("fs");

const validateInput = (input) => {
  const filteredInput = input.filter((item) => !item.startsWith("--results="));

  if (filteredInput.length < 3) throw "invalid input, only 3 files supported";

  filteredInput.map((inputFilePath) => {
    if (!fs.existsSync(inputFilePath))
      throw `path ${inputFilePath} does not exist`;
  });
};

const filterInputFiles = (input) => {
  const onlyTextFilesRegex = /^.+\.txt/gm
  let files = [];
  input.map((item) => {
    if (item.match(onlyTextFilesRegex)) files.push(item);
  });
  return files;
};

const getMaxResults = (input) => {
  return input.filter(item => item.startsWith('--results='))[0]?.split('=')[1] ?? 0
}

module.exports = {
  validateInput,
  filterInputFiles,
  getMaxResults
};