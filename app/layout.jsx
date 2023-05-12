import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: "Next-CRUD | Promptopia",
  description: 'A Simple NEXT Full-stack App'
}

const RootLayout = ({ children }) => {
  return (
    <>
      <html lang='en'>
        <body>
          <Provider>
            <div className="main">
              <div className="gradient">
              </div>
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </Provider>
        </body>
      </html>
    </>
  )
}
export default RootLayout