import React, { useState, useEffect } from 'react';
import { FeatureCollection, Geometry } from 'geojson';
import MapView from './MapView';

interface Map {
  id: number;
  name1: string;
  name2: string;
}

interface TableBodyProps {
  data: Map[];
}

const TableBody: React.FC<TableBodyProps> = ({ data }) => {
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry> | null>(null);
  const [selectedSolution, setSelectedSolution] = useState(1); // 1 for Solution 1, 2 for Solution 2

  // Fetch GeoJSON data based on selectedSolution
  useEffect(() => {
    const handleFetchGeoData = async () => {
      setGeoData(null); // Reset geoData before fetching new data
      try {
        const geoJsonFile = selectedSolution === 1
          ? '/SE_State_Management_Polygons_1.json'
          : '/SE_State_Management_Polygons_2.json'; // Choose file based on solution

        const response = await fetch(`${geoJsonFile}?timestamp=${new Date().getTime()}`);
        if (!response.ok) throw new Error('Failed to load GeoJSON file');

        const geoJson: FeatureCollection<Geometry> = await response.json();
        setGeoData(geoJson);
      } catch (error) {
        console.error('Error fetching GeoJSON:', error);
      }
    };

    handleFetchGeoData();
  }, [selectedSolution]); // Dependency on selectedSolution to refetch when it changes

  return (
    <tbody>
      {data.map((items) => (
        <tr key={items.id}>
          <td>
            <button onClick={() => setSelectedSolution(1)}>{items.name1}</button>
            <button onClick={() => setSelectedSolution(2)}>{items.name2}</button>
          </td>
          <td>
            {geoData ? (
              <MapView geoData={geoData} />
            ) : (
              <p>Loading {selectedSolution === 1 ? items.name1 : items.name2}...</p>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
