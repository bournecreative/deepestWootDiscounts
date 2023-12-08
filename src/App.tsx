import { useEffect, useState } from 'react';
import { fetchApi } from './api';

interface WootItem {
  Categories: [];
  Condition?: null;
  EndDate: string;
  FormatUrl: string;
  IsAvailableOnMobileOnly: boolean;
  isFeatured: boolean;
  isFulfilledByAmazon: boolean;
  isSoldOut: boolean;
  isWootOut: boolean;
  ListPrice: { Minimum: number; Maximum: number } | null;
  OfferOd: string;
  Photo: string;
  SalePrice: { Minimum: number; Maximum: number };
  Site: string;
  Slug: null;
  StartDate: string;
  Subtitle: null;
  Title: string;
  Url: string;
  Savings?: number;
}

function App() {
  const [items, setItems] = useState();

  const getData = async () => {
    const data = await fetchApi();
    console.log(data.Items);
    const filtered = data.Items.filter((i: WootItem) => {
      return i.ListPrice !== null;
    }).sort((a: WootItem, b: WootItem) => {
      if (a.ListPrice && b.ListPrice) {
        const aSavings = a.ListPrice.Minimum - a.SalePrice.Minimum;
        const bSavings = b.ListPrice.Minimum - b.SalePrice.Minimum;
        a.Savings = aSavings;
        b.Savings = bSavings;
        return aSavings - bSavings;
      }
    });
    setItems(filtered);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [items]);

  return <>Get woot api data to pupulate from backend</>;
}

export default App;
