'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const destinations = [
  { id: 1, name: 'París', country: 'Francia', image: 'https://th.bing.com/th/id/OIP.Sw13f8OS0jUvNjCTN3ZJngHaEo?rs=1&pid=ImgDetMain' },
  { id: 2, name: 'Tokio', country: 'Japón', image: 'https://th.bing.com/th/id/OIP.ZJBYv1k0ucxEXClsMVB5yQAAAA?rs=1&pid=ImgDetMain' },
  { id: 3, name: 'Nueva York', country: 'Estados Unidos', image: 'https://th.bing.com/th/id/OIP.D69-kRMIdZ1rIkmsbswBVQHaEo?rs=1&pid=ImgDetMain' },
  { id: 4, name: 'Sídney', country: 'Australia', image: 'https://th.bing.com/th/id/OIP.2iYvaFpdB0EOzY7XQbdc0wHaE9?rs=1&pid=ImgDetMain' },
  { id: 5, name: 'Río de Janeiro', country: 'Brasil', image: 'https://th.bing.com/th/id/OIP.wGVaxF3KbeT3SMPqjw6V6wHaEz?rs=1&pid=ImgDetMain' },
  { id: 6, name: 'Barcelona', country: 'España', image: 'https://th.bing.com/th/id/OIP.xHRrbk9fp8E3ixh-jbeCEwHaE7?rs=1&pid=ImgDetMain' },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Nuestros Destinos</h1>
      <div className="mb-6 flex justify-center">
        <Input
          type="text"
          placeholder="Buscar destinos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => (
          <Card key={dest.id} className="shadow-lg rounded-lg border border-gray-200">
            <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover rounded-t-lg" />
            <CardHeader className="bg-gray-100 p-4">
              <CardTitle className="text-xl font-semibold text-gray-900">{dest.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700">{dest.country}</p>
              <Button className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg shadow-sm">Ver vuelos</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
