import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, HandMetal } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, user } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/events", label: "Events" },
    { path: "/members", label: "Members" },
    { path: "/news", label: "News" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      window.location.href = "/";
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end py-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-4">
            <div>
              <img src="/src/assets/home/logo_vector_5.png" alt="CSSH Logo" style={{ width: "80%" }} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} className={`flex justify-center text-gray-700 hover:text-cssh-blue font-medium transition-colors duration-200 ${item.label === "Contact" ? "pr-8" : ""}`}>
                <span className={`border-b-2 ${isActive(item.path) ? "border-cssh-blue" : "border-transparent"}`}>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-8">
            {isAuthenticated ? (
              <div className="hidden lg:flex items-end space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user?.firstName || user?.email || "User"}</span>
                <Button onClick={handleLogout} variant="outline" className="border-cssh-blue text-cssh-blue hover:bg-cssh-blue hover:text-white">
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={handleLogin} variant="outline" className="hidden lg:inline-flex border-cssh-blue text-cssh-blue hover:bg-cssh-blue hover:text-white">
                Member Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} className="text-gray-700 hover:text-cssh-blue font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 pt-4">
                    <span className="text-sm text-gray-600 block py-2">Welcome, {user?.firstName || user?.email || "User"}</span>
                    <Button onClick={handleLogout} variant="outline" className="text-left justify-start border-cssh-blue text-cssh-blue hover:bg-cssh-blue hover:text-white">
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <Button onClick={handleLogin} variant="outline" className="text-left justify-start border-t border-gray-200 mt-4 pt-4 border-cssh-blue text-cssh-blue hover:bg-cssh-blue hover:text-white">
                  Member Login
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
