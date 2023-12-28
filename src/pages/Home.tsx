import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TreeMap } from '../components/treemap';
import { TableData } from '../components/table/Table';
import './home-styles.scss';

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
  Savings: string;
}

export const Home = () => {
  const [products, setProducts] = useState<WootItem[]>([]);
  const [sortedProduct, setSortedProduct] = useState<WootItem[]>([]);
  const isMounted = useRef(true);
  console.log('is Mounted', isMounted.current);
  const sortData = (data: WootItem[]) => {
    if (data) {
      const filtered = data
        .filter((i: WootItem) => {
          if (
            i.ListPrice &&
            Math.floor(i.ListPrice.Minimum - i.SalePrice.Minimum) > 0
          ) {
            return i;
          }
        })
        .sort((a: WootItem, b: WootItem) => {
          const aSavings = a.ListPrice.Minimum - a.SalePrice.Minimum;
          const bSavings = b.ListPrice.Minimum - b.SalePrice.Minimum;
          a.Savings = aSavings.toFixed(2);
          b.Savings = bSavings.toFixed(2);
          return Number(bSavings) - Number(aSavings);
        });
      setSortedProduct(filtered.slice(0, 100));
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8000');
      setProducts(response.data);
    }
    if (isMounted) {
      fetchData();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted) {
      sortData(products);
    }
  }, [products]);

  return (
    <>
      <div className="container">
        <div>
          <div>
            <span>Tech</span>
            <span>Garden</span>
            <span>Home</span>
          </div>
          <div className="">
            <TreeMap elementId="chart" items={sortedProduct} />
          </div>
        </div>
      </div>
    </>
  );
};
