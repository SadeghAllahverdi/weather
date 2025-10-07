import { useEffect } from "react";

type FetchDataProps = {
    cityName: string;
    setWeatherData: (data: any) => void;
}
export default function FetchData({ cityName, setWeatherData }: Readonly<FetchDataProps>) {
    
    async function fetchCityLocation() {
        try {
            const url ="https://geocoding-api.open-meteo.com/v1/search?name=" +
                        cityName +
                        "&count=1&language=en&format=json";
            const response = await fetch(url);
            const locationData = await response.json();
            console.table(locationData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };


    async function fetchData() {
        try {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code&hourly=temperature_2m,weather_code&current=temperature_2m");
            const data = await response.json();
            setWeatherData(data);
            console.table(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])
    function getData() {
        fetchData();
    }
    return (
        <div className="absolute top-4 left-4 z-50">
            <button onClick={() => fetchCityLocation()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                location data
            </button>
            <button onClick={() => getData()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Fetch Weather Data
            </button>
        </div>
  )
}