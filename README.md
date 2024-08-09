# Paper Helper (Invisible)

A simple extension for browsing and cleaning-up papers.

## Overview

Adds a right-click option to open the abstract and PDF for highlighted Arxiv ID's:

![right-click-pdf-abstract-screenshot](https://github.com/user-attachments/assets/5e0162bc-8ccb-41b7-b68b-58fd005826f0)

Includes a tool for quickly cleaning up paper markdown and TeX:

![paper-cleanup-screenshot](https://github.com/user-attachments/assets/12e1e5c7-1c82-4126-a228-44f46a547805)

## Opening PDF's and abstracts

To open the PDF and abstract of a paper, highlight the ID, then right-click it and select 'Open PDF and abstract'. The extension filters text before the ID, so it's okay to include extra text on the same line (e.g. "Arxiv: .../##.##.gz"). The quickest way to use is to triple-click anything on the ID line, then right-click the whole selection:

![chrome_Sv7CLg4K3W](https://github.com/user-attachments/assets/8813a01e-ef92-4d94-a391-ab9855d9431c)

(Also supports special topics, e.g. "Arxiv: 0306/hep-lat0306015.gz")

## Cleaning up paper formatting

To fix common formatting issues, click the extension icon ![inv-16](https://github.com/user-attachments/assets/ff069a31-0fbd-4ead-9114-c3401f153199) to open the cleanup tool. Paste raw paper contents in the top box, then a cleaned-up version will appear in the lower box.

It currently uses regular expressions to perform the following:

- removes surrounding text from the page (above and below the paper)

- removes unnecessary linebreaks;

- adds linebreaks around math mode ($$..$$) where applicable;

- replaces common unicode characters (currently '◻' and ' ') and unsupported/deprecated libraries (\mathpzc, \rm, \mbox)

I'll be expanding this as I clean up my own papers, so feel free to suggest new edits! Current regexes can be found in the `cleanUpPaper` function in `inv.paper-helper/popup.js`.

## Loading this extension

1. Clone this repository, or download it as a ZIP and extract the folder `inv.paper-helper`:

![image](https://github.com/user-attachments/assets/944024cf-81ed-4c9a-ba98-a422440c4d49)

2. Load this folder in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked):

   - Go to `chrome://extensions/` (you'll need to enter it in the Chrome address bar manually)
   - Turn on developer mode with the toggle at the top-right of the page
   - Click the 'Load unpacked' button that will appear at the top-left of the page
   - Select the folder (`inv.paper-helper`)
  
![image](https://github.com/user-attachments/assets/3da77aa4-11f0-46e8-8d43-1a52cbfb45f8)

![image](https://github.com/user-attachments/assets/1a0fd962-cd71-4d0d-94a5-0ad72b0e896e)
