const path = require('path');
const fs = require('fs');

const MIMETYPES = {
  mp4: 'video/mp4',
};

/**
 * (private) Used by helpers to insert a leading zero
 * in front of months, days, hours, minutes and seconds
 * to produce a two digit string ("09:41:07" instead of "9:41:7")
 *
 * @param inputNumber Number One-digit or two-digit number
 * @return String The same number with added leading zero if required
 */
function leadZero(inputNumber) {
  const num = inputNumber.toString();
  return num.length < 2 ? `0${num}` : num;
}

/**
 * Formats the date-time string consistently
 * (registered as a handlebars helper)
 *
 * @param inputDate Date
 * @return String yyyy-mm-dd hh:mm:ss
 */
function formatDateTimeString(inputDate) {
  inputDate = inputDate || Date.now();
  const d = new Date(inputDate);
  const dateString = `${d.getFullYear()}-${leadZero(d.getMonth() + 1)}-${leadZero(d.getDate())}`;
  const timeString = `${leadZero(d.getHours())}:${leadZero(d.getMinutes())}:${leadZero(d.getSeconds())}`;
  return `${dateString} ${timeString}`;
}

/**
 * Stringifies JSON data
 * (registered as a handlebars helper)
 *
 * @param inputJson JSON data object
 * @return String
 */
function stringifyJson(inputJson) {
  return JSON.stringify(inputJson, null, 2);
}

function extractExtension(filename) {
  // contains dot
  return path.extname(filename);
}

function getFileBasename(filename) {
  const ext = extractExtension(filename);
  return path.basename(filename, ext);
}

function extractMimetype(filename) {
  const ext = extractExtension(filename);
  return MIMETYPES[ext] || null;
}

function ensureDirSync(dir) {
  fs.access(dir, fs.constants.F_OK, (err) => {
    console.log(`${dir} ${err ? 'does not exist' : 'exists'}`);
  });
}

module.exports = {
  formatDateTimeString,
  stringifyJson,
  getFileBasename,
  extractExtension,
  extractMimetype,
  ensureDirSync,
};