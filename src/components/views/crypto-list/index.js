
import { useEffect, useState } from "react";
import axios from 'axios';
import Link from "next/link";
import MainLayout from "@/components/layouts/mainlayout";
import { useRouter } from "next/router";

export default function CryptoList() {

  const [loading, setLoading] = useState(true);
  const [cryptos, setCryptos] = useState([]);

  const [currency, setCurrency] = useState('USD');

  const onCurrencyChange = async (evt) => {
    const c = evt.target.value;
    setCurrency(c);
  }

  useEffect(() => {
    const fetchCryptos =  async ( currency ) => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/cryptos/${currency}`);
        setCryptos(res.data.data);
        setLoading(false);
      } catch(error) {
        setLoading(false);
      }
    }
    fetchCryptos( currency );
  }, [currency])

  return(
    <MainLayout title="Crypto App | Home">
      <div>
        <h2 style={{textAlign: 'center'}}>Top 100 Cryptocurrencies</h2>
        <div className="currency-filter">
          <span>Currency</span>
          <select onChange={onCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CNY">CNY</option>
          </select>
        </div>
        { loading 
          ? (<div style={{ textAlign: 'center'}}>Loading...</div>) 
          : (<div>
              { (!loading && cryptos.length == 0) && (<div style={{ textAlign: 'center'}}>No Results</div>)}
              {cryptos.map((crypto, index) => {
                const key = `crypto-item-${index}`;
                const name = `${crypto.name}(${crypto.symbol})`;
                const id = crypto.id;
                let price = '0.00';
                try {
                  price = crypto.quote[currency].price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: currency
                  });
                } catch(_) { }
                return(
                  <div key={key}>
                    <Link className='crypto-list-item' href={`/crypto?id=${id}&currency=${currency}`}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{name}</span>
                        <span>{price}</span>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>)}
      </div>
    </MainLayout>
  );
}