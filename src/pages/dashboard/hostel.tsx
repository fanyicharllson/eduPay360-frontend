import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function HostelPage() {
  const hostels = [
    { id: 1, name: 'Boys Hostel A', capacity: 60, occupied: 58, warden: 'Mr. John Smith', building: 'Building 5' },
    { id: 2, name: 'Boys Hostel B', capacity: 60, occupied: 55, warden: 'Mr. Robert Jones', building: 'Building 6' },
    { id: 3, name: 'Girls Hostel A', capacity: 60, occupied: 60, warden: 'Mrs. Sarah Williams', building: 'Building 7' },
    { id: 4, name: 'Girls Hostel B', capacity: 50, occupied: 48, warden: 'Mrs. Emily Brown', building: 'Building 8' },
  ]

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hostel</h1>
            <p className="text-muted-foreground mt-1">Manage hostel facilities and student accommodation</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add Hostel
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hostels.map((hostel) => (
            <Card key={hostel.id} className="border-border/50 hover:border-border transition-all cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{hostel.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <p><span className="font-medium">Capacity:</span> {hostel.capacity}</p>
                  <p><span className="font-medium">Occupied:</span> {hostel.occupied}/{hostel.capacity}</p>
                  <p><span className="font-medium">Warden:</span> {hostel.warden}</p>
                  <p><span className="font-medium">Building:</span> {hostel.building}</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full" 
                    style={{ width: `${(hostel.occupied / hostel.capacity) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{Math.round((hostel.occupied / hostel.capacity) * 100)}% Occupied</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
