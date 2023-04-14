import MainLayout from "@/components/layouts/mainlayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";

export default function CryptoView() {
  const router = useRouter();
  const { id, currency } = router.query;
  const [loading, setLoading] = useState(true);
  const [crypto, setCrypto] = useState();

  const onCurrencyChange = (evt) => {
    const c = evt.target.value;
    router.push(`/crypto/?id=${id}&currency=${c}`);
  }

  useEffect(() => {
    if ( !id ) {
      return;
    }
    const fetchCrypto =  async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/crypto/?id=${id}&currency=${currency}`);
        setCrypto(res.data);
        setLoading(false);
      } catch(error) {
        setLoading(false);
      }
    }
    fetchCrypto();
  }, [id, currency])

  return(
    <MainLayout title={`Crypto App | ${crypto ? crypto.name : "View"}`}>
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" className="btn">
            Back
          </Link>
        </div>
        { loading
          ? <div style={{ textAlign:'center' }}>Loading...</div>
          : <>
              { crypto ? (<div>
                <div style={{ textAlign:'center', marginBottom: '1rem' }}><img src={crypto.logo} /></div>
                <h2 style={{ textAlign:'center', marginBottom: '1rem' }}>{`${crypto.name}(${crypto.symbol})`}</h2>
                <div className="currency-filter">
                  <span>Currency</span>
                  <select onChange={onCurrencyChange}>
                    <option value="USD" selected={currency === "USD"}>USD</option>
                    <option value="EUR" selected={currency === "EUR"}>EUR</option>
                    <option value="CNY" selected={currency === "CNY"}>CNY</option>
                  </select>
                </div>
                <div className="crypto-details-item">
                  <span>Price</span>
                  <strong>{crypto.price}</strong>
                </div>
                <div className="crypto-details-item">
                  <span>Market Cap</span>
                  <strong>{crypto.market_cap}</strong>
                </div>
                <div className="crypto-details-item">
                  <span>Volume (24h)</span>
                  <strong>{crypto.volume_24h}</strong>
                </div>
                <div className="crypto-details-item">
                  <span>Total Supply</span>
                  <strong>{crypto.total_supply}</strong>
                </div>
                <div className="crypto-details-item">
                  <span>Last Updated</span>
                  <strong>{crypto.last_updated}</strong>
                </div>
              </div>) : (
                <div style={{ textAlign:'center' }}>No details displayed</div>
              )}
            </>
        }
      </div>
    </MainLayout>
  );
}