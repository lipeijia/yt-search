import React from 'react';
import Items from './Items';
import { useSelector } from 'react-redux';

export default function ListItems() {
  const items = useSelector((state) => state.search.results);
  console.log(items);
  return (
    <div>
      <Items />
    </div>
  );
}
