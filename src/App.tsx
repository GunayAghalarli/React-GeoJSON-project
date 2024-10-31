import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import './App.css';

interface Map {
  id: number;
  name1: string;
  name2: string;
}

const App: React.FC = () => {
  const items: Map[] = [
    { id: 1, name1: 'Solution1', name2: 'Solution2' },
  ];

  return (
    <div>
      <h1>GeoJSON Display Table</h1>
      <table>
        <TableHeader />
        <TableBody data={items} />
      </table>
    </div>
  );
};

export default App;
