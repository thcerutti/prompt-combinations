const fs = require("fs");

const validateInput = (input) => {
  if (input.length < 3) throw "invalid input, only 2 files supported";

  input.map((inputFilePath) => {
    if (!fs.existsSync(inputFilePath))
      throw `path ${inputFilePath} does not exist`;
  });
};

const inputFilesPathArray = process.argv.slice(2);
validateInput(inputFilesPathArray);

const readFileContent = (path) => fs.readFileSync(path, { encoding: "utf8" });

let wordsMatrix = [];

inputFilesPathArray.map((path) => {
  wordsMatrix.push(readFileContent(path).split("\n"));
});

fs.unlinkSync("./output.txt");

wordsMatrix[0].map((file1Item) => {
  wordsMatrix[1].map((file2Item) => {
    wordsMatrix[2].map((file3Item) => {
      fileContent = `${file1Item} ${file2Item} ${file3Item}\n`;
      fs.appendFileSync(`output.txt`, fileContent);
    });
  });
});
