import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchWeather } from '../store/weatherSlice';
import { Cloud, Loader } from 'lucide-react';

export const Weather: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather('London') as any);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader className="w-6 h-6 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Failed to load weather data
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm mb-8">
      <Cloud className="w-8 h-8 text-purple-600" />
      <div>
        <div className="text-lg font-semibold text-gray-800">
          {Math.round(data.temp)}°C
        </div>
        <div className="text-sm text-gray-500 capitalize">
          {data.description}
        </div>
      </div>
      {data.icon && (
        <img
          src={`http://openweathermap.org/img/w/${data.icon}.png`}
          alt="Weather icon"
          className="w-12 h-12"
        />
      )}
    </div>
  );
};