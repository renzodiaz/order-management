import Header from './components/Header'
import StatCard from './components/StatCard'
import { useOrders, useOrderStats } from "./hooks/useOrders";
import { Toaster } from 'react-hot-toast'
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";

const App = () => {
    const { data, isLoading, isError } = useOrders()
    const { data: stats } = useOrderStats()

    if (isLoading && !data) return <p>Loading…</p>
    if (isError) return <p>Error loading orders</p>

    const orders = data.data
    const pagination = data.meta?.pagination

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
                          {stats?.map((stat) => (
                              <StatCard key={stat.name} item={stat} />
                          ))}
                      </dl>
                      <hr/>
                      <Table orders={orders} />
                      <Pagination pagination={pagination} />
                  </div>
              </main>
          </div>
          <Modal />
          <Toaster
              position="top-right"
              toastOptions={{
                  duration: 3000,
                  style: {
                      background: '#363636',
                      color: '#fff',
                  },
                  success: {
                      duration: 3000,
                      iconTheme: {
                          primary: '#10b981',
                          secondary: '#fff',
                      },
                  },
                  error: {
                      duration: 4000,
                      iconTheme: {
                          primary: '#ef4444',
                          secondary: '#fff',
                      },
                  },
              }}
          />
      </div>
    )
}

export default App
