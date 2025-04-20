import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (window.parent !== window) {
      console.log('[IFRAME APP] Running inside iframe. Setting up navigation reporting.')

      const reportUrlToParent = () => {
        const currentUrl = window.location.href
        console.log('[IFRAME APP] Reporting URL to parent:', currentUrl)
        window.parent.postMessage({
          type: 'navigation-update',
          url: currentUrl
        }, '*')
      }

      reportUrlToParent()

      const handleRouteChange = () => {
        setTimeout(reportUrlToParent, 50)
      }
      router.events.on('routeChangeComplete', handleRouteChange)
      router.events.on('hashChangeComplete', handleRouteChange)

      const originalPushState = history.pushState
      history.pushState = function () {
        originalPushState.apply(this, arguments)
        reportUrlToParent()
      }

      const originalReplaceState = history.replaceState
      history.replaceState = function () {
        originalReplaceState.apply(this, arguments)
        reportUrlToParent()
      }

      window.addEventListener('popstate', reportUrlToParent)

      const handleParentCommands = (event) => {
        if (event.data && event.data.type === 'navigation-command') {
          if (event.data.action === 'back') {
            console.log('[IFRAME APP] Received back command')
            router.back()
          } else if (event.data.action === 'forward') {
            console.log('[IFRAME APP] Received forward command')
            history.forward()
          }
        }
      }
      window.addEventListener('message', handleParentCommands)

      console.log('[IFRAME APP] Navigation reporting setup complete.')

      return () => {
        console.log('[IFRAME APP] Cleaning up navigation reporting.')
        router.events.off('routeChangeComplete', handleRouteChange)
        router.events.off('hashChangeComplete', handleRouteChange)
        window.removeEventListener('popstate', reportUrlToParent)
        window.removeEventListener('message', handleParentCommands)
      }
    } else {
      console.log('[IFRAME APP] Not running inside an iframe.')
    }
  }, [router])

  return (
    <div className="h-full">
      <Component {...pageProps} />
    </div >
  )
}

export default MyApp
