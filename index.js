const fs = require("fs");
const {
  validateInput,
  filterInputFiles,
  getMaxResults,
} = require("./src/inputValidation");
const { shuffleArray } = require("./src/outputTools");

const inputFilesPathArray = filterInputFiles(process.argv.slice(2));
validateInput(inputFilesPathArray);

const readFileContent = (path) => fs.readFileSync(path, { encoding: "utf8" });

let wordsMatrix = [];

inputFilesPathArray.map((path) => {
  wordsMatrix.push(readFileContent(path).split("\n"));
});

const defaultOutputPath = "./output.txt";
if (fs.existsSync(defaultOutputPath)) {
  fs.unlinkSync(defaultOutputPath);
}

let outputArray = [];
wordsMatrix[0].map((file1Item) => {
  wordsMatrix[1].map((file2Item) => {
    wordsMatrix[2].map((file3Item) => {
      fileContent = `${file1Item.trim()} ${file2Item.trim()} ${file3Item.trim()}\n`;
      outputArray.push(fileContent);
    });
  });
});

let outputContent = shuffleArray(outputArray);
let maxResults = getMaxResults(process.argv);
if (maxResults > 0) {
  outputContent = outputContent.splice(0, maxResults);
}

fs.appendFileSync(`output.txt`, outputContent.join(""));
