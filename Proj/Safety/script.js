// Mountain data with coordinates and activity information
const mountainData = {
    // Himalayan Region
    'nun-peak': {
        name: 'Nun Peak',
        coordinates: { lat: 33.9833, lon: 76.0167 },
        elevation: 7135,
        activities: {
            trekking: { difficulty: 'expert', season: ['summer'] },
            camping: { difficulty: 'expert', season: ['summer'] },
            sightseeing: { difficulty: 'intermediate', season: ['summer'] },
            photography: { difficulty: 'intermediate', season: ['summer'] }
        }
    },
    'kun-peak': {
        name: 'Kun Peak',
        coordinates: { lat: 33.8500, lon: 76.0167 },
        elevation: 7077,
        activities: {
            trekking: { difficulty: 'expert', season: ['summer'] },
            camping: { difficulty: 'expert', season: ['summer'] },
            sightseeing: { difficulty: 'intermediate', season: ['summer'] },
            photography: { difficulty: 'intermediate', season: ['summer'] }
        }
    },
    'nanda-devi': {
        name: 'Nanda Devi',
        coordinates: { lat: 30.3755, lon: 79.9711 },
        elevation: 7816,
        activities: {
            trekking: { difficulty: 'expert', season: ['summer', 'autumn'] },
            camping: { difficulty: 'intermediate', season: ['summer', 'autumn'] },
            sightseeing: { difficulty: 'novice', season: ['all'] },
            spiritual: { difficulty: 'novice', season: ['all'] },
            photography: { difficulty: 'novice', season: ['all'] }
        }
    },
    'kanchenjunga': {
        name: 'Kanchenjunga',
        coordinates: { lat: 27.7025, lon: 88.1475 },
        elevation: 8586,
        activities: {
            trekking: { difficulty: 'expert', season: ['spring', 'autumn'] },
            camping: { difficulty: 'intermediate', season: ['spring', 'autumn'] },
            sightseeing: { difficulty: 'novice', season: ['all'] },
            wildlife: { difficulty: 'novice', season: ['spring', 'autumn'] },
            photography: { difficulty: 'novice', season: ['all'] }
        }
    },
    // Western Ghats
    'guru-shikhar': {
        name: 'Guru Shikhar',
        coordinates: { lat: 24.6500, lon: 72.7833 },
        elevation: 1722,
        activities: {
            trekking: { difficulty: 'novice', season: ['all'] },
            sightseeing: { difficulty: 'novice', season: ['all'] },
            spiritual: { difficulty: 'novice', season: ['all'] },
            photography: { difficulty: 'novice', season: ['all'] },
            'nature-trails': { difficulty: 'novice', season: ['all'] }
        }
    },
    'kalsubai': {
        name: 'Kalsubai',
        coordinates: { lat: 19.6000, lon: 73.7000 },
        elevation: 1646,
        activities: {
            trekking: { difficulty: 'intermediate', season: ['all'] },
            camping: { difficulty: 'intermediate', season: ['all'] },
            sightseeing: { difficulty: 'novice', season: ['all'] },
            photography: { difficulty: 'novice', season: ['all'] },
            'nature-trails': { difficulty: 'novice', season: ['all'] }
        }
    },
    // Southern Region
    'anamudi': {
        name: 'Anamudi',
        coordinates: { lat: 10.1667, lon: 77.0667 },
        elevation: 2695,
        activities: {
            trekking: { difficulty: 'intermediate', season: ['all'] },
            camping: { difficulty: 'intermediate', season: ['all'] },
            sightseeing: { difficulty: 'novice', season: ['all'] },
            wildlife: { difficulty: 'novice', season: ['all'] },
            photography: { difficulty: 'novice', season: ['all'] },
            'nature-trails': { difficulty: 'novice', season: ['all'] }
        }
    },
    // North-East Region
    'shillong-peak': {
        name: 'Shillong Peak',
        coordinates: { lat: 25.5333, lon: 91.8667 },
        elevation: 1965,
        activities: {
            trekking: { difficulty: 'novice', season: ['all'] },
            sightseeing: { difficulty: 'novice', season: ['all'] },
            photography: { difficulty: 'novice', season: ['all'] },
            paragliding: { difficulty: 'intermediate', season: ['spring', 'autumn'] },
            'nature-trails': { difficulty: 'novice', season: ['all'] }
        }
    },
    'kudremukh': {
        name: 'Kudremukh',
        coordinates: { lat: 13.1357, lon: 75.2500 },
        elevation: 1894,
        activities: {
            trekking: { difficulty: 'novice', season: ['all'] },
            camping: { difficulty: 'intermediate', season: ['all'] },
            sightseeing: { difficulty: 'novice', season: ['all'] },
            wildlife: { difficulty: 'novice', season: ['all'] },
            photography: { difficulty: 'novice', season: ['all'] },
            'nature-trails': { difficulty: 'novice', season: ['all'] }
        }
    }
};

// OpenWeather API configuration
const OPENWEATHER_API_KEY = '100d697c66629d0d4b6850618bc96cb7';

// DOM Elements
const mountainSelect = document.getElementById('mountain');
const experienceSelect = document.getElementById('experience');
const getRecommendationsBtn = document.getElementById('getRecommendations');
const weatherInfo = document.getElementById('weather-info');
const recommendationsContainer = document.getElementById('recommendations');

// Event Listeners
getRecommendationsBtn.addEventListener('click', handleRecommendations);

// Functions
async function getWeatherData(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function updateWeatherDisplay(weatherData) {
    if (!weatherData || !weatherData.main || !weatherData.weather || !weatherData.wind) {
        weatherInfo.innerHTML = '<p>Weather data unavailable</p>';
        return;
    }

    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');
    const wind = document.getElementById('wind');
    const visibility = document.getElementById('visibility');
    const precipitation = document.getElementById('precipitation');
    const snow = document.getElementById('snow');

    temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    conditions.textContent = weatherData.weather[0].description;
    wind.textContent = `Wind: ${weatherData.wind.speed} km/h`;
    visibility.textContent = `Visibility: ${weatherData.visibility ? (weatherData.visibility / 1000) : '--'} km`;
    precipitation.textContent = `Precipitation: ${weatherData.rain ? weatherData.rain['1h'] : 0} mm`;
    snow.textContent = `Snow: ${weatherData.snow ? weatherData.snow['1h'] : 0} cm`;
}

function getSelectedInterests() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function generateRecommendations(mountain, experience, interests, weatherData) {
    const mountainInfo = mountainData[mountain];
    const recommendations = [];
    const safetyTips = [];

    // Check weather conditions
    const isGoodWeather = weatherData && 
        weatherData.weather[0].main !== 'Rain' && 
        weatherData.weather[0].main !== 'Snow' &&
        weatherData.visibility > 5000;

    // Get current season
    const currentMonth = new Date().getMonth();
    let currentSeason;
    if (currentMonth >= 2 && currentMonth <= 5) {
        currentSeason = 'spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
        currentSeason = 'summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
        currentSeason = 'autumn';
    } else {
        currentSeason = 'winter';
    }

    interests.forEach(interest => {
        const activity = mountainInfo.activities[interest];
        if (activity) {
            const isSuitable = activity.difficulty === experience || 
                             (activity.difficulty === 'novice' && experience === 'intermediate') ||
                             (activity.difficulty === 'intermediate' && experience === 'expert');

            const isSeasonSuitable = activity.season.includes('all') || 
                                   activity.season.includes(currentSeason);

            if (isSuitable && isSeasonSuitable) {
                if (isGoodWeather) {
                    recommendations.push({
                        activity: interest,
                        description: `Perfect for ${experience} level ${interest} at ${mountainInfo.name}. The current weather conditions are ideal for this activity.`
                    });
                } else {
                    recommendations.push({
                        activity: interest,
                        description: `While ${interest} is available at ${mountainInfo.name}, current weather conditions may not be ideal. Consider postponing or choosing an indoor alternative.`
                    });
                }
            }
        }
    });

    return { recommendations, safetyTips };
}

async function handleRecommendations() {
    const mountain = mountainSelect.value;
    const experience = experienceSelect.value;
    const interests = getSelectedInterests();

    if (!mountain || !experience || interests.length === 0) {
        alert('Please fill in all required fields and select at least one interest.');
        return;
    }

    const mountainInfo = mountainData[mountain];
    if (!mountainInfo) {
        recommendationsContainer.innerHTML = `<div class="recommendation-card"><h3>Mountain Data Not Found</h3><p>Sorry, we don't have activity data for this mountain yet. Please select another mountain.</p></div>`;
        return;
    }
    const weatherData = await getWeatherData(mountainInfo.coordinates.lat, mountainInfo.coordinates.lon);
    console.log(weatherData); // Debug log
    updateWeatherDisplay(weatherData);
    const { recommendations, safetyTips } = generateRecommendations(
        mountain,
        experience,
        interests,
        weatherData
    );
    // Display recommendations
    let recommendationsHTML = '<div class="recommendations-list">';
    if (recommendations.length === 0) {
        recommendationsHTML += `
            <div class="recommendation-card">
                <h3>No Suitable Activities</h3>
                <p>Based on your preferences and current conditions, we couldn't find any suitable activities at this time. Please try different preferences or check back later.</p>
            </div>
        `;
    } else {
        recommendations.forEach(rec => {
            recommendationsHTML += `
                <div class="recommendation-card">
                    <h3>${rec.activity.charAt(0).toUpperCase() + rec.activity.slice(1)}</h3>
                    <p>${rec.description}</p>
                </div>
            `;
        });
    }
    if (safetyTips.length > 0) {
        recommendationsHTML += '<div class="safety-tips">';
        recommendationsHTML += '<h3>Safety Tips</h3>';
        safetyTips.forEach(tip => {
            recommendationsHTML += `<p>⚠️ ${tip}</p>`;
        });
        recommendationsHTML += '</div>';
    }
    recommendationsHTML += `
        <div class="guide-inquiry">
            <p>Would you like nearby guides or rental services for these activities?</p>
            <button onclick="alert('Guide services feature coming soon!')">Find Guides</button>
        </div>
    `;
    recommendationsHTML += '</div>';
    recommendationsContainer.innerHTML = recommendationsHTML;
}