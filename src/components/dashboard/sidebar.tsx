import { useState } from "react";
import { Settings, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { navItems, type NavItem } from "@/lib/navitems";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  // Expand parent dropdown if a nested route is active
  const location = useLocation();
  const pathname = location.pathname;
  const getActiveParents = (
    items: NavItem[],
    parents: string[] = [],
  ): string[] => {
    for (const item of items) {
      if (item.href && pathname === item.href) {
        return parents;
      }
      if (item.children) {
        const found = getActiveParents(item.children, [...parents, item.label]);
        if (found.length) return found;
      }
    }
    return [];
  };

  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    const activeParents = getActiveParents(navItems);
    return activeParents.length ? activeParents : ["Home"];
  });
  // const location = useLocation();
  // const pathname = location.pathname;
  const userRole = "admin"; // TODO: Get from auth context

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const renderNavItems = (items: NavItem[], depth = 0) => {
    return items
      .filter((item) => !item.adminOnly || userRole === "admin")
      .map((item) => {
        const isExpanded =
          expandedItems.includes(item.label) ||
          (item.children &&
            item.children.some((child) => child.href === pathname));
        const hasChildren = item.children && item.children.length > 0;
        // Only highlight as active if this exact item is active (not just any child)
        const isActive = pathname === item.href;
        // Highlight parent if any child is active
        const isChildActive = item.children?.some(
          (child) => pathname === child.href,
        );

        const content = (
          <span className="w-full flex items-center gap-3">
            <span
              className={cn(
                "transition-colors",
                isActive
                  ? "text-primary"
                  : isChildActive
                    ? "text-primary/80"
                    : "group-hover:text-primary",
              )}
            >
              {item.icon}
            </span>
            <span
              className={cn(
                "font-medium flex-1 text-left",
                isActive
                  ? "text-primary"
                  : isChildActive
                    ? "text-primary/80"
                    : "",
              )}
            >
              {item.label}
            </span>
            {hasChildren && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isExpanded ? "rotate-180" : "",
                )}
              />
            )}
            {item.badge && (
              <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </span>
        );

        // If item has children, render as button to expand/collapse
        if (hasChildren) {
          return (
            <div key={item.label}>
              <button
                onClick={() => toggleExpand(item.label)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
                  depth > 0 ? "pl-8 text-sm" : "",
                  isActive
                    ? "bg-primary/20 border-l-4 border-primary text-primary"
                    : isChildActive
                      ? "bg-primary/10 border-l-4 border-primary/50 text-primary/80"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                type="button"
              >
                {content}
              </button>
              {/* Nested Items */}
              {isExpanded && (
                <div className="ml-2 border-l border-border/30 pl-0">
                  {item.children && renderNavItems(item.children, depth + 1)}
                </div>
              )}
            </div>
          );
        }

        // If item has href, render as Link
        return (
          <Link
            key={item.label}
            to={item.href || "#"}
            onClick={() => setIsOpen(false)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
              depth > 0 ? "pl-8 text-sm" : "",
              isActive
                ? "bg-primary/20 border-l-4 border-primary text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {content}
          </Link>
        );
      });
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 lg:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-card border-r border-border transition-all duration-300 z-40 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/40 transition-all">
              <span className="text-sm font-bold text-white">EP</span>
            </div>
            <span className="font-bold text-lg text-foreground">EduPay360</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 pb-32 overflow-y-auto max-h-[calc(100vh-180px)]">
          {renderNavItems(navItems)}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-2 bg-card">
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground px-4 py-2">v1.0.0</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
