import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function ClassesPage() {
  const classes = [
    { id: 1, name: 'Form 1A', students: 45, teacher: 'Mrs. Emily Davis', room: 'Building A - Room 101' },
    { id: 2, name: 'Form 1B', students: 42, teacher: 'Mr. Robert Smith', room: 'Building A - Room 102' },
    { id: 3, name: 'Form 2A', students: 48, teacher: 'Dr. James Wilson', room: 'Building B - Room 201' },
    { id: 4, name: 'Form 3A', students: 50, teacher: 'Prof. Michael Brown', room: 'Building B - Room 301' },
  ]

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Classes</h1>
            <p className="text-muted-foreground mt-1">Manage all classes and class assignments</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add Class
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <Card key={cls.id} className="border-border/50 hover:border-border transition-all cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{cls.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium">Students:</span> {cls.students}</p>
                  <p><span className="font-medium">Teacher:</span> {cls.teacher}</p>
                  <p><span className="font-medium">Room:</span> {cls.room}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
