function getJSONs() {
  const context = require.context(".", true, /\.json$/);
  let tripJSONs = {};
  context.keys().forEach(function (key) {
    tripJSONs[key] = context(key);
  });
  return tripJSONs;
}

// function calculateColors(data, min, max) {
//   data.forEach(point => {
//     point.rgb = calculateColor(point.speed, min, max);
//   });
//   return data;
// }

function calculateColor(speed, min, max) {
  const fraction = (speed - min) / (max - min);

  const g = Math.floor(fraction * 255);
  const r = 255 - g;
  const b = 0;

  return [r, g, b];
}

// function getCoords(jsons) {
//   let speedData = [];
//   let maxSpeed = -Infinity;
//   let minSpeed = Infinity;
//
//   for (const trip in jsons) {
//     jsons[trip].coords.forEach(coord => {
//
//       maxSpeed = coord.speed > maxSpeed ? coord.speed : maxSpeed;
//       minSpeed = coord.speed < minSpeed ? coord.speed : minSpeed;
//
//       speedData.push({
//         lat: coord.lat,
//         lng: coord.lng,
//         speed: coord.speed
//       });
//     });
//   }
//
//   return calculateColors(speedData, minSpeed, maxSpeed);
// }

function getAveragedCoords(jsons) {
  let speedData = {};
  let maxSpeed = -Infinity;
  let minSpeed = Infinity;

  for (const trip in jsons) {
    jsons[trip].coords.forEach(coord => {
      let key = [Number(coord.lat).toFixed(3), Number(coord.lng).toFixed(3)].join(", ");

      maxSpeed = coord.speed > maxSpeed ? coord.speed : maxSpeed;
      minSpeed = coord.speed < minSpeed ? coord.speed : minSpeed;

      if (speedData[key] === undefined) {
        speedData[key] = {
          speed: coord.speed,
          howMany: 1
        };
      } else {
        speedData[key] = {
          speed: coord.speed + speedData[key].speed,
          howMany: speedData[key].howMany + 1
        }
      }
    });
  }

  return averageThem(speedData, minSpeed, maxSpeed);
}

function averageThem(data, min, max) {
  let averaged = [];

  Object.keys(data).forEach(point => {
    const lat = point.split(", ")[0];
    const lng = point.split(", ")[1];
    const averageSpeed = data[point].speed / data[point].howMany;
    averaged.push({
      lat: lat,
      lng: lng,
      rgb: calculateColor(averageSpeed, min, max),
      speed: averageSpeed
    });
  });
  return averaged;
}

const tripJSONs = getJSONs();
export const speedData = getAveragedCoords(tripJSONs);
