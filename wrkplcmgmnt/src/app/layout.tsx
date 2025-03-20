// src/app/layout.tsx
import NavBar from '../components/NavBar';  // Hier wird die NavBar-Komponente importiert
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <NavBar /> {/* Hier wird die NavBar-Komponente eingebunden */}
        {children} {/* Hier wird der Inhalt der aktuellen Seite eingefügt */}
      </body>
    </html>
  );
}
