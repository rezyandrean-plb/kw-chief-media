import Link from 'next/link';
import Image from 'next/image';
import CurrentYear from './CurrentYear';

export default function Footer() {
  return (
    <footer className="bg-black text-[#FCEBDC] py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Image
                src="/chief-media-logo-dark.webp"
                alt="KW Singapore Official Gig Economy Vendor"
                width={120}
                height={40}
                className="h-16 w-auto mb-4"
              />
              <p className="text-[#FCEBDC]/70">
                The exclusive curated marketplace for Keller Williams realtors. Connect with verified creatives, photographers, and marketing experts through our official gig economy platform.
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-[#FCEBDC]/70">
              <li><Link href="/vendors" className="hover:text-[#B40101] transition">Browse Vendors</Link></li>
              <li><Link href="/vendor-application" className="hover:text-[#B40101] transition">Become a Vendor</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#B40101] transition">Portfolio</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-[#FCEBDC]/70">
              <li><Link href="/contact" className="hover:text-[#B40101] transition">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-[#B40101] transition">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#FCEBDC]/20 mt-8 pt-8 text-center text-[#FCEBDC]/70">
          <p>&copy; <CurrentYear /> KW Singapore Official Gig Economy Vendor. Exclusive to KW Singapore Realtors.</p>
        </div>
      </div>
    </footer>
  );
} 