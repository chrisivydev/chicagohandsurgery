import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const newsArticles = [
  {
    id: "1",
    title: "New CME Requirements for 2024",
    excerpt: "The Illinois Department of Financial and Professional Regulation has updated CME requirements for hand surgery specialists. All members should review the new guidelines to ensure compliance.",
    date: "March 8, 2024",
    category: "Announcements",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: "2",
    title: "CSSH Members Publish Groundbreaking Research",
    excerpt: "Congratulations to Dr. Sarah Johnson and her team for their recent publication in the Journal of Hand Surgery regarding innovative treatments for complex wrist fractures.",
    date: "March 1, 2024",
    category: "Research",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: "3",
    title: "Dr. Chen Receives Excellence in Teaching Award",
    excerpt: "CSSH is proud to announce that Dr. Michael Chen has been recognized with the Excellence in Teaching Award from the American Society for Surgery of the Hand.",
    date: "February 22, 2024",
    category: "Awards",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  }
];

export default function News() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      await apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed Successfully",
        description: "You have been subscribed to our newsletter.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Subscription Failed",
        description: "Failed to subscribe to newsletter. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Announcements</h1>
            <p className="text-xl text-gray-600">Stay informed with the latest updates from CSSH</p>
          </div>

          {/* Featured News */}
          <div className="mb-16">
            <Card className="bg-cssh-blue text-white">
              <CardContent className="p-8 md:p-12">
                <div className="max-w-4xl">
                  <div className="text-sm font-medium mb-4 text-blue-200">FEATURED ANNOUNCEMENT</div>
                  <h2 className="text-3xl font-bold mb-4">2024 Annual Symposium Call for Abstracts</h2>
                  <p className="text-xl text-blue-100 mb-6">
                    We are now accepting abstract submissions for our 2024 Annual Spring Symposium. This year's theme focuses on "Innovation in Hand Surgery: Technology Meets Technique."
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-white text-cssh-blue hover:bg-gray-100">
                      Submit Abstract
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-2 border-white text-white hover:bg-white hover:text-cssh-blue"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent News */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Recent News</h2>
            
            <div className="space-y-8">
              {newsArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-32 h-24 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <span>{article.category}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                        <p className="text-gray-600 mb-4">{article.excerpt}</p>
                        <a href="#" className="text-cssh-blue hover:underline font-medium">Read More →</a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="text-gray-600 mb-6">Subscribe to our newsletter to receive the latest news and updates from CSSH directly in your inbox.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={newsletterMutation.isPending}
                    className="bg-cssh-blue hover:bg-blue-700 whitespace-nowrap"
                  >
                    {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
