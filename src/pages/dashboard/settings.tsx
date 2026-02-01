import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Bell, Lock, Users, FileText, Trash2 } from 'lucide-react'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export default function SettingsPage() {
  const { data } = useCurrentUser();
    const user = data?.data;
    const schoolName = user?.name || "User";
    const displayEmail = user?.email || "";
    const phoneNumber = user?.phone || "";
    const location = user?.address || "";
  return (
    <>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your school's settings and preferences</p>
        </div>

        {/* School Information */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>School Information</CardTitle>
            <CardDescription>Update your school's basic information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">School Name</label>
                <Input placeholder="Enter school name" defaultValue={schoolName} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email Address</label>
                <Input placeholder="school@email.com" defaultValue={displayEmail} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
                <Input placeholder="+237 ..." defaultValue={phoneNumber} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                <Input placeholder="City, Country" defaultValue={location} />
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <div>
                <p className="font-medium text-foreground">Payment Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified about new payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-foreground">Marketing Emails</p>
                <p className="text-sm text-muted-foreground">Receive tips and updates</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Change Password</p>
              <p className="text-sm text-muted-foreground mb-4">Update your password regularly for security</p>
              <Button variant="outline">Change Password</Button>
            </div>
            <div className="p-4 bg-muted rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage staff and admin accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {[
                { name: 'Priscilla Lily', role: 'Admin', status: 'Active' },
                { name: 'John Smith', role: 'Teacher', status: 'Active' },
                { name: 'Sarah Johnson', role: 'Staff', status: 'Inactive' },
              ].map((user) => (
                <div key={user.name} className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border/50">
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${user.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-600'}`}>
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full bg-transparent">Add New User</Button>
          </CardContent>
        </Card>

        {/* Billing & Subscription */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Billing & Subscription
            </CardTitle>
            <CardDescription>Manage your subscription plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
              <p className="font-medium text-foreground mb-1">Current Plan: Premium</p>
              <p className="text-sm text-muted-foreground mb-3">Your subscription renews on January 30, 2025</p>
              <Button variant="outline">Manage Subscription</Button>
            </div>
            <div className="p-4 bg-muted rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-3">Billing History</p>
              <Button variant="outline" className="w-full bg-transparent">Download Invoices</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-background rounded-lg border border-destructive/30">
              <p className="font-medium text-foreground mb-2">Delete School Account</p>
              <p className="text-sm text-muted-foreground mb-4">Permanently delete your school account and all associated data</p>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
