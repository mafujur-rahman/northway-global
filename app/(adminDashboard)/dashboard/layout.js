
import "./globals.css"
import Footer from './_components/shared/Footer/Footer'
import Header from './_components/shared/Header/Header'
import { AuthProvider } from "./_components/Context/AuthContext"



export default function RootLayout({ children }) {
  return (
    <html lang='en' data-arp="">
      <body cz-shortcut-listen="true">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
