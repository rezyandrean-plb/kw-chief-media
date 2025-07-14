import Link from "next/link";
import { 
  UserGroupIcon, 
  DocumentTextIcon,
  CameraIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import CurrentYear from "../components/CurrentYear";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      <header className="w-full max-w-4xl flex flex-col items-center gap-4 mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheckIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white">Chief Media</h1>
        </div>
        <p className="text-base sm:text-lg md:text-xl text-center text-gray-600 dark:text-gray-300 max-w-2xl px-4">
          The <span className="font-semibold">exclusive curated marketplace</span> for Keller Williams realtors. 
          Connect with verified creatives, photographers, and marketing experts.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4">
          <div className="flex items-center gap-1">
            <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
            <span>Exclusive to KW Realtors</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-1">
            <span>Verified Vendors Only</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-1">
            <span>Quality Guaranteed</span>
          </div>
        </div>
        <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full max-w-sm sm:max-w-none justify-center">
          <Link href="/vendors" className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium text-center">
            Browse Vendors
          </Link>
          <Link href="/vendor-application" className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition font-medium text-center">
            Become a Vendor
          </Link>
        </nav>
      </header>

      <main className="w-full max-w-6xl flex flex-col gap-12 sm:gap-16 items-center">
        {/* How It Works */}
        <section className="w-full px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            How Chief Media Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Curated Vendors</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                We carefully select and verify the best creatives, photographers, and marketing experts.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Direct Connection</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Isabelle matches you with the perfect vendor and creates a direct WhatsApp group.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Quality Delivery</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Get professional results with our 50% deposit, 50% completion payment structure.
              </p>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="w-full px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Vendor Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CameraIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Photography</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Professional real estate photography and virtual tours
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <VideoCameraIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Videography</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Property videos, drone footage, and marketing content
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Copywriting</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Compelling property descriptions and marketing copy
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 sm:p-6 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Social Media</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Social media management and content creation
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Chief Media */}
        <section className="w-full px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Why Choose Chief Media?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                For KW Realtors
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Exclusive Access</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Curated vendors exclusively for KW agents</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Quality Guaranteed</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">All vendors pre-screened and verified</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Direct Communication</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Work directly with vendors via WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Secure Payments</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">50% deposit, 50% upon completion</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/vendors" className="bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition font-medium text-sm sm:text-base">
                  Browse Vendors
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                For Vendors
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Exclusive Market</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Access to KW&apos;s extensive realtor network</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Fair Revenue Split</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">85% vendor, 15% platform fee</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Direct Client Contact</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Work directly with clients, not through platform</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Quality Standards</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Maintain high standards, build reputation</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href="/vendor-application" className="bg-green-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition font-medium text-sm sm:text-base">
                  Apply to Join
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Preview */}
        <section className="w-full px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
            Recent Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="h-32 sm:h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <CameraIcon className="h-8 w-8 sm:h-16 sm:w-16 text-white" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Luxury Home Photography</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4">
                  Professional photography for a $2.5M luxury property in Orchard Road
                </p>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span>Photography</span>
                  <span className="mx-2">•</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="h-32 sm:h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <VideoCameraIcon className="h-8 w-8 sm:h-16 sm:w-16 text-white" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Property Video Tour</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4">
                  Cinematic video tour with drone footage for modern townhouse in Marina Bay
                </p>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span>Videography</span>
                  <span className="mx-2">•</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden sm:col-span-2 lg:col-span-1">
              <div className="h-32 sm:h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <DocumentTextIcon className="h-8 w-8 sm:h-16 sm:w-16 text-white" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Marketing Copy</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-4">
                  Compelling property descriptions and social media content for Sentosa properties
                </p>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <span>Copywriting</span>
                  <span className="mx-2">•</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link href="/portfolio" className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
              View Full Portfolio →
            </Link>
          </div>
        </section>

        {/* Contact Isabelle */}
        <section className="w-full bg-blue-600 rounded-lg p-6 sm:p-8 text-center mx-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Whether you&apos;re a KW realtor looking for quality vendors or a creative professional wanting to join our exclusive network, 
            Isabelle is here to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              Contact Isabelle
            </Link>
            <Link
              href="/vendor-application"
              className="border border-white text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Apply as Vendor
            </Link>
          </div>
        </section>
      </main>

      <footer className="mt-12 sm:mt-16 text-gray-400 text-xs sm:text-sm text-center px-4">
        <p>&copy; <CurrentYear /> Chief Media. Exclusive to Keller Williams Realtors.</p>
        <div className="mt-2 space-x-2 sm:space-x-4">
          <Link href="/vendors" className="hover:text-gray-300 transition">Browse Vendors</Link>
          <Link href="/vendor-application" className="hover:text-gray-300 transition">Become a Vendor</Link>
          <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
