import {
  LayoutGrid,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  BarChart3,
  Clock,
  BusIcon,
  Building2,
  Bell,
  FileCheck,
  User,
} from "lucide-react";

export interface NavItem {
  icon: React.ReactNode
  label: string
  href?: string
  badge?: string
  children?: NavItem[]
  adminOnly?: boolean
}

export const navItems: NavItem[] = [
  { icon: <LayoutGrid className="w-5 h-5" />, label: 'Home', href: '/dashboard' },
  {
    icon: <Users className="w-5 h-5" />,
    label: 'Students',
    children: [
      { icon: <Users className="w-4 h-4" />, label: 'All Students', href: '/dashboard/students' },
      { icon: <BarChart3 className="w-4 h-4" />, label: 'Performance', href: '/dashboard/students/performance' },
    ],
    adminOnly: false,
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    label: 'Teachers',
    children: [
      { icon: <GraduationCap className="w-4 h-4" />, label: 'All Teachers', href: '/dashboard/teachers' },
      { icon: <BookOpen className="w-4 h-4" />, label: 'Assignments', href: '/dashboard/teachers/assignments' },
    ],
    adminOnly: true,
  },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Library', href: '/dashboard/classes' },
  {
    icon: <FileText className="w-5 h-5" />,
    label: 'Account',
    children: [
      { icon: <User className="w-4 h-4" />, label: 'Profile', href: '/dashboard/account/profile' },
      { icon: <User className="w-4 h-4" />, label: 'Users', href: '/dashboard/account/users', adminOnly: true },
    ],
  },
  { icon: <BookOpen className="w-5 h-5" />, label: 'Class', href: '/dashboard/classes' },
  { icon: <FileText className="w-5 h-5" />, label: 'Subject', href: '/dashboard/subjects' },
  { icon: <FileCheck className="w-5 h-5" />, label: 'Routine', href: '/dashboard/academics' },
  { icon: <Clock className="w-5 h-5" />, label: 'Attendance', href: '/dashboard/attendance' },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    label: 'Exam',
    children: [
      { icon: <BarChart3 className="w-4 h-4" />, label: 'Results', href: '/dashboard/academics' },
      { icon: <FileText className="w-4 h-4" />, label: 'Schedule', href: '/dashboard/academics/schedule' },
    ],
    adminOnly: true,
  },
  { icon: <Bell className="w-5 h-5" />, label: 'Notice', href: '/dashboard/notice' },
  { icon: <BusIcon className="w-5 h-5" />, label: 'Transport', href: '/dashboard/transport', adminOnly: true },
  { icon: <Building2 className="w-5 h-5" />, label: 'Hostel', href: '/dashboard/hostel', adminOnly: true },
]