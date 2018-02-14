import { averageThem, getJSONs} from './SpeedDataProcessing';

function makeHashSet(coords) {
  let hash = {};
  coords.forEach(coord => {
    let key = [coord.lat().toFixed(3), coord.lng().toFixed(3)].join(", ");
    hash[key] = true;
  });
  return hash;
}

export function searchForPoints(response) {
  const jsons = getJSONs();
  const points = response.routes[0].overview_path;

  let speedData = {};
  let minSpeed = Infinity;
  let maxSpeed = -Infinity;

  const routeHash = makeHashSet(points);
    for (let trip in jsons) {
      let coords = jsons[trip].coords;
      for (let j = 0; j < coords.length; j++) {
        let key = [coords[j].lat.toFixed(3), coords[j].lng.toFixed(3)].join(", ");
        if (routeHash[key]) {
          speedData = addToSpeedData(speedData, coords[j]);
          maxSpeed = coords[j].speed > maxSpeed ? coords[j].speed : maxSpeed;
          minSpeed = coords[j].speed < minSpeed ? coords[j].speed : minSpeed;
        }
      }
    }
  return averageThem(speedData, minSpeed, maxSpeed);
}

function addToSpeedData(speedData, coord) {
  let key = [coord.lat.toFixed(3), coord.lng.toFixed(3)].join(", ");

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
  return speedData;
}
