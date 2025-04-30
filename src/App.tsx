/* eslint-disable @typescript-eslint/no-explicit-any */
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import styled, { createGlobalStyle } from "styled-components";
import AuthProvider from "./components/authProvider";

// Global stil tanımlamaları - tüm uygulama için temel CSS ayarları
const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  
  #root {
    height: 100%;
  }
`;
// Test 1
// Test2
// Ana sayfa düzeni için styled component tanımlamaları
const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const PageWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const AppContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 30px;
    box-sizing: border-box;
`;

const MapWrapper = styled.div`
    height: 500px;
    width: 90%;
    max-width: 900px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border: 3px solid #fff;
`;

const WeatherInfo = styled.div`
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 15px;
    margin: 0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 600px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);

    h2 {
        color: #2c3e50;
        margin-bottom: 20px;
        font-size: 2rem;
        text-align: center;
    }

    p {
        color: #34495e;
        margin: 12px 0;
        font-size: 1.2rem;
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        &:last-child {
            border-bottom: none;
        }
    }
`;

const Title = styled.h1`
    color: #2c3e50;
    margin: 0;
    font-size: 2.5rem;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
    color: #e74c3c;
    background: rgba(231, 76, 60, 0.1);
    padding: 20px;
    border-radius: 10px;
    margin: 0;
    width: 90%;
    max-width: 600px;
    text-align: center;
    font-size: 1.1rem;
    border: 1px solid rgba(231, 76, 60, 0.3);
`;

const WeatherIcon = styled.img`
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: block;
`;

const LoadingMessage = styled.div`
    color: #2c3e50;
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    margin: 0;
    width: 90%;
    max-width: 600px;
    text-align: center;
    font-size: 1.1rem;
    border: 1px solid rgba(255, 255, 255, 0.5);
`;

const SearchHistory = styled.div`
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    width: 300px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    overflow-y: auto;
    margin-left: 20px;

    h3 {
        color: #2c3e50;
        margin-bottom: 15px;
        text-align: center;
    }
`;

const SearchItem = styled.div`
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &:last-child {
        border-bottom: none;
    }

    .location {
        font-weight: bold;
        color: #2c3e50;
    }

    .temp {
        color: #e74c3c;
    }

    .date {
        font-size: 0.8rem;
        color: #7f8c8d;
    }
`;

interface saveToHistoryParams {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    coord: {
        lat: number;
        lon: number;
    };
}

//update

function App() {
    const API_KEY = "79d4dbc1640d90cdf4e12bbb8774b63f"; // OpenWeather API anahtarı
    const [position, setPosition] = useState([41.0082, 28.9784]);
    const [weather, setWeather] = useState<
        | {
              weather: { icon: string; description: string }[];
              name: string;
          }
        | {
              weather: { main: { temp: string } };
              name: string;
          }
        | null
    >(null);

    const [searchHistory, setSearchHistory] = useState([]);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function MapEvents({ onMapClick }: { onMapClick: (par: any) => void }) {
        useMapEvents({
            click: (e) => {
                onMapClick(e);
            },
        });

        return null;
    }

    const handleMapClick = (par: {
        latlng: {
            lat: number;
            lng: number;
        };
    }) => {
        const newPosition = [par.latlng.lat, par.latlng.lng];

        // TODO: cache yapısı olacak aynı enleme tekrar tıklanıdıysa apiden veri çekmeyecek mevcut veriyi kullanacak

        setPosition(newPosition);

        fetchWeather(par.latlng.lat, par.latlng.lng);
    };

    function delay(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const fetchWeather = async (lat: number, lon: number) => {
        setLoading(true);
        // Cache yapısı burada da olacaktır

        await delay(1000);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=tr`
            );

            if (!response.ok) {
                throw new Error("Hava durumu bilgisi alınamadı");
            }

            const data = await response.json();

            // History
            saveToHistory(data);

            setWeather(data);
        } catch (error: any) {
            setError(error.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const saveToHistory = (weatherData: saveToHistoryParams) => {
        const newData = {
            location: weatherData.name,
            temp: weatherData.main,
            date: new Date().toLocaleString("tr-TR"),
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
        };

        const updateHistory = [newData, ...searchHistory];

        setSearchHistory(updateHistory);
    };

    return (
        <>
            <AuthProvider isLogin={true}>
                <GlobalStyle />
                <MainWrapper>
                    <PageWrapper>
                        <AppContainer>
                            <Title>Hava Durumu Uygulaması:</Title>
                            <MapWrapper>
                                <MapContainer
                                    center={position as LatLngExpression}
                                    zoom={8}
                                    style={{ height: "100%", width: "100%" }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <Marker
                                        position={position as LatLngExpression}
                                    >
                                        <Popup>İstanbul</Popup>
                                        <MapEvents
                                            onMapClick={handleMapClick}
                                        />
                                    </Marker>
                                </MapContainer>
                            </MapWrapper>

                            {loading && (
                                <LoadingMessage>
                                    Hava durumu bilgisi yükleniyor...
                                </LoadingMessage>
                            )}
                            {error && <ErrorMessage>{error}</ErrorMessage>}

                            {weather && !loading && (
                                <WeatherInfo>
                                    <h2>{weather?.name}</h2>

                                    <WeatherIcon
                                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={
                                            Array.isArray(weather.weather)
                                                ? weather.weather[0].description
                                                : ""
                                        }
                                    />

                                    <p>
                                        <span>Sıcaklık:</span>
                                        <span>
                                            {!Array.isArray(weather.weather) &&
                                                weather.weather.main.temp}
                                            °C
                                        </span>
                                    </p>

                                    <p>
                                        <span>Hissedilen:</span>
                                        <span>{weather.main.feels_like}°C</span>
                                    </p>

                                    <p>
                                        <span>Hava Durumu:</span>
                                        <span>
                                            {weather.weather[0].description}°C
                                        </span>
                                    </p>

                                    <p>
                                        <span>Nem:</span>
                                        <span>{weather.main.humidity}°C</span>
                                    </p>

                                    <p>
                                        <span>Rüzgar Hızı:</span>
                                        <span>{weather.wind.speed}°C</span>
                                    </p>
                                </WeatherInfo>
                            )}
                        </AppContainer>
                    </PageWrapper>
                </MainWrapper>
            </AuthProvider>
        </>
    );
}

export default App;

// const person = [];
// person[0] = 'Mert'
// person[1] = () => {
//   alert('Hello world')
// }
// person[2] = 'adres';

// const [name,  nameFunction, adress ] = person;

// const kisiNitelikleri = {
//   gozRengi: 'Siyah',
//   yas: 29,
//   boy: 180,
//   data: []
// }

// const kisiNitelikleri2 = {
//   gozRengi: 'Siyah',
//   yas: 29,
//   boy: 180,
//   data: []
// }

// const {
//   yas: yas2,
//   boy: boy2,
//   gozRengi: gozRengi2,
//   data: data2
// } = kisiNitelikleri2;

// console.log(yas2,boy2,gozRengi2, data2)

// const {
//   yas,
//   boy,
//   gozRengi,
//   data
// } = kisiNitelikleri;

/**
 *  
 * 
 *  const x =  {
    nitelikler : {
        name: 'xxx',
        lastname: 'xxx',
        age: 'xxx'
    }
  }

  console.log(
    {...x.nitelikler}, 'xxxx'
  )

 */
