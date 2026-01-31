import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MoreHorizontal, Edit, Trash2, Eye, Download, Mail } from 'lucide-react'
import { toast } from 'sonner'

// Star Students Data
const starStudentsData = [
  { id: '1', name: 'Evelyn Harper', studentId: 'PRE43178', marks: 1185, percent: 98 },
  { id: '2', name: 'Diana Plenty', studentId: 'PRE43174', marks: 1165, percent: 91 },
  { id: '3', name: 'John Miller', studentId: 'PRE43187', marks: 1175, percent: 92 },
  { id: '4', name: 'Sarah Johnson', studentId: 'PRE43190', marks: 1190, percent: 99 },
  { id: '5', name: 'Michael Brown', studentId: 'PRE43195', marks: 1155, percent: 88 },
]

// Exam Results Data
const examResultsData = [
  { id: '1', student: 'John Doe', exam: 'Mathematics', score: 85, grade: 'A', date: '2024-01-15', status: 'Passed' },
  { id: '2', student: 'Jane Smith', exam: 'English', score: 92, grade: 'A+', date: '2024-01-14', status: 'Passed' },
  { id: '3', student: 'Mike Johnson', exam: 'Science', score: 78, grade: 'B', date: '2024-01-13', status: 'Passed' },
  { id: '4', student: 'Emma Wilson', exam: 'History', score: 88, grade: 'A', date: '2024-01-12', status: 'Passed' },
  { id: '5', student: 'Alex Taylor', exam: 'Computer', score: 95, grade: 'A+', date: '2024-01-11', status: 'Passed' },
]

export function StarStudentsTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const allSelected = selectedRows.length === starStudentsData.length && starStudentsData.length > 0
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([])
    } else {
      setSelectedRows(starStudentsData.map(item => item.id))
    }
  }

  const toggleSelectRow = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleAction = (action: string, id: string) => {
    toast.success(`${action} action performed on student ${id}`)
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Star Students</CardTitle>
        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => { setSelectedRows([]); /* Add delete logic here */ }}
            >
              Delete
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="dark:hover:bg-primary/10 dark:hover:text-primary"
            onClick={() => window.location.href = '/dashboard/students'}
          >
            See All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                    className="border-primary bg-background dark:bg-background"
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead className="text-right">Marks</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {starStudentsData.slice(0, 5).map((student) => (
                <TableRow key={student.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(student.id)}
                      onCheckedChange={() => toggleSelectRow(student.id)}
                      className="border-primary bg-background dark:bg-background"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{student.studentId}</TableCell>
                  <TableCell className="text-right text-foreground font-semibold">{student.marks}</TableCell>
                  <TableCell className="text-right">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">
                      {student.percent}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('View', student.id)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Edit', student.id)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Download', student.id)} className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAction('Delete', student.id)} className="cursor-pointer text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
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
      </CardContent>
    </Card>
  )
}

export function ExamResultsTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const allSelected = selectedRows.length === examResultsData.length && examResultsData.length > 0
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([])
    } else {
      setSelectedRows(examResultsData.map(item => item.id))
    }
  }

  const toggleSelectRow = (id: string) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-green-500/20 text-green-600 dark:text-green-400'
      case 'B':
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
      case 'C':
        return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
      default:
        return 'bg-gray-500/20 text-gray-600 dark:text-gray-400'
    }
  }

  const handleAction = (action: string, id: string) => {
    toast.success(`${action} action performed on exam result ${id}`)
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>All Exam Results</CardTitle>
        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => { setSelectedRows([]); /* Add delete logic here */ }}
            >
              Delete All
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="dark:hover:bg-primary/10 dark:hover:text-primary"
            onClick={() => window.location.href = '/dashboard/students'}
          >
            See All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                    className="border-primary bg-background dark:bg-background"
                  />
                </TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examResultsData.slice(0, 5).map((result) => (
                <TableRow key={result.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(result.id)}
                      onCheckedChange={() => toggleSelectRow(result.id)}
                      className="border-primary bg-background dark:bg-background"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{result.student}</TableCell>
                  <TableCell className="text-muted-foreground">{result.exam}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground">{result.score}</TableCell>
                  <TableCell className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">
                      {result.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">{result.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('View', result.id)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Edit', result.id)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Grade
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Email', result.id)} className="cursor-pointer">
                          <Mail className="mr-2 h-4 w-4" />
                          Send to Student
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('Download', result.id)} className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Certificate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleAction('Delete', result.id)} className="cursor-pointer text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
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
      </CardContent>
    </Card>
  )
}
