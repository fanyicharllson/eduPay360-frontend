import { useState } from "react";
import { useLogout } from "@/hooks/useLogout";
import { queryClient } from "@/lib/react-query";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Bell, Search, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../ui/theme-toggle";
import { MobileTrialBanner, TrialBanner } from "../ui/trial-banner";

export function Header() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New student enrolled", time: "2 minutes ago" },
    { id: 2, message: "Payment received from John Doe", time: "1 hour ago" },
    { id: 3, message: "Exam schedule updated", time: "3 hours ago" },
  ]);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const navigate = useNavigate();
  const logoutMutation = useLogout();
  const { data } = useCurrentUser();
  const user = data?.data;
  const schoolPublicId = user?.schoolPublicId;

  // Get first name or fallback to truncated name
  const displayName = user?.name ? user.name.split(" ")[0] : "User";
  const displayEmail = user?.email || "";

  const handleLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear(); // Clear all React Query cache
        toast.success("Logged out successfully.");
        setLogoutOpen(false);
        navigate("/login");
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Logout failed. Try again.",
        );
      },
    });
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
        {/* Search Bar */}
        <div className="flex-1 hidden md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search anything..."
              className="pl-10 bg-muted border-0 focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* mobile trial banner */}
          <MobileTrialBanner user={user} />

          {/* Mobile Search */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>

          {/* Desktop Trial Banner  */}
          <TrialBanner user={user} className="max-md:hidden" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-muted"
                >
                  <p className="text-sm font-medium">{notif.message}</p>
                  <p className="text-xs text-muted-foreground">{notif.time}</p>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-primary cursor-pointer">
                View all
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                  {displayName.slice(0, 2).toUpperCase()}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
              <p className="text-xs text-muted-foreground px-2 py-1">
                {displayEmail}
              </p>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  to={`/dashboard/${schoolPublicId}/settings/profile`}
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive"
                    onSelect={(e) => {
                      e.preventDefault();
                      setLogoutOpen(true);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to log out?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="secondary"
                      onClick={() => setLogoutOpen(false)}
                      disabled={logoutMutation.isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      disabled={logoutMutation.isPending}
                    >
                      {logoutMutation.isPending ? "Logging out..." : "Logout"}
                    </Button>
                  </DialogFooter>
                  {logoutMutation.isError && (
                    <div className="text-destructive text-sm mt-2">
                      {(() => {
                        const err = logoutMutation.error as any;
                        return (
                          err?.response?.data?.message ||
                          err?.message ||
                          "Logout failed. Try again."
                        );
                      })()}
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
