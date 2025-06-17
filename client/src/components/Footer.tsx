import { Link } from "wouter";
import { HandMetal, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Organization Info */}
          <div className="col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-cssh-blue rounded-lg flex items-center justify-center">
                <HandMetal className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">CSSH</h3>
                <p className="text-gray-400">Chicago Society for Surgery of the Hand</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Advancing hand surgery excellence through education, research, and professional collaboration in the Chicagoland area.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="text-xl" />
              </a>
              <a href="mailto:info@cssh.us" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><Link href="/members" className="hover:text-white transition-colors duration-200">Membership</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors duration-200">Events</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors duration-200">News</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>150 N. Michigan Avenue<br />Suite 2550<br />Chicago, IL 60611</p>
              <p>(312) 555-0123</p>
              <p>info@cssh.us</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Chicago Society for Surgery of the Hand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
