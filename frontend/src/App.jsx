import Header from './components/Header.jsx'
import StatCard from './components/StatCard.jsx'
import { useOrders, useOrderStats } from "./hooks/useOrders";
import Table from "./components/Table.jsx";
import Pagination from "./components/Pagination.jsx";

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
      </div>
    )
}

export default App
