'use client';
import Link from 'next/link';
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

  const handleTripTypeChange = (value: string) => {
    if (value === 'roundtrip' || value === 'oneway') {
      setTripType(value as 'roundtrip' | 'oneway');
    }
  };

  const handlePassengersChange = (value: string) => {
    setPassengers(value);
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
              <Select value={passengers} onValueChange={handlePassengersChange}>
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
              <Select value={tripType} onValueChange={handleTripTypeChange}>
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
  departTime: string; // Agrega esta línea
  returnDate?: string;
  returnTime?: string; // Agrega esta línea si el viaje es de ida y vuelta
  passengers: string;
  tripType: 'roundtrip' | 'oneway';
  price: number;
  airline: string;
}

const searchTickets = async (from: string, to: string, departDate: string, returnDate: string | null, passengers: string, tripType: 'roundtrip' | 'oneway'): Promise<Ticket[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simular la demora de la búsqueda
  const airlines = ['AeroViajes', 'SkyHigh', 'VueloRápido', 'AirConnect'];
  const getRandomTime = () => `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;

  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    from,
    to,
    departDate,
    departTime: getRandomTime(), // Hora de salida
    returnDate: returnDate ?? '',
    returnTime: returnDate ? getRandomTime() : undefined, // Hora de regreso, si aplica
    passengers,
    tripType,
    price: tripType === 'roundtrip' ? 199800 : 99900,
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
        <p className="text-sm text-gray-600">Fecha de salida: {ticket.departDate} {ticket.departTime}</p>
        {ticket.returnDate && <p className="text-sm text-gray-600">Fecha de regreso: {ticket.returnDate} {ticket.returnTime}</p>}
        <p className="text-sm text-gray-600">Pasajeros: {ticket.passengers}</p>
        <p className="font-bold text-lg mt-2 text-gray-900">Precio: ${ticket.price}</p>
        <p className="text-sm text-gray-600">Aerolínea: {ticket.airline}</p>
        <Link 
          href={{
            pathname: '/reserva',
            query: {
              from: ticket.from,
              to: ticket.to,
              departDate: ticket.departDate,
              departTime: ticket.departTime, // Agrega esta línea
              returnDate: ticket.returnDate || '',
              returnTime: ticket.returnTime || '', // Agrega esta línea
              passengers: ticket.passengers,
              tripType: ticket.tripType,
              price: ticket.price,
              airline: ticket.airline
            }
          }}
        >
          <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
            Reservar
          </Button>
        </Link>
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
    { id: 3, title: 'Vuelos a playas paradisíacas', description: 'Disfruta del sol y el mar con nuestras ofertas', price: 'Desde $299' }
  ];

  return (
    <div className="bg-blue-50 p-4 rounded-lg mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ofertas especiales</h2>
      <ul className="space-y-2">
        {offers.map((offer) => (
          <li key={offer.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
            <p className="text-sm text-gray-600">{offer.description}</p>
            <p className="font-bold text-lg text-gray-800">{offer.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (from: string, to: string, departDate: string, returnDate: string | null, passengers: string, tripType: 'roundtrip' | 'oneway') => {
    setLoading(true);
    const results = await searchTickets(from, to, departDate, returnDate, passengers, tripType);
    setTickets(results);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Busca tus vuelos</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? <p className="mt-4 text-center text-blue-600">Buscando vuelos...</p> : <TicketList tickets={tickets} />}
      <SpecialOffers />
    </div>
  );
}