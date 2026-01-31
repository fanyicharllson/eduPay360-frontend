import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function TransportPage() {
  const routes = [
    { id: 1, name: 'Route A - Yaoundé North', driver: 'John Doe', vehicle: 'Bus 01', students: 45, status: 'Active' },
    { id: 2, name: 'Route B - Yaoundé South', driver: 'Sarah Smith', vehicle: 'Bus 02', students: 38, status: 'Active' },
    { id: 3, name: 'Route C - Yaoundé East', driver: 'Michael Brown', vehicle: 'Bus 03', students: 42, status: 'Active' },
    { id: 4, name: 'Route D - Yaoundé West', driver: 'Emily Davis', vehicle: 'Bus 04', students: 40, status: 'Inactive' },
  ]

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transport</h1>
            <p className="text-muted-foreground mt-1">Manage transport routes and bus operations</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add Route
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((route) => (
            <Card key={route.id} className="border-border/50 hover:border-border transition-all cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{route.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p><span className="font-medium">Driver:</span> {route.driver}</p>
                  <p><span className="font-medium">Vehicle:</span> {route.vehicle}</p>
                  <p><span className="font-medium">Students:</span> {route.students}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${route.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-600'}`}>
                  {route.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
