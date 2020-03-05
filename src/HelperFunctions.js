import Parse from 'parse';

//Returns current date in DD.M.YYYY format
export function getTodaysDate() {
  const date = new Date();
  const today = date.getDate() + "." + ((date.getMonth())+1) + "." + date.getFullYear();
  return today;
}

export function toTitleCase(str) {
  if (str === null) {
    return null;
  } else {
      return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
  }
}

//Returns object that can be used to update or retrieve info from DB
export function getParseObject() {
  const Unis = Parse.Object.extend("unis");
  const unis = new Parse.Query(Unis);
  return unis;
}
