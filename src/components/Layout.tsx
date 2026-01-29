import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { Home, Calendar, Users, Activity, Bell, Menu, X, TrendingUp, Award } from 'lucide-react';
import { useState } from 'react';
import { UserType } from '../App';

interface LayoutProps {
  children: ReactNode;
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export default function Layout({ children, userType, setUserType }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const psychologistNavItems = [
    { path: '/psychologist/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/psychologist/monitoring', icon: TrendingUp, label: 'Monitoring' },
    { path: '/psychologist/agenda', icon: Calendar, label: 'Agenda' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  const patientNavItems = [
    { path: '/patient/home', icon: Home, label: 'Home' },
    { path: '/patient/evaluation', icon: Activity, label: 'Evaluation' },
    { path: '/patient/achievements', icon: Award, label: 'Achievements' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
  ];

  const navItems = userType === 'psychologist' ? psychologistNavItems : patientNavItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#7ED957] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">MindGo</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#4A90E2] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Type Switcher (Demo Only) */}
            <div className="hidden md:flex items-center space-x-2">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              >
                <option value="psychologist">Psychologist View</option>
                <option value="patient">Patient View</option>
              </select>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#4A90E2] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-200">
                <select
                  value={userType}
                  onChange={(e) => {
                    setUserType(e.target.value as UserType);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                >
                  <option value="psychologist">Psychologist View</option>
                  <option value="patient">Patient View</option>
                </select>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}