'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  TrendingUp,
  GitBranch,
  CreditCard,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  User
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Submissions', href: '/admin/submissions', icon: FileText },
  { name: 'Attorneys', href: '/admin/attorneys', icon: Users },
  { name: 'Interactions', href: '/admin/interactions', icon: MessageSquare },
  { name: 'Leads', href: '/admin/leads', icon: TrendingUp },
  { name: 'Routing', href: '/admin/routing', icon: GitBranch },
  { name: 'Billing', href: '/admin/billing', icon: CreditCard },
  { name: 'Settings', href: '/admin/settings', icon: Settings }
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-slate-800"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <span className="ml-3 font-bold text-lg">Vikk AI Admin</span>
        </div>
      </div>

      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-slate-800">
              <h1 className="text-xl font-bold">Vikk AI Admin</h1>
              <p className="text-sm text-slate-400 mt-1">Internal Dashboard</p>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-slate-300" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-slate-400">admin@vikkai.com</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 lg:ml-64">
          <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="search"
                      placeholder="Search attorneys, leads, interactions..."
                      className="pl-10 w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 ml-6">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5 text-slate-600" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>

                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-slate-600" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6 lg:pt-6 pt-20">{children}</main>
        </div>
      </div>
    </div>
  );
}
