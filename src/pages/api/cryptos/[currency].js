import axios from 'axios';
import { API_KEY, LIMIT } from '@/config';

export default async function handler( req, res ) {
  const { currency } = req.query;

  const axiosres = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${LIMIT}&convert=${currency}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      }
    }
  )

  res.status(200).json(axiosres.data)
}