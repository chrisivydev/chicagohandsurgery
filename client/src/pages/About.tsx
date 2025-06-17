import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About CSSH</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded to advance the field of hand surgery through education, research, and professional collaboration.
            </p>
          </div>

          {/* History Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Our History</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  The Chicago Society for Surgery of the Hand was established to bring together the finest hand surgery specialists in the Chicagoland area. Our organization has been at the forefront of advancing hand surgery techniques and patient care for decades.
                </p>
                <p>
                  Through our commitment to excellence in education and research, we have become a respected voice in the hand surgery community, contributing to improved patient outcomes and surgical innovations.
                </p>
                <p>
                  Today, CSSH continues to serve as a vital resource for hand surgery professionals, providing continuing education opportunities, fostering research initiatives, and maintaining the highest standards of patient care.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Medical team meeting" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Leadership */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                  alt="Dr. Sarah Johnson - President" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">Dr. Sarah Johnson</h3>
                <p className="text-cssh-blue font-medium">President</p>
                <p className="text-gray-600 text-sm mt-2">Northwestern Medicine</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                  alt="Dr. Michael Chen - Vice President" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">Dr. Michael Chen</h3>
                <p className="text-cssh-blue font-medium">Vice President</p>
                <p className="text-gray-600 text-sm mt-2">University of Chicago Medicine</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                  alt="Dr. Emily Rodriguez - Secretary" 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">Dr. Emily Rodriguez</h3>
                <p className="text-cssh-blue font-medium">Secretary</p>
                <p className="text-gray-600 text-sm mt-2">Rush University Medical Center</p>
              </div>
            </div>
          </div>

          {/* Membership Benefits */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Membership Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-cssh-blue text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Continuing Education</h3>
                    <p className="text-gray-600">Access to monthly educational meetings and CME credits</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-cssh-blue text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Professional Network</h3>
                    <p className="text-gray-600">Connect with leading hand surgery specialists</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-cssh-blue text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Research Opportunities</h3>
                    <p className="text-gray-600">Participate in collaborative research projects</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-cssh-blue text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Annual Conference</h3>
                    <p className="text-gray-600">Exclusive access to our annual symposium</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-cssh-blue text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Resource Library</h3>
                    <p className="text-gray-600">Access to exclusive publications and resources</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-cssh-blue text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Mentorship Program</h3>
                    <p className="text-gray-600">Connect with experienced mentors and mentees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
