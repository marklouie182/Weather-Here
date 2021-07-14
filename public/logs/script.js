
//Marking the map and tiles
const myMap = L.map("mapISS").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tile_url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tile_url, { attribution });
tiles.addTo(myMap);

//Marking marking with Custom Icon
// const issIcon = L.icon({
//   iconUrl: "pin.png",
//   iconSize: [50, 32],
//   iconAnchor: [25, 16],
// });
// const marker = L.marker([100, 100], { icon: issIcon }).addTo(myMap);


getData();

async function getData() {
    const response = await fetch("/api");
    const data = await response.json();
    console.log(data);

     for (item of data) {

      const marker = L.marker([item.lat, item.lon]).addTo(myMap);
      let txt = `The weather here at ${item.weather.name} with coordinates of ${item.lat}&deg;, 
      ${item.lon}&deg; is ${item.weather.weather[0].description} with
      a temperature of ${(item.weather.main.temp - 273.15).toFixed(2)}&deg;C.`;

      if (item.air.value < 0)
      {
        txt += ' Sorry there is no air quality reading.'
      }else
      {
        txt += ` The concentration of particulate matter 
        (${item.air.parameter}) is ${item.air.value} ${item.air.unit} 
        last read on ${item.air.lastUpdated}`
      }

      marker.bindPopup(txt);


    //   const root = document.createElement("p");
    //   const geo = document.createElement("div");
    //   const date = document.createElement("div");
    //   const dateString = new Date(item.timestamp).toLocaleString();

    //   date.textContent = dateString;
    //   geo.textContent = `${item.lat}°, ${item.lon}°`;

    //   root.append(geo, date);
    //   document.body.append(root);
     }
}