import Link from 'next/link';
import { 
  FiGlobe, 
  FiAward, 
  FiEye,
  FiTarget,
  FiHeart, 
  FiShield,
  FiGlobe as FiWorld,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiPlay
} from 'react-icons/fi';
import { 
  FaLeaf, 
  FaFlask, 
  FaDna, 
  FaMicroscope,
  FaFish,
  FaEgg,
  FaPiggyBank
} from 'react-icons/fa';
import { FaCow } from 'react-icons/fa6';

export default function Home() {

  return (
    <div>
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background with Multiple Layers */}
        <div className="absolute inset-0">
          {/* Primary background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse-slow"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')`
            }}
          ></div>
          
          {/* Animated overlay patterns */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/85 to-green-800/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-green-800/30"></div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-green-300/40 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-300/40 rounded-full animate-float-slow"></div>
            <div className="absolute top-60 right-1/3 w-2 h-2 bg-white/20 rounded-full animate-float"></div>
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-6xl">
            <div className="animate-fade-in">
              {/* Enhanced Typography */}
              <div className="mb-8">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                  <span className="text-white/90 text-sm font-medium">Trusted by 20+ Countries Worldwide</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
                    Empowering Animal Health
                  </span>
                  <br />
                  <span className="text-4xl md:text-6xl font-light text-green-200">
                    — Naturally, Scientifically
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl leading-relaxed">
                  Revolutionary <span className="text-green-300 font-semibold">Herbal Feed Supplements</span> for 
                  <span className="text-purple-300 font-semibold"> Poultry</span> | 
                  <span className="text-blue-300 font-semibold"> Aqua</span> | 
                  <span className="text-yellow-300 font-semibold"> Dairy</span> | 
                  <span className="text-red-300 font-semibold"> Meat Animals</span>
                </p>
              </div>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <button className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-2xl shadow-purple-500/25 flex items-center justify-center">
                  <span>Explore Products</span>
                  <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-green-800 px-10 py-5 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center">
                  <FiPlay className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Watch Our Innovation</span>
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 text-white/70">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">100% Natural</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">11 Years R&D</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Global Reach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Global Impact Strip */}
      <section className="relative -mt-20 z-20">
        <div className="container-custom">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-transparent to-green-50/50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Global Impact & Trust</h2>
                <p className="text-gray-600">Proven results across 20+ countries worldwide</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FiGlobe className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">20+</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Countries Served</h3>
                  <p className="text-sm text-gray-600">Global presence across continents</p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-green-600 to-green-700 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FaLeaf className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">100%</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Herbal, Zero Antibiotics</h3>
                  <p className="text-sm text-gray-600">Natural & residue-free solutions</p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FaFlask className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">11</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Years of R&D</h3>
                  <p className="text-sm text-gray-600">Scientific validation & expertise</p>
                </div>
                
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-amber-600 to-amber-700 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FiAward className="w-10 h-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">ISO & GMP Certified</h3>
                  <p className="text-sm text-gray-600">International quality standards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-purple-600 font-semibold mb-4">About Us</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Where Science Meets Nature</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Founded with a vision to replace antibiotics in animal nutrition with potent herbal science. AXION SCIENTIFICS merges nature's wisdom with modern pharmaceutical precision.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our Natural Phyto-Performance Formula is scientifically crafted using bioactive botanicals including polyphenols, flavonoids, alkaloids, saponins, and curcuminoids to promote vitality and productivity while replacing synthetic growth promoters and antibiotics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  Our Story
                </button>
                <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
                  Meet Our Team
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-purple-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaFlask className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Scientific Excellence</h3>
                    <p className="text-gray-600">Merging nature's wisdom with pharmaceutical precision</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiEye className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To redefine animal health through sustainable phyio-biotic innovations.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiTarget className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver herbal feed solutions that enhance productivity without compromising purity.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group">
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FiHeart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Integrity • Innovation • Impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Why Choose AXION SCIENTIFICS</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaLeaf className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Herbal Expertise</h3>
              <p className="text-sm text-gray-600">11+ years of botanical research</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaDna className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Scientific Rigor</h3>
              <p className="text-sm text-gray-600">Validated by research & trials</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FaMicroscope className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Natural Therapeutics</h3>
              <p className="text-sm text-gray-600">100% plant-based solutions</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FiShield className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Antibiotic Alternative</h3>
              <p className="text-sm text-gray-600">Zero synthetic chemicals</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FiWorld className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-sm text-gray-600">20+ countries served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-navy-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Herbal Advantage</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Key functional features that make our natural formulations superior to synthetic alternatives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FaLeaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Natural Growth Promotion</h3>
              </div>
              <p className="text-white/90">Enhances metabolism and nutrient assimilation for consistent weight gain.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FiShield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Immune System Boost</h3>
              </div>
              <p className="text-white/90">Strengthens natural defenses, reducing disease susceptibility.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FaMicroscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Digestive Enzyme Activation</h3>
              </div>
              <p className="text-white/90">Improves feed utilization and gut health for better absorption.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="bg-amber-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FiHeart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Antioxidant & Detox Support</h3>
              </div>
              <p className="text-white/90">Protects vital organs and supports liver function naturally.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FaFlask className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Anti-inflammatory Action</h3>
              </div>
              <p className="text-white/90">Reduces oxidative and microbial stress for healthier animals.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FiCheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Safe & Sustainable</h3>
              </div>
              <p className="text-white/90">Antibiotic-free with no residues or side effects for long-term use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Advantages Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Economic Advantages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our herbal solutions deliver measurable cost savings and improved profitability for farmers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiTrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reduced Medication Costs</h3>
              <p className="text-gray-600">Minimizes need for expensive antibiotics and chemical treatments, reducing veterinary expenses by up to 40%.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUsers className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Improved Feed Efficiency</h3>
              <p className="text-gray-600">Enhanced feed conversion rates lead to better growth performance and reduced overall feed costs.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAward className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Market Access</h3>
              <p className="text-gray-600">Supports organic and antibiotic-free certifications for premium market pricing and consumer confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Portfolio Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Product Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized herbal formulations for different livestock categories, designed to enhance health, immunity, and productivity naturally.
            </p>
          </div>
          
          {/* Product Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaFish className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Aqua Raksha</h3>
                <p className="text-gray-600 mb-4">Herbal formulation for fish and shrimp. Promotes water quality adaptation, disease resistance, and accelerated growth.</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 mx-auto">
                  Learn More <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaEgg className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Poultry Raksha</h3>
                <p className="text-gray-600 mb-4">Natural blend enhancing immunity, feed conversion, and weight gain in poultry farms for broilers and layers.</p>
                <button className="text-yellow-600 font-semibold hover:text-yellow-700 flex items-center gap-2 mx-auto">
                  Learn More <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaCow className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pashu Raksha</h3>
                <p className="text-gray-600 mb-4">Specialized supplements for milking and meat animals supporting health, lactation, and immunity.</p>
                <button className="text-green-600 font-semibold hover:text-green-700 flex items-center gap-2 mx-auto">
                  Learn More <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group border border-gray-100">
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <FaPiggyBank className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">International Range</h3>
                <p className="text-gray-600 mb-4">HerbiGuard series for global markets - Aqua, Plume, Lacto, Fleece, Porci, and Equi formulations.</p>
                <button className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-2 mx-auto">
                  Learn More <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-800 to-green-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Herbal Revolution in Animal Health</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Elevate your livestock's potential with AXION SCIENTIFICS — where science and nature unite for innovative animal health solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105">
              Request a Quote
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
              Become a Partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
