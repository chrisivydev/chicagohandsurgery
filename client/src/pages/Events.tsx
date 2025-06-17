import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  credits: string;
  month: string;
  day: string;
}

const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Monthly Educational Meeting",
    description: "\"Advanced Techniques in Microsurgical Reconstruction\" - Dr. Jennifer Adams, Mayo Clinic",
    date: "March 15, 2024",
    time: "6:30 PM - 8:30 PM",
    location: "Northwestern Memorial Hospital",
    credits: "2.0 CME Credits",
    month: "MAR",
    day: "15"
  },
  {
    id: "2",
    title: "Case Presentation Evening",
    description: "Interactive case discussions and peer consultation sessions",
    date: "April 12, 2024",
    time: "7:00 PM - 9:00 PM",
    location: "University of Chicago Medicine",
    credits: "1.5 CME Credits",
    month: "APR",
    day: "12"
  },
  {
    id: "3",
    title: "Annual Spring Symposium",
    description: "Full-day conference featuring latest research and innovations in hand surgery",
    date: "May 18, 2024",
    time: "8:00 AM - 5:00 PM",
    location: "Chicago Marriott Downtown",
    credits: "8.0 CME Credits",
    month: "MAY",
    day: "18"
  }
];

const pastEvents = [
  {
    title: "February Educational Meeting",
    description: "\"Pediatric Hand Surgery: Special Considerations\" - Dr. Michael Rodriguez",
    date: "February 15, 2024",
    attendees: "45 attendees"
  },
  {
    title: "Winter Workshop Series",
    description: "Three-part series on advanced arthroscopic techniques",
    date: "January 2024",
    attendees: "32 attendees"
  }
];

export default function Events() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: async (eventName: string) => {
      await apiRequest("POST", "/api/events/register", { eventName });
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description: "You have been registered for the event.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "Registration Failed",
        description: "Failed to register for the event. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRegister = (eventTitle: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to register for events.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 1000);
      return;
    }
    registerMutation.mutate(eventTitle);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Events & Meetings</h1>
            <p className="text-xl text-gray-600">Stay connected with our educational meetings and professional events</p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
            
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="bg-cssh-blue text-white rounded-lg p-3 text-center min-w-[80px]">
                            <div className="text-sm font-medium">{event.month}</div>
                            <div className="text-2xl font-bold">{event.day}</div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-gray-600 mb-2">{event.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {event.time}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.location}
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {event.credits}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <Button 
                          onClick={() => handleRegister(event.title)}
                          disabled={registerMutation.isPending}
                          className="bg-cssh-blue hover:bg-blue-700"
                        >
                          {registerMutation.isPending ? "Registering..." : "Register"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Event Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Monthly Meetings</h3>
                <p className="text-gray-600 text-sm">Regular educational meetings with guest speakers and case presentations</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">CME Workshops</h3>
                <p className="text-gray-600 text-sm">Hands-on workshops and continuing medical education opportunities</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-cssh-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Annual Conference</h3>
                <p className="text-gray-600 text-sm">Full-day symposium featuring latest research and networking opportunities</p>
              </CardContent>
            </Card>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Recent Past Events</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pastEvents.map((event, index) => (
                <Card key={index} className="bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{event.date}</span>
                      <span className="mx-2">•</span>
                      <span>{event.attendees}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
