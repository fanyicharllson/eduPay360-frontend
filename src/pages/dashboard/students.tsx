import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, MoreVertical, Edit, Trash2, Star } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

const students = [
  { id: 1, name: 'Evelyn Harper', email: 'evelyn@school.com', class: 'Form 3A', status: 'Active', enrollment: 'PRE43178', starred: true },
  { id: 2, name: 'Diana Plenty', email: 'diana@school.com', class: 'Form 3B', status: 'Active', enrollment: 'PRE43174', starred: false },
  { id: 3, name: 'John Miller', email: 'john@school.com', class: 'Form 2A', status: 'Active', enrollment: 'PRE43187', starred: false },
  { id: 4, name: 'Sarah Johnson', email: 'sarah@school.com', class: 'Form 1B', status: 'Inactive', enrollment: 'PRE43190', starred: false },
  { id: 5, name: 'Michael Brown', email: 'michael@school.com', class: 'Form 3A', status: 'Active', enrollment: 'PRE43195', starred: true },
  // Add more for pagination demo
  { id: 6, name: 'Jane Doe', email: 'jane@school.com', class: 'Form 2B', status: 'Active', enrollment: 'PRE43199', starred: false },
  { id: 7, name: 'Peter Parker', email: 'peter@school.com', class: 'Form 1A', status: 'Inactive', enrollment: 'PRE43200', starred: false },
  { id: 8, name: 'Bruce Wayne', email: 'bruce@school.com', class: 'Form 3C', status: 'Active', enrollment: 'PRE43201', starred: false },
  { id: 9, name: 'Clark Kent', email: 'clark@school.com', class: 'Form 2C', status: 'Active', enrollment: 'PRE43202', starred: false },
  { id: 10, name: 'Lois Lane', email: 'lois@school.com', class: 'Form 1C', status: 'Active', enrollment: 'PRE43203', starred: false },
]

import { useState } from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination'
import { usePagination } from '@/hooks/usePagination'

export default function StudentsPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const { page, setPage, pageCount, paginated, itemsPerPage } = usePagination(students.length)
  const pageData = paginated(students)
  const allSelected = selectedRows.length === pageData.length && pageData.length > 0

  const toggleSelectAll = () => {
    if (allSelected) setSelectedRows([])
    else setSelectedRows(pageData.map(s => s.id))
  }
  const toggleSelectRow = (id: number) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }
  const toggleStar = (id: number) => {
    // This is a demo, in real app update backend
    const idx = students.findIndex(s => s.id === id)
    if (idx !== -1) students[idx].starred = !students[idx].starred
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground mt-1">Manage all student information and enrollment</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or enrollment ID..."
                className="pl-10 bg-muted border-0"
              />
            </div>
            <Button variant="outline" className="dark:hover:bg-primary/10 dark:hover:text-primary">Filter</Button>
            <Button variant="outline" className="dark:hover:bg-primary/10 dark:hover:text-primary">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Students ({students.length})</CardTitle>
          <div className="flex gap-2">
            {selectedRows.length > 0 && (
              <Button size="sm" variant="destructive" onClick={() => setSelectedRows([])}>
                Delete All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border/50 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border text-muted-foreground text-left">
                  <TableHead className="w-12 px-4 py-3">
                    <Checkbox checked={allSelected} onCheckedChange={toggleSelectAll} aria-label="Select all" className="border-primary bg-background dark:bg-background" />
                  </TableHead>
                  <TableHead className="w-12 px-4 py-3">Star</TableHead>
                  <TableHead className="pb-3 font-medium px-4 py-3">Name</TableHead>
                  <TableHead className="pb-3 font-medium px-4 py-3">Email</TableHead>
                  <TableHead className="pb-3 font-medium px-4 py-3">Class</TableHead>
                  <TableHead className="pb-3 font-medium px-4 py-3">Enrollment</TableHead>
                  <TableHead className="pb-3 font-medium px-4 py-3">Status</TableHead>
                  <TableHead className="pb-3 font-medium px-4 py-3">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.map((student) => (
                  <TableRow key={student.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <TableCell className="px-4 py-3">
                      <Checkbox checked={selectedRows.includes(student.id)} onCheckedChange={() => toggleSelectRow(student.id)} className="border-primary bg-background dark:bg-background" />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <button onClick={() => toggleStar(student.id)} aria-label="Star student">
                        <Star className={student.starred ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'} size={16} />
                      </button>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-foreground font-medium">{student.name}</TableCell>
                    <TableCell className="px-4 py-3 text-muted-foreground">{student.email}</TableCell>
                    <TableCell className="px-4 py-3 text-foreground">{student.class}</TableCell>
                    <TableCell className="px-4 py-3 text-muted-foreground">{student.enrollment}</TableCell>
                    <TableCell className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${student.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-600'}`}>
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={e => { e.preventDefault(); setPage(Math.max(1, page - 1)) }}
                    aria-disabled={page === 1}
                  />
                </PaginationItem>
                {Array.from({ length: pageCount }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={page === i + 1}
                      onClick={e => { e.preventDefault(); setPage(i + 1) }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={e => { e.preventDefault(); setPage(Math.min(pageCount, page + 1)) }}
                    aria-disabled={page === pageCount}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
