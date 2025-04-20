import { Html, Head, Main, NextScript } from 'next/document'
const icon = process.env.NEXT_PUBLIC_LOGO || './logo.png'

export default function Document() {
  return (
    <Html className="h-full">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="icon" href={icon} />
        <link rel="apple-touch-icon" href={icon} />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}