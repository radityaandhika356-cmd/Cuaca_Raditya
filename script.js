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
                const desc = data.weather[0].main.toLowerCase();
if (desc.includes('rain')) {
    document.body.style.background = 'linear-gradient(to bottom, #4facfe, #00f2fe)'; // Hujan
} else if (desc.includes('cloud')) {
    document.body.style.background = 'linear-gradient(to bottom, #bdc3c7, #2c3e50)'; // Mendung
} else {
    document.body.style.background = 'linear-gradient(to bottom, #fbc2eb, #a6c1ee)'; // Cerah
}
            } else {
                alert("Kota tidak ditemukan!");
            }
        })
        .catch(error => console.error('Error:', error));
});
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        btn.click(); // Menjalankan fungsi tombol Cari
    }
});
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    // Masukkan logika tampilan yang sama dengan tombol cari di sini
                    // Agar rapi, kamu bisa buat fungsi 'updateUI(data)'
                });
        });
    }
};