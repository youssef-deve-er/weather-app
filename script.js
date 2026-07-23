const API_KEY = '1b70b55f783b0ec9ae69bbf8f10b8b23';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// لقد جعلت الدوحة هي المدينة الافتراضية عند فتح التطبيق لتعمل معك مباشرة
let defaultCity = 'Doha';

async function checkWeather(city) {
    try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (response.status === 404) {
            alert("City not found! Please try again.");
            return;
        }

        // تحديث الواجهة بالبيانات الحقيقية
        document.getElementById('temp').textContent = Math.round(data.main.temp) + '°C';
        document.getElementById('condition').textContent = data.weather[0].main;
        document.getElementById('location').textContent = data.name + ', ' + data.sys.country;
        document.getElementById('humidity').textContent = data.main.humidity + '%';
        document.getElementById('wind').textContent = data.wind.speed + ' km/h';

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// تشغيل البحث عند الضغط على الزر
document.getElementById('search-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value;
    if(cityInput !== "") {
        checkWeather(cityInput);
    }
});

// تشغيل حالة الطقس للمدينة الافتراضية عند فتح الموقع
checkWeather(defaultCity);