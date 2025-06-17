import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully. We'll get back to you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Failed to Send",
        description: "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">Get in touch with the CSSH team</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="membership">Membership Information</SelectItem>
                          <SelectItem value="events">Events and Meetings</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        rows={5} 
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full bg-cssh-blue hover:bg-blue-700"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Office Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Office Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-cssh-blue text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Mailing Address</p>
                      <p className="text-gray-600">
                        Chicago Society for Surgery of the Hand<br />
                        150 N. Michigan Avenue, Suite 2550<br />
                        Chicago, IL 60611
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="text-cssh-blue text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">(312) 555-0123</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="text-cssh-blue text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@cssh.us</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="text-cssh-blue text-lg mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Staff Directory */}
              <Card>
                <CardHeader>
                  <CardTitle>Staff Directory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <p className="font-medium">Lisa Thompson</p>
                    <p className="text-cssh-blue text-sm">Executive Director</p>
                    <p className="text-gray-600 text-sm">lisa@cssh.us</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <p className="font-medium">Mark Johnson</p>
                    <p className="text-cssh-blue text-sm">Membership Coordinator</p>
                    <p className="text-gray-600 text-sm">membership@cssh.us</p>
                  </div>
                  <div>
                    <p className="font-medium">Patricia Williams</p>
                    <p className="text-cssh-blue text-sm">Events Manager</p>
                    <p className="text-gray-600 text-sm">events@cssh.us</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href="#" className="block text-cssh-blue hover:underline">Membership Application</a>
                  <a href="#" className="block text-cssh-blue hover:underline">Event Registration</a>
                  <a href="#" className="block text-cssh-blue hover:underline">CME Information</a>
                  <a href="#" className="block text-cssh-blue hover:underline">Resource Library</a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
