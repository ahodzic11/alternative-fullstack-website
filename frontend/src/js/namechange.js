export function formatPath(str) {
  var newString = str.toLowerCase();
  newString = newString.replace(/"/g, "").replace(/ć|č/g, "c").replace(/š/g, "s").replace(/đ/g, "d").replace(/ž/g, "z").replace(/:|-|,/g, "").replace(/ /g, "-").replace(".", "").replace("„", "").replace("“", "").replace(/„/g, "").replace(/“/g, "");
  return newString;
}

export function formatDate(inputDate) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${date}.${month}.${year}.`;
}

export function englishFormatDate(inputDate) {
  let date, month, year;
  var firstDate = inputDate.split(".");
  var firstCorrectDate = new Date(firstDate[2], firstDate[1] - 1, firstDate[0]);
  date = firstCorrectDate.getDate();
  month = firstCorrectDate.getMonth() + 1;
  year = firstCorrectDate.getFullYear();
  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");
  return `${year}-${month}-${date}`;
}
