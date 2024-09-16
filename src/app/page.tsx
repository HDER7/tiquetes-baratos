'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface SearchFormProps {
  onSearch: (from: string, to: string, departDate: string, returnDate: string | null, passengers: string, tripType: 'roundtrip' | 'oneway') => void;
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(from, to, departDate, tripType === 'roundtrip' ? returnDate : null, passengers, tripType);
  };

  return (
    <Card className="shadow-md rounded-lg border border-gray-200 bg-white">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="from" className="text-sm font-medium text-gray-700">Origen</Label>
              <Input
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
                placeholder="Ciudad de origen"
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="to" className="text-sm font-medium text-gray-700">Destino</Label>
              <Input
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
                placeholder="Ciudad de destino"
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="departDate" className="text-sm font-medium text-gray-700">Fecha de salida</Label>
              <Input
                id="departDate"
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {tripType === 'roundtrip' && (
              <div className="flex flex-col">
                <Label htmlFor="returnDate" className="text-sm font-medium text-gray-700">Fecha de regreso</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required={tripType === 'roundtrip'}
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div className="flex flex-col">
              <Label htmlFor="passengers" className="text-sm font-medium text-gray-700">Pasajeros</Label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger id="passengers" className="p-2">
                  {passengers || "Seleccione número de pasajeros"}
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'pasajero' : 'pasajeros'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="tripType" className="text-sm font-medium text-gray-700">Tipo de viaje</Label>
              <Select value={tripType} onValueChange={setTripType}>
                <SelectTrigger id="tripType" className="p-2">
                  {tripType === 'roundtrip' ? 'Ida y vuelta' : 'Solo ida'}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roundtrip">Ida y vuelta</SelectItem>
                  <SelectItem value="oneway">Solo ida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">Buscar Vuelos</Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface Ticket {
  id: number;
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  passengers: string;
  tripType: 'roundtrip' | 'oneway';
  price: number;
  airline: string;
}

const searchTickets = async (from: string, to: string, departDate: string, returnDate: string | null, passengers: string, tripType: 'roundtrip' | 'oneway'): Promise<Ticket[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const airlines = ['AeroViajes', 'SkyHigh', 'VueloRápido', 'AirConnect'];
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    from,
    to,
    departDate,
    returnDate: returnDate ?? '',
    passengers,
    tripType,
    price: Math.floor(Math.random() * 300) + 100,
    airline: airlines[Math.floor(Math.random() * airlines.length)]
  }));
};

interface TicketItemProps {
  ticket: Ticket;
}

function TicketItem({ ticket }: TicketItemProps) {
  return (
    <Card className="shadow-lg border border-gray-200 rounded-lg bg-white">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-lg font-semibold">{ticket.from} a {ticket.to}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">Fecha de salida: {ticket.departDate}</p>
        {ticket.returnDate && <p className="text-sm text-gray-600">Fecha de regreso: {ticket.returnDate}</p>}
        <p className="text-sm text-gray-600">Pasajeros: {ticket.passengers}</p>
        <p className="font-bold text-lg mt-2 text-gray-900">Precio: ${ticket.price}</p>
        <p className="text-sm text-gray-600">Aerolínea: {ticket.airline}</p>
        <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">Reservar</Button>
      </CardContent>
    </Card>
  );
}

interface TicketListProps {
  tickets: Ticket[];
}

function TicketList({ tickets }: TicketListProps) {
  if (tickets.length === 0) {
    return <p className="text-center mt-4 text-gray-600">No se encontraron vuelos. Intenta otra búsqueda.</p>;
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}

function SpecialOffers() {
  const offers = [
    { id: 1, title: 'Vuelos a Europa', description: 'Descuentos de hasta 30% en vuelos a destinos europeos', price: 'Desde $499' },
    { id: 2, title: 'Escapada de fin de semana', description: 'Vuelos de ida y vuelta a destinos nacionales', price: 'Desde $199' },
    { id: 3, title: 'Vuelos a playas paradisíacas', description: 'Disfruta del sol y la playa con nuestras ofertas especiales', price: 'Desde $349' },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Ofertas Especiales</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <Card key={offer.id} className="shadow-lg rounded-lg border border-gray-200 bg-white">
            <CardHeader className="bg-gray-100">
              <CardTitle className="text-lg font-semibold">{offer.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{offer.description}</p>
              <p className="font-bold mt-2 text-gray-900">{offer.price}</p>
              <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">Ver oferta</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Page() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (from: string, to: string, departDate: string, returnDate: string | null, passengers: string, tripType: 'roundtrip' | 'oneway') => {
    setLoading(true);
    try {
      const results = await searchTickets(from, to, departDate, returnDate, passengers, tripType);
      setTickets(results);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Buscador de Vuelos</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <div className="flex justify-center mt-6">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <TicketList tickets={tickets} />
      )}
      <SpecialOffers />
    </div>
  );
}

export default Page;