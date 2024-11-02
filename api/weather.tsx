export async function fetchWeather(lat: number, lon: number) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=17.1337&lon=77.5104&appid=5fca152209a58dbac09f2384b466349e`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchWeather:", error);
    throw error;
  }
}

export async function fetchAirQuality(lat: number, lon: number) {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=17.1337&lon=77.5104&appid=5fca152209a58dbac09f2384b466349e`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch air quality data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchAirQuality:", error);
    throw error;
  }
}

// Combined function to fetch both weather and air quality data
export async function fetchWeatherAndAirQuality(lat: number, lon: number) {
  try {
    const [weatherData, airQualityData] = await Promise.all([
      fetchWeather(lat, lon),
      fetchAirQuality(lat, lon),
    ]);

    // Check if air quality data exists
    const airQuality = airQualityData?.list?.[0]?.main?.aqi ?? null;
    const temperature = weatherData?.main?.temp ?? null;
    const windSpeed = weatherData?.wind?.speed ?? null;
    const humidity = weatherData?.main?.humidity?? null;
    console.log('Rohith ', weatherData);
    // Construct and return the combined data object
    return {
      temperature,
      airQuality: airQuality,
      windSpeed,
      humidity
    };
  } catch (error) {
    console.error("Error in fetchWeatherAndAirQuality:", error);
    throw error;
  }
}
