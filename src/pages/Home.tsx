import { useEffect, useState, useRef } from 'react';
import { fetchApi } from '../api';
import { TableData } from '../components/table/Table';

export interface WootItem {
  Categories: [];
  Condition?: null;
  EndDate: string;
  FormatUrl: string;
  IsAvailableOnMobileOnly: boolean;
  isFeatured: boolean;
  isFulfilledByAmazon: boolean;
  isSoldOut: boolean;
  isWootOut: boolean;
  ListPrice: { Minimum: number; Maximum: number };
  OfferId: string;
  Photo: string;
  SalePrice: { Minimum: number; Maximum: number };
  Site: string;
  Slug: null;
  StartDate: string;
  Subtitle: null;
  Title: string;
  Url: string;
  Savings?: string;
}

export const Home = () => {
  const [items, setItems] = useState<WootItem[] | []>([]);
  const isMounted = useRef(true);
  const getData = async () => {
    const data = await fetchApi();
    const filtered = data
      .filter((i: WootItem) => {
        if (
          i.ListPrice &&
          Math.floor(i.ListPrice.Minimum - i.SalePrice.Minimum) > 0
        ) {
          console.log(i);
          return i;
        }
      })
      .sort((a: WootItem, b: WootItem) => {
        if (a.ListPrice && b.ListPrice) {
          const aSavings = a.ListPrice.Minimum - a.SalePrice.Minimum;
          const bSavings = b.ListPrice.Minimum - b.SalePrice.Minimum;
          a.Savings = aSavings.toFixed(2);
          b.Savings = bSavings.toFixed(2);
          return Number(bSavings) - Number(aSavings);
        }
      });
    setItems(filtered.slice(0, 100));
  };

  useEffect(() => {
    if (isMounted) {
      getData();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      <TableData items={items} />
    </>
  );
};
