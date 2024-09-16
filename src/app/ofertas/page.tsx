'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const offers = [
  { id: 1, title: "Vuelos a Europa", description: "Descuentos de hasta 30% en vuelos a destinos europeos", price: "Desde $499", expiry: "2023-12-31" },
  { id: 2, title: "Escapada de fin de semana", description: "Vuelos de ida y vuelta a destinos nacionales", price: "Desde $199", expiry: "2023-11-30" },
  { id: 3, title: "Vuelos a playas paradisíacas", description: "Disfruta del sol y la playa con nuestras ofertas especiales", price: "Desde $349", expiry: "2023-10-31" },
  { id: 4, title: "Aventura en Asia", description: "Descubre la magia de Asia con nuestros paquetes especiales", price: "Desde $699", expiry: "2023-12-15" },
  { id: 5, title: "Vuelos de última hora", description: "Aprovecha nuestras ofertas de último minuto", price: "Desde $149", expiry: "2023-09-30" },
];

export default function Page() {
  const [showExpired, setShowExpired] = useState(false);

  const currentDate = new Date();
  const filteredOffers = offers.filter(offer => 
    showExpired || new Date(offer.expiry) > currentDate
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Ofertas Especiales</h1>
      <div className="mb-6">
        <Button 
          onClick={() => setShowExpired(!showExpired)} 
          className="bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        >
          {showExpired ? "Ocultar ofertas expiradas" : "Mostrar todas las ofertas"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => {
          const isExpired = new Date(offer.expiry) <= currentDate;
          return (
            <Card key={offer.id} className="shadow-lg border border-gray-200 rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{offer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{offer.description}</p>
                <p className="font-bold mt-2">{offer.price}</p>
                <p className="text-sm text-gray-500 mt-2">Expira: {offer.expiry}</p>
                {isExpired ? (
                  <Badge variant="destructive" className="mt-2">Expirado</Badge>
                ) : (
                  <Button 
                    className="mt-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  >
                    Reservar ahora
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
