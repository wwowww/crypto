export const formatCommasPrice = (price: number) => {
  // return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return price.toLocaleString();
}

export const formatMarketCapPrice = (price: number, currency: string) => {
  const MILLION = 1000000;
  const BILLION = 1000000000;
  const TRILLION = 1000000000000;

  if (currency === 'USD') {
    const millionPrice = price / MILLION;
    return `$${formatCommasPrice(Math.floor(millionPrice))} million`;
  }

  if (price >= TRILLION) {
    const trillionPrice = Math.floor(price / TRILLION);
    const remainder = price % TRILLION; 

    if (remainder >= BILLION) {
      const billionPrice = remainder / BILLION;
      return `${trillionPrice}조 ${billionPrice.toFixed(0)}억`;
    }
    
    return `${trillionPrice.toFixed(2)}조`;
  } else if (price >= BILLION) {
    const billionPrice = price / BILLION;
    return `${billionPrice.toFixed(2)}억`;
  } else if (price >= MILLION) {
    const millionPrice = price / MILLION;
    return `${millionPrice.toFixed(2)}백만`;
  }

  return price.toLocaleString();
};

export const formatCurrency = (price: number, currency: string) => {
  if (currency === "KRW") {
    return `${formatCommasPrice(price)}원`;
  } else if (currency === "USD") {
    return `$${formatCommasPrice(price)}`;
  }
  return `${price}`;
};