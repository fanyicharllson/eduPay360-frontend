import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function SubjectsPage() {
  const subjects = [
    { id: 1, name: 'Mathematics', code: 'MTH101', credits: 4, students: 250 },
    { id: 2, name: 'English', code: 'ENG101', credits: 4, students: 280 },
    { id: 3, name: 'Science', code: 'SCI101', credits: 4, students: 200 },
    { id: 4, name: 'History', code: 'HIS101', credits: 3, students: 180 },
    { id: 5, name: 'Physics', code: 'PHY101', credits: 4, students: 220 },
    { id: 6, name: 'Chemistry', code: 'CHM101', credits: 4, students: 210 },
  ]

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Subjects</h1>
            <p className="text-muted-foreground mt-1">Manage all school subjects and programs</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add Subject
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <Card key={subject.id} className="border-border/50 hover:border-border transition-all cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2">{subject.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">Code: {subject.code}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Credits</p>
                    <p className="font-bold text-foreground">{subject.credits}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Students</p>
                    <p className="font-bold text-foreground">{subject.students}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
