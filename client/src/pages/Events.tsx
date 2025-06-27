import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

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

// Helper function to format date for month/day display
const formatDateForDisplay = (dateString: string) => {
  const date = new Date(dateString);
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.getDate().toString(),
  };
};

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
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    speakerName: "",
    speakerTitle: "",
    speakerSpecialty: "",
    speakerImage: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Load events from API
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
        console.log("API Response:", data); // Debug log
        // Ensure we always have an array
        const eventsArray = Array.isArray(data) ? data : [];
        setEvents(eventsArray);
      } catch (error) {
        console.error("Error loading events:", error);
        toast({
          title: "Error Loading Events",
          description: "Failed to load events data.",
          variant: "destructive",
        });
        setEvents([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [toast]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB limit before compression)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);

      // Compress the image before converting to base64
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Set canvas size (max 600x600 to keep file size reasonable)
        const maxSize = 600;
        let { width, height } = img;

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress the image
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to base64 with reduced quality
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.5);
        setImagePreview(compressedDataUrl);
        setNewEvent((prev) => ({ ...prev, speakerImage: compressedDataUrl }));
      };

      img.src = URL.createObjectURL(file);
    }
  };

  const handleAddEvent = async () => {
    try {
      const dateInfo = formatDateForDisplay(newEvent.date);
      const eventData = {
        ...newEvent,
        month: dateInfo.month,
        day: dateInfo.day,
      };

      // Log the size of the request payload
      const requestBody = JSON.stringify(eventData);
      console.log("Add event payload size:", requestBody.length, "characters");
      console.log("Add event payload size in bytes:", new Blob([requestBody]).size, "bytes");

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reload events to get the updated list
      const reloadResponse = await fetch("/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!reloadResponse.ok) {
        throw new Error(`HTTP error! status: ${reloadResponse.status}`);
      }

      const data = await reloadResponse.json();
      const eventsArray = Array.isArray(data) ? data : [];
      setEvents(eventsArray);

      setIsAddEventOpen(false);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        speakerName: "",
        speakerTitle: "",
        speakerSpecialty: "",
        speakerImage: "",
      });
      setSelectedImage(null);
      setImagePreview("");
      toast({
        title: "Event Added",
        description: "The new event has been added successfully.",
      });
    } catch (error) {
      console.error("Error adding event:", error);
      toast({
        title: "Error Adding Event",
        description: "Failed to add the new event.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      speakerName: event.speakerName,
      speakerTitle: event.speakerTitle,
      speakerSpecialty: event.speakerSpecialty,
      speakerImage: event.speakerImage,
    });
    setImagePreview(event.speakerImage);
    setIsEditEventOpen(true);
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent) return;

    try {
      const dateInfo = formatDateForDisplay(newEvent.date);
      const eventData = {
        ...newEvent,
        month: dateInfo.month,
        day: dateInfo.day,
      };

      console.log("Updating event with data:", eventData);

      // Log the size of the request payload
      const requestBody = JSON.stringify(eventData);
      console.log("Request payload size:", requestBody.length, "characters");
      console.log("Request payload size in bytes:", new Blob([requestBody]).size, "bytes");

      const response = await fetch(`/api/events/${editingEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      console.log("Update response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const responseData = await response.json();
      console.log("Update success response:", responseData);

      // Reload events to get the updated list
      const reloadResponse = await fetch("/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!reloadResponse.ok) {
        throw new Error(`HTTP error! status: ${reloadResponse.status}`);
      }

      const data = await reloadResponse.json();
      const eventsArray = Array.isArray(data) ? data : [];
      setEvents(eventsArray);

      setIsEditEventOpen(false);
      setEditingEvent(null);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        speakerName: "",
        speakerTitle: "",
        speakerSpecialty: "",
        speakerImage: "",
      });
      setSelectedImage(null);
      setImagePreview("");
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating event:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : "No stack trace",
      });
      toast({
        title: "Error Updating Event",
        description: error instanceof Error ? error.message : "Failed to update the event.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reload events to get the updated list
      const reloadResponse = await fetch("/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!reloadResponse.ok) {
        throw new Error(`HTTP error! status: ${reloadResponse.status}`);
      }

      const data = await reloadResponse.json();
      const eventsArray = Array.isArray(data) ? data : [];
      setEvents(eventsArray);

      toast({
        title: "Event Deleted",
        description: "The event has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        title: "Error Deleting Event",
        description: "Failed to delete the event.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="events-section" className="min-h-screen bg-white">
      <Navigation />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
            <p className="text-xl text-gray-600">
              In order to attend our lectures you must be a member or the guest of a member. To become a member, click here to fill out an application. Stay connected with our educational meetings and professional events.
            </p>
          </div>

          {/* Add Event Button */}
          <div className="mb-8 flex justify-center">
            <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
              <DialogTrigger asChild>
                <Button className="bg-cssh-blue hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="eventTitle">Event Title</Label>
                    <Input id="eventTitle" value={newEvent.title} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="Enter event title" />
                  </div>
                  <div>
                    <Label htmlFor="eventDescription">Event Description</Label>
                    <Textarea id="eventDescription" value={newEvent.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Enter event description" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventDate">Date</Label>
                      <Input id="eventDate" type="date" value={newEvent.date} onChange={(e) => handleInputChange("date", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="eventTime">Time</Label>
                      <Input id="eventTime" type="time" value={newEvent.time} onChange={(e) => handleInputChange("time", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="eventLocation">Location</Label>
                    <Input id="eventLocation" value={newEvent.location} onChange={(e) => handleInputChange("location", e.target.value)} placeholder="Enter event location" />
                  </div>
                  <div>
                    <Label htmlFor="speakerImage">Speaker Image</Label>
                    <div className="space-y-2">
                      <Input id="speakerImageFile" type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
                      {imagePreview && (
                        <div className="mt-2">
                          <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                        </div>
                      )}
                      <Input id="speakerImage" value={newEvent.speakerImage} onChange={(e) => handleInputChange("speakerImage", e.target.value)} placeholder="Or enter image URL directly" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="speakerName">Speaker Name</Label>
                    <Input id="speakerName" value={newEvent.speakerName} onChange={(e) => handleInputChange("speakerName", e.target.value)} placeholder="Enter speaker name" />
                  </div>
                  <div>
                    <Label htmlFor="speakerTitle">Speaker Title</Label>
                    <Input id="speakerTitle" value={newEvent.speakerTitle} onChange={(e) => handleInputChange("speakerTitle", e.target.value)} placeholder="Enter speaker title" />
                  </div>
                  <div>
                    <Label htmlFor="speakerSpecialty">Speaker Specialty</Label>
                    <Input id="speakerSpecialty" value={newEvent.speakerSpecialty} onChange={(e) => handleInputChange("speakerSpecialty", e.target.value)} placeholder="Enter speaker specialty" />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEvent} className="bg-cssh-blue hover:bg-blue-700">
                      Add Event
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            {events.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No events found.</p>
              </div>
            ) : (
              <div className="space-y-6">
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
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                              <p className="text-gray-600 mb-3">{event.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)} className="flex items-center gap-1">
                                <Edit className="w-4 h-4" />
                                Edit
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Event</AlertDialogTitle>
                                    <AlertDialogDescription>Are you sure you want to delete "{event.title}"? This action cannot be undone.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteEvent(event.id)} className="bg-red-600 hover:bg-red-700">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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

          {/* Edit Event Modal */}
          <Dialog open={isEditEventOpen} onOpenChange={setIsEditEventOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editEventTitle">Event Title</Label>
                  <Input id="editEventTitle" value={newEvent.title} onChange={(e) => handleInputChange("title", e.target.value)} placeholder="Enter event title" />
                </div>
                <div>
                  <Label htmlFor="editEventDescription">Event Description</Label>
                  <Textarea id="editEventDescription" value={newEvent.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="Enter event description" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editEventDate">Date</Label>
                    <Input id="editEventDate" type="date" value={newEvent.date} onChange={(e) => handleInputChange("date", e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="editEventTime">Time</Label>
                    <Input id="editEventTime" type="time" value={newEvent.time} onChange={(e) => handleInputChange("time", e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="editEventLocation">Location</Label>
                  <Input id="editEventLocation" value={newEvent.location} onChange={(e) => handleInputChange("location", e.target.value)} placeholder="Enter event location" />
                </div>
                <div>
                  <Label htmlFor="editSpeakerImage">Speaker Image</Label>
                  <div className="space-y-2">
                    <Input id="editSpeakerImageFile" type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
                    {imagePreview && (
                      <div className="mt-2">
                        <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
                      </div>
                    )}
                    <Input id="editSpeakerImage" value={newEvent.speakerImage} onChange={(e) => handleInputChange("speakerImage", e.target.value)} placeholder="Or enter image URL directly" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="editSpeakerName">Speaker Name</Label>
                  <Input id="editSpeakerName" value={newEvent.speakerName} onChange={(e) => handleInputChange("speakerName", e.target.value)} placeholder="Enter speaker name" />
                </div>
                <div>
                  <Label htmlFor="editSpeakerTitle">Speaker Title</Label>
                  <Input id="editSpeakerTitle" value={newEvent.speakerTitle} onChange={(e) => handleInputChange("speakerTitle", e.target.value)} placeholder="Enter speaker title" />
                </div>
                <div>
                  <Label htmlFor="editSpeakerSpecialty">Speaker Specialty</Label>
                  <Input id="editSpeakerSpecialty" value={newEvent.speakerSpecialty} onChange={(e) => handleInputChange("speakerSpecialty", e.target.value)} placeholder="Enter speaker specialty" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsEditEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateEvent} className="bg-cssh-blue hover:bg-blue-700">
                    Update Event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Footer />
    </div>
  );
}
