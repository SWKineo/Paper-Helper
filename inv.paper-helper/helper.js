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

// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(onClick);

// A generic onclick callback function.
async function onClick(info, tab) {
  console.log(`info: ${info}`);
  console.log(`tab: ${tab}`);

  let paperId;
  let abstractUrl;
  let pdfUrl;
  let abstractActive;
  let pdfActive;

  switch (info.menuItemId) {
    // case 'deh-open-pdf':
    //   // Open the PDF in the foreground
    //   paperId =  getPaperId(info.selectionText);
    //   currentTabIndex = tab.index;
    //   if (!paperId) break;
    //   pdfUrl = `https://arxiv.org/pdf/${paperId}.pdf`;
    //   pdfActive = true;
    //   break;
    // case 'deh-open-abstract':
    //   // Open the abstract in the foreground
    //   paperId =  getPaperId(info.selectionText);
    //   if (!paperId) break;
    //   currentTabIndex = tab.index;
    //   abstractUrl = `https://arxiv.org/abs/${paperId}`;
    //   abstractActive = true;
    //   break;
    // case 'deh-open-abstract-background':
    //   // Open the abstract in the background
    //   paperId =  getPaperId(info.selectionText);
    //   if (!paperId) break;
    //   currentTabIndex = tab.index;
    //   abstractUrl = `https://arxiv.org/abs/${paperId}`;
    //   abstractActive = false;
    //   break;
    case 'deh-open-pdf-and-abstract':
      // Open the PDF in the foreground and the abstract in the background
      paperId = getPaperId(info.selectionText);
      if (!paperId) break;
      currentTabIndex = tab.index;
      pdfUrl = `https://arxiv.org/pdf/${paperId}.pdf`;
      abstractUrl = `https://arxiv.org/abs/${paperId}`;
      pdfActive = true;
      abstractActive = false;
      break;
    // case 'deh-copy-clean-up':
    //   // Copy the paper code, clean it up, and store it in the clipboard
    //   let paper = info.selectionText;
    //   let cleanPaper = cleanUpPaper(paper);
    //   await addToClipboard(cleanPaper);
    //   break;
  }

  if (abstractUrl) {
    chrome.tabs.create({
      index: ++currentTabIndex,
      url: abstractUrl,
      active: abstractActive
    })
  }
  if (pdfUrl) {
    chrome.tabs.create({
      index: currentTabIndex + 1,
      url: pdfUrl,
      active: pdfActive
    })
  }

}

/* Find the ID (matches[2]) in the selected text.
 *
 * Where applicable, parse out the subject specificer (matches[1]),
 * then format them for the URL. */
function getPaperId(idText) {
  let matches = idText.match(/([A-z-]*?)([\d]*\.?[\d]+)\.?g?z?$/)
  console.log(matches);
  if (matches && matches.length == 3) {
    if (matches[1].length == 0) {
      return matches[2];
    } else {
      return `${matches[1]}/${matches[2]}`
    }
  } else {
    return null;
  }
}

/* Clean up paper content formatting */
function cleanUpPaper(paper) {
  // Remove unnecessary newlines
  // return paper.replace(/(?<=[\S]+)\n(?=[\S])/g, " ");
  return paper;
}

// async function addToClipboard(value) {
//   await chrome.offscreen.createDocument({
//     url: 'offscreen.html',
//     reasons: [chrome.offscreen.Reason.CLIPBOARD],
//     justification: 'Write text to the clipboard.'
//   });

//   // Now that we have an offscreen document, we can dispatch the
//   // message.
//   chrome.runtime.sendMessage({
//     type: 'copy-data-to-clipboard',
//     target: 'offscreen-doc',
//     data: value
//   });
// }

/* Add context menus */
chrome.runtime.onInstalled.addListener(function () {
  
  // chrome.contextMenus.create({
  //   title: "Open PDF",
  //   id: "deh-open-pdf",
  //   contexts: ['selection'],
  //   documentUrlPatterns: ["https://*.com/tasks/*"]
  // });
  
  // chrome.contextMenus.create({
  //   title: "Open abstract",
  //   id: "deh-open-abstract",
  //   contexts: ['selection'],
  //   documentUrlPatterns: ["https://*.com/tasks/*"]
  // });
  
  // chrome.contextMenus.create({
  //   title: "Open abstract in the background",
  //   id: "deh-open-abstract-background",
  //   contexts: ['selection'],
  //   documentUrlPatterns: ["https://*.com/tasks/*"]
  // });

  chrome.contextMenus.create({
    title: "Open PDF and abstract",
    id: "deh-open-pdf-and-abstract",
    contexts: ['selection'],
    documentUrlPatterns: ["https://*.com/tasks/*"]
  });

  // chrome.contextMenus.create({
  //   title: "Copy and clean-up paper contents",
  //   id: "deh-copy-clean-up",
  //   contexts: ['selection'],
  //   documentUrlPatterns: ["https://*.com/tasks/*"]
  // })

});
