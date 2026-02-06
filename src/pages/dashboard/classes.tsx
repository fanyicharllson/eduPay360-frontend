import { useState } from "react"
import { useParams } from "react-router-dom"
import { useClasses, useCreateClass, useDeleteClass } from "@/hooks/useClasses"
import { useTeachers } from "@/hooks/useTeacher"
import { EmptyState } from "@/components/ui/empty-state"
import { CongratsModal } from "@/components/ui/congrats-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  MoreVertical,
  Users,
  Pencil,
  Trash2,
  DoorOpen,
  GraduationCap,
  BookOpen,
  Calendar,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Form validation schema
const addClassSchema = z.object({
  name: z.string().min(2, "Class name must be at least 2 characters"),
  academicYear: z.string().min(1, "Please select an academic year"),
  classTeacherId: z.string().optional(),
  room: z.string().optional(),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1").max(100, "Capacity cannot exceed 100"),
  clientClassId: z.string().optional(),
})

type AddClassFormValues = z.infer<typeof addClassSchema>


const academicYears = ["2023/2024", "2024/2025", "2025/2026"]

export default function ClassesPage() {
  const deleteClassMutation = useDeleteClass();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<{ publicId: string, name: string } | null>(null);

  const { schoolId } = useParams<{ schoolId: string }>()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCongrats, setShowCongrats] = useState(false)

  // Fetch classes and teachers
  const { data: classesData, isLoading: classesLoading } = useClasses()
  // Skeleton loader only shows while loading
  const showSkeleton = classesLoading;
  const { data: teachersData, isLoading: teachersLoading } = useTeachers()
  const createClassMutation = useCreateClass()

  const form = useForm<AddClassFormValues>({
    resolver: zodResolver(addClassSchema) as any,
    defaultValues: {
      name: "",
      academicYear: "",
      classTeacherId: "",
      room: "",
      capacity: 40,
      clientClassId: "",
    },
  })

  // API-ready submit handler
  async function onSubmit(data: AddClassFormValues) {
    setIsSubmitting(true)
    try {
      await createClassMutation.mutateAsync({
        name: data.name,
        academicYear: data.academicYear,
        classTeacherId: data.classTeacherId ? parseInt(data.classTeacherId) : undefined,
        room: data.room || undefined,
        capacity: data.capacity,
        clientClassId: data.clientClassId || undefined,
      })
      setIsAddDialogOpen(false)
      form.reset()
      setShowCongrats(true)
    } catch (error) {
      // error handled by mutation
    } finally {
      setIsSubmitting(false)
    }
  }

  // API-ready delete handler
  function handleDelete(publicId: string, name: string) {
    setClassToDelete({ publicId, name });
    setDeleteDialogOpen(true);
  }

  function confirmDelete() {
    if (classToDelete) {
      deleteClassMutation.mutate(classToDelete.publicId, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setClassToDelete(null);
        },
        onError: () => {
          setDeleteDialogOpen(false);
        },
      });
    }
  }

  // Placeholder handlers for navigation/actions
  function handleViewStudents(classId: number) {
    // TODO: Navigate to students page filtered by class
    // router.push(`/students?classId=${classId}`)
    console.log("View students for class:", classId)
  }

  function handleEditClass(classId: number) {
    // TODO: Open edit modal or navigate to edit page
    console.log("Edit class:", classId)
  }

  function getCapacityColor(students: number, capacity: number) {
    const ratio = students / capacity
    if (ratio >= 1) return "destructive"
    if (ratio >= 0.8) return "secondary"
    return "outline"
  }

  return (
    <>
      <CongratsModal
        open={showCongrats}
        onOpenChange={setShowCongrats}
        lottieSrc={"/lottie/success.lottie"}
        title="Class Added Successfully!"
        message="Your new class has been created."
      />
      <div className="bg-background">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Classes</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your school classes, assignments, and student enrollment
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="text-white gap-2 w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-125">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Add New Class
                </DialogTitle>
                <DialogDescription>
                  Create a new class for your school. Fill in the details below.
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Class Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Form 1A, Grade 6B" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="academicYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Academic Year <span className="text-destructive">*</span>
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {academicYears.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Capacity <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="number" min={1} max={100} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="classTeacherId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Teacher</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={teachersLoading || !teachersData?.data?.length}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={
                                teachersLoading
                                  ? "Loading teachers..."
                                  : !teachersData?.data?.length
                                    ? "No teachers available"
                                    : "Assign a teacher (optional)"
                              } />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teachersData?.data?.length ? (
                              teachersData.data.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                  {teacher.name}
                                </SelectItem>
                              ))
                            ) : null}
                          </SelectContent>
                        </Select>
                        {/* Show Add Teachert */}
                        {!teachersLoading && (!teachersData?.data?.length) && (
                          <div className="flex items-center justify-center text-sm text-muted-foreground">
                            No teachers to assign. <Button
                              variant="link"
                              className="p-0 h-auto text-primary font-semibold underline ml-1"
                              onClick={() => {
                                setIsAddDialogOpen(false)
                                // TODO: navigate to add teacher page
                              }}
                            >Click here to add.</Button>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="room"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room / Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Building A - Room 101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="clientClassId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class ID (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your internal class reference" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                      disabled={isSubmitting}
                      className="hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="text-white"
                      disabled={isSubmitting}
                      variant={"secondary"}
                    >
                      {isSubmitting ? "Creating..." : "Create Class"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Summary */}
        {showSkeleton ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10" />
                    <div>
                      <Skeleton className="h-8 w-20 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (classesData?.data?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {classesData?.data?.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Classes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {classesData?.data?.reduce((sum, c) => sum + (c.studentCount ?? 0), 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {new Set(classesData?.data?.map((c) => c.classTeacherId)).size}
                    </p>
                    <p className="text-sm text-muted-foreground">Teachers Assigned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">2024/2025</p>
                    <p className="text-sm text-muted-foreground">Academic Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null)}

      {/* Classes Grid or Skeleton/Empty State */}
      {showSkeleton ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-5">
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
              <CardFooter className="px-5 py-3 border-t border-border/50 bg-muted/30">
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : classesData?.data?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classesData?.data?.map((cls) => (
            <Card
              key={cls.id}
              className="border-border/50 hover:border-purple-500/50 hover:shadow-md transition-all group"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-purple-600 transition-colors">
                      {cls.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{cls.publicId}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewStudents(cls.id)}>
                        <Users className="w-4 h-4 mr-2" />
                        View Students
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditClass(cls.id)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit Class
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(cls.publicId, cls.name)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Class
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-foreground">{cls.studentCount}</span>
                    <span>/ {cls.capacity} students</span>
                    <Badge variant={getCapacityColor(cls.studentCount, cls.capacity)} className="ml-auto text-xs">
                      {Math.round((cls.studentCount / cls.capacity) * 100)}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>{cls.classTeacherName || "Unassigned"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DoorOpen className="w-4 h-4 text-amber-600" />
                    <span>{cls.room || "Not assigned"}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-5 py-3 border-t border-border/50 bg-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  onClick={() => handleViewStudents(cls.id)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  View Students
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Classes Yet"
          message="Get started by creating your first class. We recommend adding teachers before assigning them to classes."
          lottieSrc="/lottie/get-started.lottie"
          actions={
            <Button onClick={() => setIsAddDialogOpen(true)} variant="secondary" className="text-white gap-2">
              <Plus className="w-4 h-4" />
              Add Class
            </Button>
          }
        />
      )}
      </div>
      {/* Delete Confirmation Dialog (only once, not per class) */}
      <Dialog open={deleteDialogOpen} onOpenChange={(open) => {
        if (!deleteClassMutation.isPending) setDeleteDialogOpen(open);
      }}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle>Delete Class</DialogTitle>
          </DialogHeader>
          <p className="mb-4">Are you sure you want to delete <span className="font-semibold text-destructive">{classToDelete?.name}</span>? This action cannot be undone.</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleteClassMutation.isPending}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteClassMutation.isPending}>
              {deleteClassMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
