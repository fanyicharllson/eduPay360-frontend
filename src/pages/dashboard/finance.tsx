import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { DollarSign, TrendingUp, Users, Activity } from 'lucide-react'

const revenueData = [
  { month: 'Jan', income: 12000, expense: 4000 },
  { month: 'Feb', income: 15000, expense: 4500 },
  { month: 'Mar', income: 18000, expense: 5000 },
  { month: 'Apr', income: 16000, expense: 4800 },
  { month: 'May', income: 20000, expense: 5500 },
  { month: 'Jun', income: 22000, expense: 6000 },
]

const financialCards = [
  {
    title: 'Total Revenue',
    value: '125.5M FCFA',
    icon: DollarSign,
    trend: '+24%',
    bgColor: 'from-green-500/10 to-green-500/5',
    iconColor: 'text-green-500',
  },
  {
    title: 'Total Expenses',
    value: '32.4M FCFA',
    icon: Activity,
    trend: '+8%',
    bgColor: 'from-red-500/10 to-red-500/5',
    iconColor: 'text-red-500',
  },
  {
    title: 'Net Profit',
    value: '93.1M FCFA',
    icon: TrendingUp,
    trend: '+32%',
    bgColor: 'from-primary/10 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    title: 'Pending Payments',
    value: '8.3M FCFA',
    icon: Users,
    trend: '-5%',
    bgColor: 'from-yellow-500/10 to-yellow-500/5',
    iconColor: 'text-yellow-500',
  },
]

const transactions = [
  { id: 1, type: 'School Fees', amount: '+5,000,000 FCFA', date: '2024-01-15', status: 'Completed' },
  { id: 2, type: 'Staff Salary', amount: '-1,200,000 FCFA', date: '2024-01-14', status: 'Completed' },
  { id: 3, type: 'Facility Maintenance', amount: '-450,000 FCFA', date: '2024-01-13', status: 'Completed' },
  { id: 4, type: 'Exam Fees', amount: '+2,300,000 FCFA', date: '2024-01-12', status: 'Pending' },
  { id: 5, type: 'Utilities', amount: '-320,000 FCFA', date: '2024-01-11', status: 'Completed' },
]

export default function FinancePage() {
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance & Earnings</h1>
          <p className="text-muted-foreground mt-1">Track revenue, expenses, and financial performance</p>
        </div>

        {/* Financial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {financialCards.map((card) => {
            const Icon = card.icon
            return (
              <Card key={card.title} className={`bg-gradient-to-br ${card.bgColor} border-border/50 hover:border-border transition-all`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">{card.title}</p>
                      <h3 className="text-2xl font-bold text-foreground">{card.value}</h3>
                      <p className={`text-xs font-semibold mt-2 ${card.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {card.trend}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-background ${card.iconColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Income vs Expenses */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#48bb78" name="Income" />
                  <Bar dataKey="expense" fill="#f56565" name="Expense" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Line Chart - Revenue Trend */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="income" stroke="#667eea" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left">
                    <th className="pb-3 font-medium px-4 py-3">Transaction</th>
                    <th className="pb-3 font-medium px-4 py-3">Amount</th>
                    <th className="pb-3 font-medium px-4 py-3">Date</th>
                    <th className="pb-3 font-medium px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-foreground font-medium">{txn.type}</td>
                      <td className={`px-4 py-3 font-semibold ${txn.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {txn.amount}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{txn.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${txn.status === 'Completed' ? 'bg-green-500/20 text-green-600' : 'bg-yellow-500/20 text-yellow-600'}`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
