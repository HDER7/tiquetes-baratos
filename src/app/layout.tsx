import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { PlaneTakeoff, Phone, Mail, MapPin } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tiquetes Economicos',
  description: 'Tu compañero de confianza para encontrar los mejores vuelos',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-blue-600 text-white">
            <div className="container mx-auto px-4 py-6">
              <div className="flex justify-between items-center">
                <Link href="/" className="text-3xl font-bold flex items-center">
                  <PlaneTakeoff className="mr-2" />
                  Tiquetes Economicos
                </Link>
                <nav>
                  <ul className="flex space-x-4">
                    <li><Link href="/" className="hover:underline">Inicio</Link></li>
                    <li><Link href="/destinos" className="hover:underline">Destinos</Link></li>
                    <li><Link href="/ofertas" className="hover:underline">Ofertas</Link></li>
                    <li><Link href="/contacto" className="hover:underline">Contacto</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Sobre Tiquetes Economicos</h3>
                  <p>Somos tu compañero de confianza para encontrar los mejores vuelos a los mejores precios. Viaja con nosotros y descubre el mundo.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Enlaces rápidos</h3>
                  <ul className="space-y-2">
                    <li><Link href="/" className="hover:underline">Reservas</Link></li>
                    <li><Link href="/" className="hover:underline">Check-in online</Link></li>
                    <li><Link href="/" className="hover:underline">Estado del vuelo</Link></li>
                    <li><Link href="/" className="hover:underline">Programa de viajero frecuente</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Contacto</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center"><Phone className="mr-2" /> 01800064652</li>
                    <li className="flex items-center"><Mail className="mr-2" /> info@tiqueteseconomicos.com</li>
                    <li className="flex items-center"><MapPin className="mr-2" /> 123 Calle Principal, Ciudad</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                <p>&copy; 2024 Tiquetes Economicos. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}