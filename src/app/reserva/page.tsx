'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ReservaPage() {
  const router = useRouter();
  const [query, setQuery] = useState<any>({});
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    if (router.query) {
      setQuery(router.query);
    }
  }, [router.query]);

  const {
    from = '',
    to = '',
    departDate = '',
    returnDate = '',
    passengers = '',
    tripType = '',
    price = '',
    airline = ''
  } = query;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mostrar la imagen QR estática
    setShowQRCode(true);
  };

  // URL de la imagen QR estática
  const qrImageUrl = '/path/to/your/qr-code-image.png';

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Confirmar Reserva</h1>
      <Card className="shadow-md rounded-lg border border-gray-200 bg-white">
        <CardHeader className="bg-gray-100">
          <h2 className="text-lg font-semibold">Formulario de Reserva</h2>
        </CardHeader>
        <CardContent>
          {!showQRCode ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre completo</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Nombre completo"
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Correo electrónico"
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Teléfono"
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="idNumber" className="text-sm font-medium text-gray-700">Número de Cédula</Label>
                <Input
                  id="idNumber"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                  placeholder="Número de Cédula"
                  className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
                Confirmar Reserva
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-4">Escanea el código QR para completar el pago</h2>
              <img src='https://vuelosbaratoscolombia.com/wp-content/uploads/2024/09/Tiquetes-Baratos.jpg' alt="Código QR de pago" className="mx-auto" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
