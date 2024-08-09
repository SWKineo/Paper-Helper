// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Registering this listener when the script is first executed ensures that the
// offscreen document will be able to receive messages when the promise returned
// by `offscreen.createDocument()` resolves.

const rawPaper = document.querySelector('#raw-code');
const filteredPaper = document.querySelector('#filtered-code');

let rawPaperCode = "";
let filteredPaperCode = "";

rawPaper.addEventListener("change", (event) => {
  rawPaperCode = event.target.value;
  console.log(`Raw paper length: ${rawPaperCode.length}`);
  filteredPaperCode = cleanUpPaper(rawPaperCode);
  console.log(`Filtered paper length: ${filteredPaperCode.length}`);

  filteredPaper.value = filteredPaperCode;
});

/* Clean up paper content formatting */
function cleanUpPaper(paper) {
  let workzone = `${paper}`;

  // Remove surrounding text from the page, if applicable
  workzone = workzone.replace(/[\s\S]+?1\nUser\nAll\n/g, "");
  workzone = workzone.replace(/(?:2\nAssistant\nAll)|(?:Assistant\nIdeal\n)[\s\S]+/g, "");

  // Remove unnecessary newlines
  workzone = workzone.replace(/(?<=[\S]+)\n(?=[\S])/g, " ");
  // Add newlines around math mode ($$ $$)
  workzone = workzone.replace(/(?<=\S)\s+\$\$([\s\S]+?)\$\$/g, "\n\n$$$$$1$$$$");
  workzone = workzone.replace(/\$\$([\s\S]+?)\$\$\s+(?=\S)/g, "$$$$$1$$$$\n\n");

  // Replace \mbox's containing math with plain math
  workzone = workzone.replace(/\\mbox\s*\{\$(.*?)\$\}/g, "$1");
  // Replace \mbox's containing text with \text's
  workzone = workzone.replace(/\\mbox\s*\{(.*?)\}/g, "\text{$1}");

  // Clean up formatting for theorems, lemmas, corollaries, propositions, proofs, exercises, examples
  workzone = workzone.replace(/::: \w+\*/g, "::: *");

  // Clean up special or misread symbols
  workzone = workzone.replace(/◻/g, "$\\square$");
  workzone = workzone.replace(/ /g, " ");

  // Fix indexed lists
  // workzone = workzone.replace(/^(\$?(?:\([IVXa-z\d]+\))|(?:[IVXa-z\d]+\.)\$?)[\n\r\s]*:[\n\r\s]*(\S)/g, "$1: $2");

  return workzone;
}
