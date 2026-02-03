"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calculator, ClipboardList, FileText, Phone, Settings, Home, CheckSquare, Package, MessageCircle } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: "/", label: "الرئيسية", icon: Home },
    { href: "/measurement", label: "القياس", icon: Calculator },
    { href: "/checklist", label: "القوائم", icon: CheckSquare },
    { href: "/jobs", label: "المشاريع", icon: ClipboardList, badge: 3 },
    { href: "/products", label: "المواد", icon: Package },
    { href: "/messages", label: "الرسائل", icon: MessageCircle, badge: 7 },
    { href: "/settings", label: "الإعدادات", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-2 transition-all ${
                  isActive ? "text-amber-600" : "text-gray-600"
                }`}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-xl z-50">
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="w-12 h-12 bg-amber-600 rounded-lg mx-auto flex items-center justify-center">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center px-4 py-3 mx-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-amber-50 text-amber-700 border-amber-200 shadow-md"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="relative">
                    <item.icon className="w-6 h-6" />
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium mt-2 text-center">{item.label}</span>
                  {isActive && <div className="absolute left-0 top-0 w-1 h-full bg-amber-600 rounded-r" />}
                </Link>
              );
            })}
          </div>

          {/* User Profile - Bottom */}
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-600">
              <Phone className="w-5 h-5" />
            </div>
          </div>
        </div>
      </aside>

      {/* Hamburger Menu - Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M6 18l6-6" />
              </svg>
            )}
          </button>

          <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-right font-medium transition-all ${
                    pathname === item.href
                      ? "bg-amber-50 text-amber-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-lg">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
