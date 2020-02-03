const urlRegex = new RegExp(
  '(http(s?):|ftp:)'
+ '([/|.|\\w|\\s|-])*'
+ '(\\.)'
+ '(?:jpg|gif|png)',
);

module.exports = urlRegex;
