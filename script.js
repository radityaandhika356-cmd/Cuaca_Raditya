const apiKey = '17a8e88738815e7b414d812af348a7f1'; 
const btn = document.getElementById('get-weather-btn');
const input = document.getElementById('city-input');

btn.addEventListener('click', () => {
    const city = input.value;
    if (city === "") return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('city-name').innerText = data.name;
                document.getElementById('temp').innerText = `${Math.round(data.main.temp)} °C`;
                document.getElementById('description').innerText = data.weather[0].description;
                
                const iconCode = data.weather[0].icon;
                const iconElement = document.getElementById('weather-icon');
                iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                iconElement.style.display = 'block';
            } else {
                alert("Kota tidak ditemukan!");
            }
        })
        .catch(error => console.error('Error:', error));
});