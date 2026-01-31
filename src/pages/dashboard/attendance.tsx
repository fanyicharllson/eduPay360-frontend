import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function AttendancePage() {
  const attendance = [
    {
      id: 1,
      student: "Evelyn Harper",
      class: "Form 3A",
      present: 45,
      absent: 3,
      percentage: "94%",
    },
    {
      id: 2,
      student: "Diana Plenty",
      class: "Form 3B",
      present: 43,
      absent: 5,
      percentage: "90%",
    },
    {
      id: 3,
      student: "John Miller",
      class: "Form 2A",
      present: 46,
      absent: 2,
      percentage: "96%",
    },
    {
      id: 4,
      student: "Sarah Johnson",
      class: "Form 1B",
      present: 40,
      absent: 8,
      percentage: "83%",
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground mt-1">
            Track student and staff attendance records
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">
                Total Present
              </p>
              <p className="text-3xl font-bold text-green-500">174</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Absent</p>
              <p className="text-3xl font-bold text-red-500">18</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">
                Attendance Rate
              </p>
              <p className="text-3xl font-bold text-primary">91%</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left">
                    <th className="pb-3 font-medium px-4 py-3">Student</th>
                    <th className="pb-3 font-medium px-4 py-3">Class</th>
                    <th className="pb-3 font-medium px-4 py-3">Present</th>
                    <th className="pb-3 font-medium px-4 py-3">Absent</th>
                    <th className="pb-3 font-medium px-4 py-3">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-foreground font-medium">
                        {record.student}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {record.class}
                      </td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{record.present}</span>
                      </td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span>{record.absent}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {record.percentage}
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
  );
}
