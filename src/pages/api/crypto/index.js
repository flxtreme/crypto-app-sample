import axios from 'axios';
import { API_KEY, LIMIT } from '@/config';

export default async function handler( req, res ) {
  const { id, currency } = req.query;


  const infores = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${id}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      }
    }
  )

  const quoteres = await axios.get(
    `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${id}&convert=${currency || "USD"}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      }
    }
  )

  const data = quoteres.data.data[id];
  const info = infores.data.data[id];

  let price = data.quote[currency].price.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  });

  let marketCap = data.quote[currency].market_cap.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  });


  res.status(200).json({
    id: id,
    name: data.name,
    symbol: data.symbol,
    total_supply: data.total_supply || 0,
    max_supply: data.max_supply || 0,
    logo: info.logo,
    price: price,
    volume_24h: data.quote[currency].volume_24h || 0,
    percent_change_1h: data.quote[currency].percent_change_1h || 0,
    percent_change_24h: data.quote[currency].percent_change_24h || 0,
    percent_change_7d: data.quote[currency].percent_change_7d || 0,
    percent_change_30d: data.quote[currency].percent_change_30d || 0, 
    market_cap: marketCap,
    last_updated: data.quote[currency].last_updated
  });
}