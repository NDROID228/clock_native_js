function getDate() {
  const time = new Date();
  return time.toLocaleTimeString();
}

function updateClockDOM(numbersDOMList, numbersList) {
  for (let i = 0; i < numbersDOMList.length; i++) {
    const numberTileDOM = numbersDOMList[i].children[0];
    numberTileDOM.setAttribute("src", `./img/digital/${numbersList[i]}.png`);
  }
  return numbersList;
}

function timeToList(timeString) {
  const timeList = timeString.split("").filter((element) => {
    if (element == ":") {
      return false;
    } else {
      return true;
    }
  });
  return timeList;
}

function clockLogic(timeList) {
  const newTimeList = [];
  let hours = Number(String(timeList[0]) + String(timeList[1]));
  let minutes = Number(String(timeList[2]) + String(timeList[3]));
  let seconds = Number(String(timeList[4]) + String(timeList[5]));

  seconds++;
  if (seconds > 59) {
    minutes++;
    seconds = 0;
  }
  if (minutes > 59) {
    hours++;
    minutes = 0;
  }
  if (hours > 23) {
    hours = 0;
  }

  toTimeListFormat(hours).forEach((element) => {
    newTimeList.push(element);
  });
  toTimeListFormat(minutes).forEach((element) => {
    newTimeList.push(element);
  });
  toTimeListFormat(seconds).forEach((element) => {
    newTimeList.push(element);
  });

  return newTimeList;
}

function toTimeListFormat(item) {
  if (item < 10) {
    return ["0", String(item)];
  } else {
    return [String(Math.floor(item / 10)), String(item % 10)];
  }
}

(function () {
  const $clock = document.querySelector("#clock");

  const numberTilesDOM = [];
  const allTilesDOM = $clock.children;
  for (let i = 0; i < allTilesDOM.length; i++) {
    const element = allTilesDOM[i];
    if (element.id !== "") {
      numberTilesDOM.push(element);
    }
  }

  let currentTime = updateClockDOM(numberTilesDOM, timeToList(getDate()));
  
  setInterval(function () {
    currentTime = clockLogic(currentTime);
    updateClockDOM(numberTilesDOM, currentTime);
  }, 1000);
  
})();