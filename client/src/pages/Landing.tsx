import Navigation from "@/components/Navigation";
import EventsLanding from "@/pages/EventsLanding";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Microscope, Users, BookOpen, Calendar, Newspaper, Mail, Clock, MapPin } from "lucide-react";
import { assetPath } from "@/lib/utils";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  credits?: string;
  month?: string;
  day?: string;
  speakerName: string;
  speakerTitle: string;
  speakerSpecialty: string;
  speakerImage: string;
}

// Helper function to format date for display (e.g., "December 15, 2024")
const formatDateForDisplayText = (dateString: string) => {
  // Parse the date string properly to avoid timezone issues
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/members";
  };

  const events = () => {
    const eventsSection = document.getElementById("events-section");
    if (eventsSection) {
      const offset = 80; // Adjust this value to control how far from the top it stops
      const elementPosition = eventsSection.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const viewAllEvents = () => {
    window.location.href = "/events";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cssh-blue to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 cssh-blue">Chicago Society for Surgery of the Hand</h1>
              <p className="text-xl cssh-blue mb-8 leading-relaxed">Uniting Hand Surgeons Across Chicago to Share Knowledge, Inspire Innovation, and Improve Patient Care.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={events} className="btn-primary px-8 py-3 bg-cssh-blue hover:bg-gray-400">
                  View Events
                </Button>
                <Button onClick={handleLogin} className="btn-primary px-8 py-3 bg-cssh-blue hover:bg-gray-400">
                  Become a Member
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src={`${assetPath}/home/hero-hand2.png`} alt="Medical professional consultation" className="rounded-xl shadow-2xl w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch mb-12 gap-0 lg:gap-[2rem]">
            {/* Image Section */}
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0 flex justify-center lg:justify-start items-stretch">
              <img src={`${assetPath}/home/surgery.jpg`} alt="Image of a hand surgery" className="h-full w-auto object-contain" style={{ borderRadius: "5%" }} />
            </div>

            {/* Text Section */}
            <div className="text-left lg:w-2/3 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to The Chicago Society for Surgery of the Hand</h2>
              <p className="text-lg text-gray-600" style={{ textAlign: "justify" }}>
                The Chicago Society for Surgery of the Hand is dedicated to advancing the field of hand surgery through ongoing education, professional collaboration, and the promotion of innovative research. Since 1978, we have brought together hand
                surgeons from the Chicago metropolitan area and Rockford, Illinois to foster collegiality, share knowledge, and elevate patient care. Through regular forums, invited lectures, and the annual Sumner Koch award, we honor impactful
                clinical research and support a thriving community committed to excellence in hand surgery.
              </p>
            </div>
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

      <TopEvents />

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

// Component to display top 3 events
function TopEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const eventsArray = Array.isArray(data) ? data : [];
        // Sort by date (newest first) and take only the first 3 events
        const sortedEvents = eventsArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setEvents(sortedEvents.slice(0, 3));
      } catch (error) {
        console.error("Error loading events:", error);
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const viewAllEvents = () => {
    window.location.href = "/events";
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            <p className="text-gray-600 mb-8">No events scheduled at this time.</p>
            <Button onClick={viewAllEvents} className="bg-cssh-blue hover:bg-blue-700">
              View All Events
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <p className="text-xl text-gray-600">Stay connected with our educational meetings and professional events</p>
        </div>

        <div className="space-y-6 mb-8">
          {events.map((event) => (
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
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>

                    {/* Speaker Information */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-lg text-gray-900 mb-1">{event.speakerName}</h4>
                      <p className="text-gray-700 mb-1">{event.speakerTitle}</p>
                      <p className="text-gray-600 text-sm">{event.speakerSpecialty}</p>
                    </div>

                    {/* Event Details */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDateForDisplayText(event.date)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {event.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={viewAllEvents} className="bg-cssh-blue hover:bg-blue-700 px-8 py-3">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
