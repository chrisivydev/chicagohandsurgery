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
  speakerName: string;
  speakerTitle: string;
  speakerSpecialty: string;
  speakerImage: string;
}

const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Schenck Lectureship",
    description: "Multidisciplinary Management of the Mangled Hand",
    date: "October 16, 2024",
    time: "6:30 PM",
    location: "Capital Grille - 633 N. St Clair St, Chicago IL 60611, Valet Available",
    credits: "2.0 CME Credits",
    month: "OCT",
    day: "16",
    speakerName: "Jeffrey B. Friedrich, MD, MC, FACS",
    speakerTitle: "[ROLE]",
    speakerSpecialty: "[SPECIALTY]",
    speakerImage: "/assets/Home/api-bioimage-jeffrey-friedrich.jpg",
  },
  {
    id: "2",
    title: "International Guest Virtual Lecture",
    description: "Soft Tissue coverage in Major Upper Limb Trauma",
    date: "December 11, 2024",
    time: "7:30 PM",
    location: "University of Chicago Medicine",
    credits: "1.5 CME Credits",
    month: "DEC",
    day: "11",
    speakerName: "Dr. S Raja Sabapathy",
    speakerTitle: "[ROLE]",
    speakerSpecialty: "[SPECIALTY]",
    speakerImage: "/assets/Home/Raja Sabapathy - International 2024.jpg",
  },
  {
    id: "3",
    title: "Blair Lectureship",
    description: "Wrist Arthroplasty: Why Can't We Catch Up?",
    date: "February 19, 2025",
    time: "6:30 PM",
    location: "Gibson's Steakhouse - 5464 N River Rd, Rosemont, IL",
    credits: "8.0 CME Credits",
    month: "MAY",
    day: "18",
    speakerName: "Harry Hoyen, MD",
    speakerTitle: "[ROLE]",
    speakerSpecialty: "[SPECIALTY]",
    speakerImage: "/assets/Home/Harry_Hoyen_-_Blair.jpg",
  },
  {
    id: "4",
    title: "Mason-Stromberg Lectureship",
    description: "Wide Awake Hand Surgery: Why Are We Wasting Time In the Operating Room?",
    date: "April 10, 2025",
    time: "6:30 PM",
    location: "Morton's Steakhouse - 65 E. Wacker Pl, Chicago IL",
    credits: "8.0 CME Credits",
    month: "MAY",
    day: "18",
    speakerName: "Asif Ilyas, MD",
    speakerTitle: "[ROLE]",
    speakerSpecialty: "[SPECIALTY]",
    speakerImage: "/assets/Home/Asif Ilyas.jpg",
  },
];

const pastEvents = [
  {
    title: "February Educational Meeting",
    description: '"Pediatric Hand Surgery: Special Considerations" - Dr. Michael Rodriguez',
    date: "February 15, 2024",
    attendees: "45 attendees",
  },
  {
    title: "Winter Workshop Series",
    description: "Three-part series on advanced arthroscopic techniques",
    date: "January 2024",
    attendees: "32 attendees",
  },
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
    <div id="events-section" className="min-h-screen bg-white">
      <Navigation />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
            <p className="text-xl text-gray-600">In order to attend our lectures you must be a member or the guest of a member. To become a member, click here to fill out an application.</p>
            <p className="text-xl text-gray-600">Stay connected with our educational meetings and professional events</p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            {/* <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2> */}

            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Speaker Image */}
                      <div className="flex-shrink-0">
                        <img src={event.speakerImage} alt={event.speakerName} className="w-32 h-32 rounded-lg object-cover shadow-md" />
                        <div className="bg-cssh-blue text-white rounded-lg p-3 mt-4 text-center min-w-[80px] flex-shrink-0">
                          <div className="text-sm font-medium">{event.month}</div>
                          <div className="text-2xl font-bold">{event.day}</div>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-gray-600 mb-3">{event.description}</p>
                          </div>
                        </div>

                        {/* Speaker Information */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-lg text-gray-900 mb-1">{event.speakerName}</h4>
                          <p className="text-gray-700 mb-1">{event.speakerTitle}</p>
                          <p className="text-gray-600 text-sm">{event.speakerSpecialty}</p>
                        </div>

                        {/* Event Details */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {event.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </span>
                          {/* <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.credits}
                          </span> */}
                        </div>

                        {/* Register Button */}
                        <div className="flex justify-end">
                          <Button onClick={() => handleRegister(event.title)} disabled={registerMutation.isPending} className="bg-cssh-blue hover:bg-blue-700">
                            {registerMutation.isPending ? "Registering..." : "Register"}
                          </Button>
                        </div>
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
