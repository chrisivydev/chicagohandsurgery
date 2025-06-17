import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Microscope, Users, BookOpen, Calendar, Newspaper, Mail } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cssh-blue to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                Chicago Society for Surgery of the Hand
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Advancing hand surgery excellence through education, research, and professional collaboration in the Chicagoland area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleLogin}
                  className="bg-white text-cssh-blue px-8 py-3 hover:bg-gray-100"
                >
                  Become a Member
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-cssh-blue"
                >
                  View Events
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Medical professional consultation" 
                className="rounded-xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
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

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Member Directory</h3>
                <p className="text-gray-600 text-sm">Find and connect with fellow members</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
                <p className="text-gray-600 text-sm">View meetings and conferences</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Latest News</h3>
                <p className="text-gray-600 text-sm">Stay updated with announcements</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p className="text-gray-600 text-sm">Get in touch with our team</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
