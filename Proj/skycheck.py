import requests
import json
from datetime import datetime, timedelta

# WeatherAPI configuration
WEATHER_API_KEY = "574f368449cc40ceafd155756250905"
WEATHER_API_URL = "http://api.weatherapi.com/v1/forecast.json"

# Restricted locations dictionary
RESTRICTED_LOCATIONS = {
    "arunachal pradesh": "PAP required due to border with China",
    "nagaland": "PAP required for tribal sensitivity and border control",
    "mizoram": "PAP required for border and tribal reasons",
    "manipur": "PAP/RAP needed due to insurgency concerns",
    "north sikkim": "RAP required, near China border",
    "nathula": "RAP required, near China border",
    "tsomgo": "RAP required, near China border",
    "nicobar": "Tribal protection and isolation",
    "lakshadweep": "Ecological and strategic restrictions",
    "ladakh": "Proximity to LAC with China",
    "tawang": "Strategic location near China border",
    "ziro": "Tribal region; requires permits",
    "uri": "Military zone near LoC",
    "kargil": "Near LoC; military control",
    "kupwara": "Close to LoC; restricted",
    "gurez valley": "LoC proximity; permit required",
    "poonch": "Border area; security restrictions",
    "nubra valley": "Military zone near Siachen",
    "siachen": "Complete military restriction",
    "barren island": "Active volcano; restricted",
    "silent valley": "Protected biodiversity zone",
    "great nicobar": "Ecological sensitivity",
    "changthang": "Permit needed for ecological protection",
    "kailash mansarovar": "Controlled annual permits",
    "nanda devi": "Closed to protect ecosystem",
    "bastar": "Naxalite region and tribal protection",
    "bhutan border": "Border restrictions",
    "desert national park": "Ecological fragility",
    "valley of flowers": "Seasonal closure",
    "north sentinel": "Complete prohibition to protect tribe",
    "jarawa reserve": "Tribal protection, road access limited",
    "nicobar islands": "Shompen tribe protection",
    "abujhmarh": "Tribal area and insurgency risk",
    "khonsa": "Tribal and strategic area",
    "dantewada": "Maoist-affected",
    "kanker": "Insurgency zone",
    "gadchiroli": "Naxalite region",
    "koraput": "Maoist presence",
    "malkangiri": "Security-sensitive tribal region",
    "mizoram border": "Border restrictions",
    "dima hasao": "Ethnic tensions",
    "tripura border": "Fenced Indo-Bangladesh border",
    "minicoy": "Permit required; strategic",
    "kalapani": "Disputed with Nepal",
    "tirap": "Tribal region near border",
    "sundarbans": "Tiger reserve protection",
    "mullaperiyar": "Interstate conflict zone",
    "dibang valley": "Permit required due to border",
    "bomdila": "Near China border; permit required",
    "longding": "Tribal and insurgent activity",
    "walong": "Permit needed; near border",
    "mechuka": "Strategic valley near China",
    "lunglei": "Myanmar border proximity",
    "moreh": "Border trade town; restricted access nearby",
    "daporijo": "Tribal protection and proximity to border",
    "leh": "Restricted beyond civilian zones",
    "hanle": "Permit needed; near LAC",
    "chushul": "Strategic village near LAC",
    "lohit valley": "Permit required; tribal area",
    "changlang": "Sensitive tribal district",
    "roing": "Restricted tribal district",
    "mayurbhanj": "Tribal zone and wildlife protection",
    "karbi anglong": "Tribal and ethnic unrest",
    "pakke-kessang": "Tribal region",
    "longleng": "Nagaland tribal area",
    "saddle peak": "Permits required for trekking",
    "ghnp": "Ecological protection",
    "phawngpui": "Controlled seasonal access",
    "keibul lamjao": "Protection of endangered species",
    "khangchendzonga": "Restricted national park",
    "chapar chiri": "Near Indo-Pak border",
    "betul": "Tribal zone and tiger reserve",
    "tuting": "Permit required; near China border",
    "zemithang": "Remote village near McMahon Line",
    "mana pass": "Military-controlled high-altitude pass",
    "shipki la": "Indo-China trade route; closed",
    "jadhang": "Permit-only zone",
    "dumchele": "China-controlled area",
    "sumdo": "Military clearance zone",
    "kibithu": "Easternmost village; permit required",
    "chumar": "Disputed with China",
    "shiroi hills": "Ecologically sensitive",
    "kalesar": "Restricted access",
    "chilika lake": "Sanctuary protection zones",
    "kolleru lake": "Wetland protected area",
    "narcondam": "Volcanic, wildlife protection",
    "kuno": "Cheetah habitat, restricted core",
    "kumarakom": "Conservation-related access limits",
    "sharavathi": "Ecological fragility",
    "bhitarkanika": "Wildlife sanctuary restrictions",
    "sittilingi": "Cultural tribal preservation",
    "kotia": "Disputed tribal region",
    "dandakaranya": "Maoist zone",
    "narayanpur": "Tribal and insurgency conflict",
    "aheri": "Maoist region",
    "lalgarh": "Former Maoist zone; tribal area"
}

def check_restricted_location(location):
    """Check if the location is in the restricted list"""
    location_lower = location.lower()
    for restricted_loc, reason in RESTRICTED_LOCATIONS.items():
        if restricted_loc in location_lower:
            return True, reason
    return False, None

def get_trekking_route():
    """Get source and destination from user"""
    print("Welcome to Trekking Planner!")
    print("Please enter your trekking details:")
    
    source = input("Source location: ").strip()
    destination = input("Destination location: ").strip()
    trek_date = input("Planned trek date (YYYY-MM-DD, leave blank for tomorrow): ").strip()
    
    if not trek_date:
        trek_date = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
    
    return source, destination, trek_date

def get_weather_forecast(location, date):
    """Get weather forecast for a specific location and date"""
    try:
        params = {
            'key': WEATHER_API_KEY,
            'q': location,
            'dt': date,
            'days': 3  # Get forecast for 3 days including the selected date
        }
        
        response = requests.get(WEATHER_API_URL, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        # Extract relevant weather information
        forecast_days = data.get('forecast', {}).get('forecastday', [])
        if not forecast_days:
            return None
            
        weather_data = []
        for day in forecast_days:
            day_data = {
                'date': day['date'],
                'max_temp': day['day']['maxtemp_c'],
                'min_temp': day['day']['mintemp_c'],
                'avg_temp': day['day']['avgtemp_c'],
                'condition': day['day']['condition']['text'],
                'rain_chance': day['day']['daily_chance_of_rain'],
                'snow_chance': day['day']['daily_chance_of_snow'],
                'uv_index': day['day']['uv'],
                'sunrise': day['astro']['sunrise'],
                'sunset': day['astro']['sunset'],
                'hourly': []
            }
            
            for hour in day['hour']:
                hour_data = {
                    'time': hour['time'].split()[1],
                    'temp': hour['temp_c'],
                    'condition': hour['condition']['text'],
                    'rain_chance': hour['chance_of_rain'],
                    'snow_chance': hour['chance_of_snow'],
                    'humidity': hour['humidity'],
                    'wind_kph': hour['wind_kph'],
                    'feelslike': hour['feelslike_c']
                }
                day_data['hourly'].append(hour_data)
            
            weather_data.append(day_data)
        
        return weather_data
    
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None

def analyze_weather_for_trekking(weather_data):
    """Analyze weather data for trekking suitability"""
    if not weather_data:
        return "No weather data available for analysis."
    
    # Get the first day (main trek day)
    day = weather_data[0]
    
    # Basic analysis
    analysis = []
    
    # Temperature analysis
    avg_temp = day['avg_temp']
    if avg_temp < 0:
        analysis.append("❄ Extremely cold conditions - risk of hypothermia. Pack heavy winter gear.")
    elif 0 <= avg_temp < 10:
        analysis.append("🥶 Cold conditions - wear layers and proper insulation.")
    elif 10 <= avg_temp < 20:
        analysis.append("😊 Pleasant trekking temperatures - ideal conditions.")
    elif 20 <= avg_temp < 30:
        analysis.append("☀ Warm conditions - stay hydrated and wear sun protection.")
    else:
        analysis.append("🔥 Very hot conditions - consider early morning or late afternoon trekking.")
    
    # Rain/snow analysis
    if day['rain_chance'] > 70:
        analysis.append("🌧 High chance of rain - bring waterproof gear and be prepared for slippery trails.")
    elif day['rain_chance'] > 40:
        analysis.append("🌦 Moderate chance of rain - pack a rain jacket just in case.")
    
    if day['snow_chance'] > 50:
        analysis.append("❄ Significant chance of snow - ensure you have proper equipment for snowy conditions.")
    
    # UV index analysis
    if day['uv_index'] > 8:
        analysis.append("☀ Very high UV index - wear sunscreen, hat, and sunglasses.")
    elif day['uv_index'] > 5:
        analysis.append("🌤 High UV index - sunscreen recommended.")
    
    # Wind analysis (from hourly data)
    max_wind = max([hour['wind_kph'] for hour in day['hourly']])
    if max_wind > 30:
        analysis.append("💨 Strong winds expected - be cautious on exposed ridges.")
    
    return analysis

def display_weather_report(location, weather_data, analysis):
    """Display the weather report in a user-friendly format"""
    print(f"\n🌄 Weather Forecast for {location}")
    print("=" * 40)
    
    if not weather_data:
        print("No weather data available.")
        return
    
    for day in weather_data:
        print(f"\n📅 Date: {day['date']}")
        print(f"🌡 Temperature: {day['min_temp']}°C to {day['max_temp']}°C (Avg: {day['avg_temp']}°C)")
        print(f"🌈 Conditions: {day['condition']}")
        print(f"🌧 Chance of Rain: {day['rain_chance']}%")
        print(f"❄ Chance of Snow: {day['snow_chance']}%")
        print(f"☀ UV Index: {day['uv_index']} ({'Extreme' if day['uv_index'] > 8 else 'High' if day['uv_index'] > 5 else 'Moderate'})")
        print(f"🌅 Sunrise: {day['sunrise']} | 🌇 Sunset: {day['sunset']}")
        
        # Print hourly forecast for the main trek day (first day)
        if day == weather_data[0]:
            print("\n⏳ Hourly Forecast:")
            for hour in day['hourly'][::3]:  # Show every 3 hours to reduce clutter
                print(f"  {hour['time']}: {hour['temp']}°C, {hour['condition']}, Rain: {hour['rain_chance']}%, Wind: {hour['wind_kph']}kph")
    
    print("\n🔍 Trekking Analysis:")
    for item in analysis:
        print(f"- {item}")

def main():
    # Get user input
    source, destination, trek_date = get_trekking_route()
    
    print(f"\nPlanning your trek from {source} to {destination} on {trek_date}...")
    
    # Check for restricted locations
    is_restricted, reason = check_restricted_location(destination)
    if is_restricted:
        print("\n⚠️ ALERT: RESTRICTED LOCATION DETECTED ⚠️")
        print(f"Your destination '{destination}' is in a restricted area.")
        print(f"Reason: {reason}")
        print("\nPlease ensure you have all necessary permits and permissions before proceeding.")
        print("Contact local authorities for more information about required documentation.")
        print("\nWould you like to continue with the weather check? (y/n)")
        if input().lower() != 'y':
            print("Trek planning cancelled. Please choose a different destination.")
            return
    
    # Get weather for source and destination
    source_weather = get_weather_forecast(source, trek_date)
    dest_weather = get_weather_forecast(destination, trek_date)
    
    # Analyze weather
    source_analysis = analyze_weather_for_trekking(source_weather) if source_weather else []
    dest_analysis = analyze_weather_for_trekking(dest_weather) if dest_weather else []
    
    # Display reports
    if source_weather:
        display_weather_report(source, source_weather, source_analysis)
    else:
        print(f"\nCould not fetch weather data for {source}.")
    
    if dest_weather:
        display_weather_report(destination, dest_weather, dest_analysis)
    else:
        print(f"\nCould not fetch weather data for {destination}.")
    
    print("\nHappy Trekking! 🏔")

if __name__ == "__main__":
    main()