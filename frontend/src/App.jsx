import Header from './components/Header.jsx'
import StatCard from './components/StatCard.jsx'

const stats = [
    { name: 'Total Orders', stat: '71,897' },
    { name: 'Orders In-Progress', stat: '58.16%' },
    { name: 'Orders Shipped', stat: '24.57%' },
]

function App() {
  return (
      <div className="min-h-full">
          <Header />
          <div className="py-10">
              <header>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                  </div>
              </header>
              <main>
                  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                      <h3 className="text-base font-semibold text-gray-900">Last 30 days</h3>
                      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                          {stats.map((item) => (
                              <StatCard item={item} key={item.name} />
                          ))}
                      </dl>
                  </div>
              </main>
          </div>
      </div>
  )
}

export default App
