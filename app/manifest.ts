import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pharma Lingo',
    short_name: 'PharmaLingo',
    description: 'Assistance Dispenser App',
    start_url: '/',
    display: 'standalone', // 👈 คำสั่งสวรรค์ที่บอกให้ซ่อนแถบ URL !
    background_color: '#0f172a',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
