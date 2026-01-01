import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl hero-gradient">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PropHub</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The centralized marketplace for real estate. Find your dream property from trusted agencies worldwide.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/properties" className="text-muted-foreground transition-colors hover:text-foreground">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-muted-foreground transition-colors hover:text-foreground">
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* For Agencies */}
          <div>
            <h3 className="mb-4 font-semibold">For Agencies</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/signup?type=agency" className="text-muted-foreground transition-colors hover:text-foreground">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Agency Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>123 Real Estate Ave, Miami, FL 33101</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+1-305-555-0100" className="transition-colors hover:text-foreground">
                  +1 (305) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@prophub.com" className="transition-colors hover:text-foreground">
                  info@prophub.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} PropHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-foreground">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
