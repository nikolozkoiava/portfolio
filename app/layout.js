import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Nikoloz Koiava',
  description: 'IT Support Specialist transitioning into DevOps Engineering.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body>
        <div className="grid-bg" />
        {children}
      </body>
    </html>
  );
}
