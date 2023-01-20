import { useState, useEffect } from "react";
import axios from "axios";

const useCurrentPrice = (pair: string) => {
  const [currentPrice, setCurrentPrice] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${pair.toLocaleUpperCase()}`);
        setCurrentPrice(parseInt(response.data.price));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [pair]);
  
  return (currentPrice);
};

export default useCurrentPrice;