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
  DollarSign,
} from "lucide-react";

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  badge?: string;
  children?: NavItem[];
  adminOnly?: boolean;
}

export const getNavItems = (schoolId: string): NavItem[] => [
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    label: "Home",
    href: `/dashboard/${schoolId}`,
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Students",
    children: [
      {
        icon: <Users className="w-4 h-4" />,
        label: "All Students",
        href: `/dashboard/${schoolId}/students`,
      },
      {
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Performance",
        href: `/dashboard/${schoolId}/students/performance`,
      },
    ],
    adminOnly: false,
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    label: "Teachers",
    children: [
      {
        icon: <GraduationCap className="w-4 h-4" />,
        label: "All Teachers",
        href: `/dashboard/${schoolId}/teachers`,
      },
      {
        icon: <BookOpen className="w-4 h-4" />,
        label: "Assignments",
        href: `/dashboard/${schoolId}/teachers/assignments`,
      },
    ],
    adminOnly: true,
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Library",
    href: `/dashboard/${schoolId}/library`,
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Account",
    children: [
      {
        icon: <User className="w-4 h-4" />,
        label: "Profile",
        href: `/dashboard/${schoolId}/account/profile`,
      },
      {
        icon: <User className="w-4 h-4" />,
        label: "Users",
        href: `/dashboard/${schoolId}/account/users`,
        adminOnly: true,
      },
    ],
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Class",
    href: `/dashboard/${schoolId}/classes`,
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Subject",
    href: `/dashboard/${schoolId}/subjects`,
  },
  {
    icon: <FileCheck className="w-5 h-5" />,
    label: "Routine",
    href: `/dashboard/${schoolId}/academics`,
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Attendance",
    href: `/dashboard/${schoolId}/attendance`,
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    label: "Finance",
    href: `/dashboard/${schoolId}/finance`,
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    label: "Exam",
    children: [
      {
        icon: <BarChart3 className="w-4 h-4" />,
        label: "Results",
        href: `/dashboard/${schoolId}/academics`,
      },
      {
        icon: <FileText className="w-4 h-4" />,
        label: "Schedule",
        href: `/dashboard/${schoolId}/academics/schedule`,
      },
    ],
    adminOnly: true,
  },
  {
    icon: <Bell className="w-5 h-5" />,
    label: "Notice",
    href: `/dashboard/${schoolId}/notice`,
  },
  {
    icon: <BusIcon className="w-5 h-5" />,
    label: "Transport",
    href: `/dashboard/${schoolId}/transport`,
    adminOnly: true,
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    label: "Hostel",
    href: `/dashboard/${schoolId}/hostel`,
    adminOnly: true,
  },
];
