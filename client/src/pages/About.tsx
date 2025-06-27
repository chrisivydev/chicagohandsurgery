import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { assetPath } from "@/lib/utils";

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
              <h2 className="text-2xl font-bold mb-6">Our Founders</h2>
              <div className="space-y-6">
                {/* <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img src={`${assetPath}/about/Founders/sidney-blair.png`} alt="Dr. Sidney Blair" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Dr. Sidney Blair</h3>
                        <p className="text-gray-600 text-sm">
                          Recognized the need to connect hand surgeons across Chicago-area institutions and initiated the founding of CSSH in 1978. His vision for collaboration and education laid the foundation for the society's mission.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img src={`${assetPath}/about/Founders/bill-stromberg.jpg`} alt="Dr. Sidney Blair" className="w-40 h-40 rounded-lg object-contain flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">William B. Stromberg Jr., MD (“Stromie”)</h3>
                        <p className="text-gray-600 text-sm">
                          Earned his MD from Northwestern University and began teaching at Northwestern Medical School in 1958 alongside Doctors Koch, Mason, and Bell. A specialist in both adult and pediatric hand surgery, he was known as an
                          outstanding teacher and a valued friend. In 1984, he served as the third president of the Chicago Society for Surgery of the Hand.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Dr. Sidney Blair</h3>
                        <p className="text-gray-600 text-sm">
                          Born in Chicago and is credited with the original idea for the Chicago Society for Surgery of the Hand, later serving as its fourth president in 1985. He was a past chairman of the Loyola Department of Orthopaedic Surgery
                          and Rehabilitation and was recognized as an expert in compression disorders of the peripheral nerves and the prevention of industrial hand injuries.
                        </p>
                      </div>
                      <img src={`${assetPath}/about/Founders/sidney-blair.png`} alt="Dr. Sidney Blair" className="w-40 h-40 rounded-lg object-contain flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img src={`${assetPath}/about/Founders/bob-schenk.png`} alt="Dr. Sidney Blair" className="w-40 h-40 rounded-lg object-contain flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Dr. Sidney Blair</h3>
                        <p className="text-gray-600 text-sm">
                          Born in Elmwood, Illinois in 1931 and served as the fifth president of the Chicago Society for Surgery of the Hand in 1986. He was a long-standing treasurer and historian of the organization. As Professor Emeritus in the
                          Hand Surgery Section of the Department of Plastic Surgery at Rush University, he was known for pioneering dynamic traction techniques for intraarticular finger fractures.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Current Executive Board</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src={`${assetPath}/about/Executive Board CSSH/andre_ivy_Duly_Medical_Group.jpg`} alt="Dr. Andre Ivy - President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="text-lg font-semibold">Andre Ivy, MD - President</h4>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src={`${assetPath}/about/Executive Board CSSH/Sonya Agnew, MD - Program Director2.jpg`} alt="Dr. Sonya Agnew, MD - President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="text-lg font-semibold">Sonya Agnew, MD - Program Director</h4>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src={`${assetPath}/about/Executive Board CSSH/Brian_foster_MD.jpg`} alt="Dr. Brian Foster, MD- President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="text-lg font-semibold">Brian Foster, MD - Vice President</h4>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src={`${assetPath}/about/Executive Board CSSH/sam-biafora480.jpg`} alt="Dr. Sam Biafora, MD- President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                  <h4 className="text-lg font-semibold">Sam Biafora, MD - Secretary</h4>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <img src={`${assetPath}/about/Executive Board CSSH/Matthew Bernstein, MD - Treasurer2.jpg`} alt="Dr. Matthew Bernstein, MD- President" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
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
