# Paper Helper (Invisible)

A simple extension for browsing and editing papers.

## Overview

Adds a right-click option to open the abstract and PDF for highlighted Arxiv ID's.

Includes a tool for quickly cleaning up paper markdown and TeX.

## Opening abstracts and PDF's

Supports extra text before the ID: Arxiv: ..., 1607/##
Easiest use is to triple-click anything on the ID line

## Cleaning up papers

Click the extension icon to open the cleanup tool. Paste raw paper contents in the top box, then a cleaned-up version will appear in the lower box.

It currently does this:

- Removes unnecessary linebreaks

- Adds linebreaks around math mode ($$..$$) where applicable

## Running this extension

1. Clone this repository.
2. Load this directory in Chrome as an [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. Right-click within the browser to view the context menu.
