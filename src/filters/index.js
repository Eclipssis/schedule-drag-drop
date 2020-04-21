import Vue from "vue";

Vue.filter("durationToString", function(duration) {
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;
  const stringMinutes = minutes === 0 ? "0" : minutes;
  hours = hours > 0 ? `${hours}hr ` : "";
  return `${hours}${stringMinutes}min`;
});
