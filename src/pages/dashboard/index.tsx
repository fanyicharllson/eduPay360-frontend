
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Users, BookOpen, DollarSign, GraduationCap, TrendingUp } from 'lucide-react'
import { StarStudentsTable, ExamResultsTable } from '@/components/dashboard/tables'

const examResultsData = [
  { month: 'Mon', teachers: 40, students: 65 },
  { month: 'Tue', teachers: 45, students: 72 },
  { month: 'Wed', teachers: 38, students: 68 },
  { month: 'Thu', teachers: 52, students: 75 },
  { month: 'Fri', teachers: 48, students: 70 },
  { month: 'Sat', teachers: 42, students: 63 },
  { month: 'Sun', teachers: 50, students: 78 },
]

const studentDemographics = [
  { name: 'Male', value: 8500, color: '#667eea' },
  { name: 'Female', value: 6500, color: '#f9a825' },
]

const statCards = [
  {
    title: 'Students',
    value: '15.0K',
    icon: Users,
    trend: '+12%',
    bgGradient: 'from-purple-500/20 to-purple-400/10',
    borderColor: 'border-purple-200 dark:border-purple-900',
    iconBgColor: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    shadowColor: 'hover:shadow-purple-500/20',
  },
  {
    title: 'Teachers',
    value: '2.0K',
    icon: GraduationCap,
    trend: '+8%',
    bgGradient: 'from-blue-500/20 to-blue-400/10',
    borderColor: 'border-blue-200 dark:border-blue-900',
    iconBgColor: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400',
    shadowColor: 'hover:shadow-blue-500/20',
  },
  {
    title: 'Parents',
    value: '5.6K',
    icon: Users,
    trend: '+5%',
    bgGradient: 'from-orange-500/20 to-orange-400/10',
    borderColor: 'border-orange-200 dark:border-orange-900',
    iconBgColor: 'bg-orange-100 dark:bg-orange-900/30',
    iconColor: 'text-orange-600 dark:text-orange-400',
    shadowColor: 'hover:shadow-orange-500/20',
  },
  {
    title: 'Earnings',
    value: '125.5M FCFA',
    icon: DollarSign,
    trend: '+24%',
    bgGradient: 'from-green-500/20 to-green-400/10',
    borderColor: 'border-green-200 dark:border-green-900',
    iconBgColor: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    shadowColor: 'hover:shadow-green-500/20',
  },
]

export default function DashboardHome() {
  return (
    <>
      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your school's performance overview.</p>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <Card 
                key={stat.title} 
                className={`bg-gradient-to-br ${stat.bgGradient} ${stat.borderColor} border hover:border-current transition-all duration-300 ${stat.shadowColor} hover:shadow-lg`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">{stat.title}</p>
                      <h3 className="text-3xl font-bold text-foreground mb-3">{stat.value}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                          {stat.trend}
                        </span>
                        <span className="text-xs text-muted-foreground">this month</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${stat.iconBgColor} ${stat.iconColor} flex-shrink-0`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-current/10">
                    <p className="text-xs text-muted-foreground">Total active users</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart - Exam Results */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>All Exam Results</span>
                <div className="flex items-center gap-4 text-sm font-normal">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Teachers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <span className="text-muted-foreground">Students</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={examResultsData}>
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
                  <Line type="monotone" dataKey="teachers" stroke="#667eea" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="students" stroke="#22d3ee" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Donut Chart - Students Distribution */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Students</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={studentDemographics}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {studentDemographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2 text-sm">
                {studentDemographics.map((demo) => (
                  <div key={demo.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: demo.color }} />
                    <span className="text-muted-foreground">{demo.name}</span>
                    <span className="font-semibold text-foreground ml-auto">{demo.value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-border flex items-center gap-2">
                  <span className="text-muted-foreground font-medium">Total</span>
                  <span className="font-bold text-foreground ml-auto">15000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Star Students Table */}
          <StarStudentsTable />

          {/* Exam Results Table */}
          <ExamResultsTable />
        </div>
      </div>
    </>
  )
}
