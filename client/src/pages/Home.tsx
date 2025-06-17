import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Microscope, Users, BookOpen, Calendar, Newspaper, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cssh-blue"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-cssh-blue to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Welcome to CSSH
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Your gateway to professional development and collaboration in hand surgery.
            </p>
          </div>
        </div>
      </section>

      {/* Member Dashboard */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Member Dashboard</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Link href="/members">
              <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Member Directory</h3>
                  <p className="text-gray-600 text-sm">Find and connect with fellow members</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/events">
              <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
                  <p className="text-gray-600 text-sm">View meetings and conferences</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/news">
              <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Newspaper className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Latest News</h3>
                  <p className="text-gray-600 text-sm">Stay updated with announcements</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/contact">
              <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-white text-2xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                  <p className="text-gray-600 text-sm">Get in touch with our team</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To promote excellence in hand surgery through continuing education, scientific research, and fostering professional relationships among hand surgery specialists in the Chicago metropolitan area.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-cssh-blue rounded-lg flex items-center justify-center mb-6">
                  <GraduationCap className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Education</h3>
                <p className="text-gray-600">Providing cutting-edge educational opportunities and resources for hand surgery professionals.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-cssh-blue rounded-lg flex items-center justify-center mb-6">
                  <Microscope className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Research</h3>
                <p className="text-gray-600">Supporting innovative research initiatives that advance the field of hand surgery.</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-cssh-blue rounded-lg flex items-center justify-center mb-6">
                  <Users className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Community</h3>
                <p className="text-gray-600">Building a strong network of hand surgery professionals in the Chicago area.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
