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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Founded to advance the field of hand surgery through education, research, and professional collaboration.</p>
          </div>

          {/* History Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Our History</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  The Chicago Society for Surgery of the Hand (CSSH) was founded in 1978 after Sidney Blair recognized the need to connect hand surgeons working in isolation across Chicago-area institutions. Alongside William Stromberg and Robert
                  Schenck, he established a regional society to foster collaboration, education, and improved patient care. Early meetings were held at the Union League Club with a small group of prominent surgeons, and formal by-laws were later
                  adopted to guide membership and leadership. Key figures like John Bell, Bob Schenck, and William Dawson helped shape the society's early governance. Over the years, CSSH introduced several prestigious lectureships, including the
                  Stromberg, Blair, and Schenck Lectureships to honor pioneers and promote clinical education across the region.
                </p>
                <p>
                  As the society expanded, so did its influence, drawing members from greater Chicago, Rockford, Peoria, and northern Indiana. In 2008, Bob Schenck was named Historian, and the executive board structure evolved to support long-term
                  leadership. By 2017, modernization efforts were underway, including new by-laws, incorporation, and a dedicated website. That same year, the Stromberg Lectureship was renamed the Mason-Stromberg Lectureship to recognize both
                  Stromberg and Michael Mason. The society remains indebted to Bob Schenck for decades of leadership and to Patricia "Dru" Gilbert, whose stewardship helped preserve CSSH's history and guide its financial health into the modern era.
                </p>
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" alt="Medical team meeting" className="rounded-xl shadow-lg w-full h-auto object-cover" />
            </div>
          </div>

          {/* Leadership */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Executive Board</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src="/public/assets/about/Executive Board CSSH/andre_ivy_Duly_Medical_Group.jpg" alt="Dr. Andre Ivy - President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="text-lg font-semibold">Andre Ivy, MD - President</h4>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src="/public/assets/about/Executive Board CSSH/Sonya Agnew, MD - Program Director2.jpg" alt="Dr. Sonya Agnew, MD - President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="text-lg font-semibold">Sonya Agnew, MD - Program Director</h4>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src="/public/assets/about/Executive Board CSSH/Brian_foster_MD.jpg" alt="Dr. Brian Foster, MD- President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="text-lg font-semibold">Brian Foster, MD - Vice President</h4>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src="/public/assets/about/Executive Board CSSH/sam-biafora480.jpg" alt="Dr. Sam Biafora, MD- President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="text-lg font-semibold">Sam Biafora, MD - Secretary</h4>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src="/public/assets/about/Executive Board CSSH/Matthew Bernstein, MD - Treasurer2.jpg" alt="Dr. Matthew Bernstein, MD- President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="text-lg font-semibold">Matthew Bernstein, MD - Treasurer</h4>
                </CardContent>
              </Card>
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
