interface ICoord {
    lon: string;
    lat: string;
}

interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface IMainWeather {
    temp: string;
    feels_like: string;
    temp_min: string;
    temp_max: string;
    pressure: string;
    humidity: string;
}

interface IWind {
    speed: string;
    deg: string;
}

interface ISysInfo {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

interface IWeatherData {
    coord: ICoord;
    weather: IWeather[];
    base: string;
    main: IMainWeather;
    visibility: string;
    wind: IWind;
    rain: string;
    clouds: string;
    dt: number;
    sys: ISysInfo;
    timezone: string;
    id: number;
    name: string;
    cod: number;
    iconUrl?: string;
    condition?: string;
    description?: string;
}

export {
    IWeather,
    ICoord,
    IMainWeather,
    IWind,
    ISysInfo,
    IWeatherData,
}
