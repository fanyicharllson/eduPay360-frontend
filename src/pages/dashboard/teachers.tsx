import { DashboardLayout } from '@/components/dashboard/layout-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const teachers = [
  { id: 1, name: 'Dr. James Wilson', email: 'james@school.com', subject: 'Mathematics', classes: 5, status: 'Active' },
  { id: 2, name: 'Mrs. Emily Davis', email: 'emily@school.com', subject: 'English', classes: 4, status: 'Active' },
  { id: 3, name: 'Mr. Robert Smith', email: 'robert@school.com', subject: 'Science', classes: 6, status: 'Active' },
  { id: 4, name: 'Ms. Sarah Jones', email: 'sarah@school.com', subject: 'History', classes: 3, status: 'On Leave' },
  { id: 5, name: 'Prof. Michael Brown', email: 'michael@school.com', subject: 'Physics', classes: 5, status: 'Active' },
]

export default function TeachersPage() {
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Teachers</h1>
            <p className="text-muted-foreground mt-1">Manage teacher information and assignments</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add Teacher
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or subject..."
                  className="pl-10 bg-muted border-0"
                />
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Table */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>All Teachers ({teachers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left">
                    <th className="pb-3 font-medium px-4 py-3">Name</th>
                    <th className="pb-3 font-medium px-4 py-3">Email</th>
                    <th className="pb-3 font-medium px-4 py-3">Subject</th>
                    <th className="pb-3 font-medium px-4 py-3">Classes</th>
                    <th className="pb-3 font-medium px-4 py-3">Status</th>
                    <th className="pb-3 font-medium px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-foreground font-medium">{teacher.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{teacher.email}</td>
                      <td className="px-4 py-3 text-foreground">{teacher.subject}</td>
                      <td className="px-4 py-3 text-muted-foreground">{teacher.classes}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${teacher.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-yellow-500/20 text-yellow-600'}`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer gap-2">
                              <Edit className="w-4 h-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer gap-2 text-destructive">
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
