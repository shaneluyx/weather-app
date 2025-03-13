// API密钥 - 请替换为你从OpenWeatherMap获取的API密钥
const API_KEY = '76f1539337a00f2848307536fb527487';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 获取当前天气数据
export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&lang=zh_cn`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('找不到该城市，请检查城市名称');
      }
      throw new Error('获取天气数据失败，请稍后再试');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('天气API错误:', error);
    throw error;
  }
};