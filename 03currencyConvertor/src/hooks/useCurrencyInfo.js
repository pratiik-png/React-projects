import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res) => {
        console.log("Full Response:", res);
        console.log("Currency:", currency);
        console.log("res[currency]:", res[currency]);

        setData(res[currency] || {});
      })
      .catch((err) => console.error(err));
  }, [currency]);

  return data;
}

export default useCurrencyInfo;