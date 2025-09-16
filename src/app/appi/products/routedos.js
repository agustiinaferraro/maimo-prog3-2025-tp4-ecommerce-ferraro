// /app/api/tour/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const tourDates = [
    { id: 1, city: "Buenos Aires, Argentina", venue: "Luna Park", date: "2025-10-05", ticketUrl: "#" },
    { id: 2, city: "Santiago, Chile", venue: "Movistar Arena", date: "2025-10-07", ticketUrl: "#" },
    { id: 3, city: "São Paulo, Brasil", venue: "Allianz Parque", date: "2025-10-10", ticketUrl: "#" },
    { id: 4, city: "Ciudad de México, México", venue: "Pepsi Center", date: "2025-10-15", ticketUrl: "#" },
    { id: 5, city: "Los Ángeles, USA", venue: "Hollywood Palladium", date: "2025-10-25", ticketUrl: "#" },
    { id: 6, city: "Nueva York, USA", venue: "Madison Square Garden", date: "2025-10-30", ticketUrl: "#" },
    { id: 7, city: "Londres, Reino Unido", venue: "O2 Academy Brixton", date: "2025-11-05", ticketUrl: "#" },
    { id: 8, city: "París, Francia", venue: "Le Zénith", date: "2025-11-08", ticketUrl: "#" },
    { id: 9, city: "Berlín, Alemania", venue: "Mercedes-Benz Arena", date: "2025-11-12", ticketUrl: "#" },
    { id: 10, city: "Madrid, España", venue: "WiZink Center", date: "2025-11-15", ticketUrl: "#" },
  ];

  return NextResponse.json(tourDates);
}