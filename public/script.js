
let jsonImp;

if ("geolocation" in navigator)
{
    navigator.geolocation.getCurrentPosition(async position => {
        let lat, lon, weather, air;
        try 
        {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            document.querySelector("#lat").textContent = lat.toFixed(2);
            document.querySelector("#lon").textContent = lon.toFixed(2);
    
            const response = await fetch(`/weather/${lat},${lon}`);
            jsonImp = await response.json();
            console.log(jsonImp);
    
            weather = jsonImp.weather;
            document.querySelector("#stat").textContent = weather.weather[0].description;
            document.querySelector("#temp").textContent = (weather.main.temp - 273.15).toFixed(2);
            
            air = jsonImp.air_quality.results[0].measurements[0];
            document.querySelector("#aq_param").textContent = air.parameter;
            document.querySelector("#aq_value").textContent = air.value;
            document.querySelector("#aq_units").textContent = air.unit;
            document.querySelector("#aq_date").textContent = air.lastUpdated;
    
        }
        catch (err)
        {
            console.error(err);
            air = {value: -1};
            //document.querySelector("#stat").textContent = 'NO DATA';
            //document.querySelector("#temp").textContent = 'NONE';
    
            document.querySelector("#aq_param").textContent = 'NONE';
            document.querySelector("#aq_value").textContent = 'NONE';
            document.querySelector("#aq_units").textContent = 'NO DATA';
            document.querySelector("#aq_date").textContent = 'NO AVAILABLE DATE';

        }

        const data = {lon, lat, weather, air};
            const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            };
            const db_response = await fetch('/api', option);
            const db_jsonData = await db_response.json();
            console.log(db_jsonData);
        
    });
        
} else
{
    console.log("Geolocation not Available!");
}