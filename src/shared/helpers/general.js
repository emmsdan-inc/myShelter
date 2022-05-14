export const returnStyle = (conditions, data) => {
  const result = [];
  conditions.forEach((state, index) => {
    if (state) {
      result.push(data[index]);
    }
  });
  return result;
};

export const isExpired = dateString => {
  const now = new Date().getTime();
  const date = new Date(dateString).getTime();
  return now >= date;
};

export function _getHHMMSSFromMillis(milliseconds) {
  //Get Days from milliseconds

  const days = milliseconds / (1000 * 60 * 60 * 24);
  const absoluteDay = Math.floor(days || 0);
  let day =
    absoluteDay > 9 ? absoluteDay : absoluteDay <= 0 ? "" : "0" + absoluteDay;
  day = day ? day + ":" : "";

  //Get hours from milliseconds
  const hours = milliseconds / (1000 * 60 * 60);
  const absoluteHours = Math.floor(hours || 0);
  const h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

  //Get remainder from hours and convert to minutes
  const minutes = (hours - absoluteHours) * 60;
  const absoluteMinutes = Math.floor(minutes || 0);
  const m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  const seconds = (minutes - absoluteMinutes) * 60;
  const absoluteSeconds = Math.floor(seconds || 0);
  const s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

  return day + "" + h + ":" + m + ":" + s;
}

export function getSecondsFromMillis(seconds = 100000) {
  return Math.floor(seconds / 60);
}

export function getXFromPercentageOf(percent, number) {
  return (percent * number) / 100;
}

export function getPercentageOf(value, number) {
  return (value * 100) / number;
}
// function calculate_3() {
//   var from_1 = document.calculator_3.from_3.value;
//   to_1 = document.calculator_3.to_3.value;
//   result = ((to_1 - from_1) / from_1) * 100;
//   document.calculator_3.result_3.value = result;
// }
// function calculate_4() {
//   var from_1 = document.calculator_4.from_4.value;
//   to_1 = document.calculator_4.to_4.value;
//   result = (from_1 * 100) / to_1;
//   document.calculator_4.result_4.value = result;
// }

export const toTrackFormat = musics =>
  (Array.isArray(musics) ? musics : [musics]).map(music => ({
    ...music,
    id: music.id,
    url: music.url,
    title: music.title,
    artist: music.author,
    artwork: music.thumbnail_url,
  }));
