import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Members() {
  const { isAuthenticated } = useAuth();

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Members Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Members</h1>
            <p className="text-xl text-gray-600">Connect with our community of hand surgery professionals</p>
          </div>

          {/* Login/Member Access */}
          {!isAuthenticated && (
            <div className="max-w-md mx-auto mb-16">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Member Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username or Email</Label>
                    <Input type="text" id="username" placeholder="Enter your username or email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="Enter your password" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <a href="#" className="text-sm text-cssh-blue hover:underline">Forgot password?</a>
                  </div>
                  <Button 
                    onClick={handleLogin}
                    className="w-full bg-cssh-blue hover:bg-blue-700"
                  >
                    Sign In
                  </Button>
                  <div className="text-center">
                    <p className="text-gray-600">Not a member yet?</p>
                    <Button variant="link" className="text-cssh-blue">Apply for Membership</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Member Directory */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Member Directory</h2>
            {!isAuthenticated ? (
              <Card className="bg-gray-50">
                <CardContent className="p-8 text-center">
                  <Lock className="text-4xl text-gray-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Members Only</h3>
                  <p className="text-gray-600 mb-6">Please log in to access the full member directory and contact information.</p>
                  <Button 
                    onClick={handleLogin}
                    className="bg-cssh-blue hover:bg-blue-700"
                  >
                    Log In to View Directory
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <p className="text-gray-600 text-center">Member directory will be displayed here for authenticated users.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Membership Information */}
          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Membership Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-cssh-blue mt-1 flex-shrink-0" />
                    <span>Board certification in Orthopedic Surgery or Plastic Surgery</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-cssh-blue mt-1 flex-shrink-0" />
                    <span>Fellowship training in Hand Surgery</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-cssh-blue mt-1 flex-shrink-0" />
                    <span>Active practice in the Chicago metropolitan area</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="text-cssh-blue mt-1 flex-shrink-0" />
                    <span>Commitment to continuing education and professional development</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <span className="bg-cssh-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">1</span>
                    <span>Submit completed application form with required documentation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-cssh-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">2</span>
                    <span>Provide three professional references from current members</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-cssh-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</span>
                    <span>Application review by membership committee</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-cssh-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">4</span>
                    <span>Attend a society meeting as a guest before final approval</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
