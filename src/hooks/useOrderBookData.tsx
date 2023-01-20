import { useState, useEffect } from "react";


const useOrderBookData = (pair: string, limit: number) => {
  const [orderBookData, setOrderBookData] = useState<any>([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@depth${limit}`);
   
    ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        try {
          if ((json.event = "data")) {
            setOrderBookData(json);
          }
        } catch (err) {
          console.log(err);
        }
      };
  }, [limit, pair]);
  return orderBookData;
};

export default useOrderBookData;
