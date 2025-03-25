import '../styles/globals.css'
const icon = process.env.NEXT_PUBLIC_LOGO || './logo.png'
function MyApp({ Component, pageProps }) {
  return (
    <div className="h-full">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap" rel="stylesheet" />
      <link rel="icon" href={icon} />
      <link rel="apple-touch-icon" href={icon} />
      <Component {...pageProps} />
    </div >
  )
}

export default MyApp
