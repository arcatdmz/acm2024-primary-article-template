const fs = require("fs");

// The following script is a slight modification from the abstract extraction tool by Ruofei Du:
// https://tool.duruofei.com/abstract/

const sysinExp = `\\${process.env.SYSTEM_NAME_COMMAND || "systemname"}`;
const sysout = process.env.SYSTEM_NAME || "Geollery";

function WordCount(str) {
  return str.split(/\s+/).length;
}

function Analyze(a) {
  var res = a.trim();
  // begin re_abstract
  const startWord = "\\begin{abstract}";
  let start = res.indexOf(startWord),
    end = res.indexOf("\\end{abstract");
  if (start >= 0 && end >= start) {
    res = res.substring(start + startWord.length, end).trim();
  }

  // ieee \re_abstract
  re_abs = /\\re_abstract{(.+)}/gm;
  match = re_abs.exec(res);
  if (match && match[1]) {
    res = match[1];
  }

  // citations
  res = res.replace(/\\cite\{[\w\d,:]+\}/g, "");
  res = res.replace(/\\ref\{[\w\d,:]+\}/g, "X");
  res = res.replace(/\\begin\{[\w\d,:]+\}\[.+\]/g, "");
  res = res.replace(/\\end\{[\w\d,:]+\}/g, "");
  res = res.replace(/\\label\{[\w\d,:]+\}/g, "");
  res = res.replace(/\\centering/g, "");
  res = res.replace(/\\caption/g, "");
  res = res.replace(/\\LaTeX\\/g, "LaTeX");
  res = res.replace(
    /\\includegraphics[\[\w\d\,\.\:\=\/\\]+\]\{[\w\d,\.\:\/\\\_]+\}/g,
    ""
  );

  // latex symbols
  res = res.replace(/\\degree/g, "°");
  res = res.replace(/\\times/g, "×");
  res = res.replace(/\\etal/g, "et al.");
  res = res.replace(/``/g, '"');
  res = res.replace(/""/g, '"');
  res = res.replace(/\'\'/g, '"');
  res = res.replace(/\\&/g, "&");
  res = res.replace(/ \./g, ".");
  let sysin = new RegExp("\\" + sysinExp, "g");
  res = res.replace(sysin, sysout);

  // comments
  res = res.replace(/([^\\]|^)%.+/gm, ""); // Fixed for Firefox

  // emph and italics
  res = res.replace(/\{\\\w+/gm, "").replace(/\\\/\}/g, "");

  // textit, $, and ~
  res = res
    .replace(/\\\w+{/gm, "")
    .replace(/[\}\$]/g, "")
    .replace(/\~/g, " ");
  res = res.replace(/\\sim/g, "~");

  // double white spaces
  res = res.replace(/\n/g, " ");
  res = res.replace(/\s\s+/g, " ");
  res = res.replace(/([\.,])(\s)([\.,])/g, "$1$3");

  // \% percentage
  res = res.replace(/\\\%/g, "%");
  res = res.trim();

  return { wc: WordCount(res), res };
}

const content = fs.readFileSync("main.tex", { encoding: "utf8" });
const { wc, res } = Analyze(content);
console.log("Word count: %d", wc);
console.log(res);
