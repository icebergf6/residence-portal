/**
 * Azure Bay Residences - Central Data Store & Brand Configuration
 * All brand settings and properties are managed here.
 * Rebranding the entire site only requires updating BRAND_CONFIG below.
 */

const DEFAULT_BRAND_CONFIG = {
  name: "Azure Bay Residences",
  shortName: "Azure Bay",
  tagline: "Exclusive Coastal & Hillside Residences",
  subheadline: "Architectural masterpieces nestled in prime coastal sanctuaries, meticulously crafted for discerning international buyers and capital investors.",
  
  // Contact details
  phone: "+1 (800) 428-9988",
  phoneRaw: "+18004289988",
  whatsapp: "+1 800 428 9988",
  whatsappRaw: "18004289988",
  whatsappDefaultMessage: "Hello Azure Bay Residences, I would like to schedule a private viewing consultation.",
  email: "inquiries@azurebayresidences.com",
  conciergeEmail: "concierge@azurebayresidences.com",
  address: "1400 Ocean Boulevard, Suite 500, Azure Bay Coastal Reserve",
  officeHours: "Monday – Saturday: 9:00 AM – 7:00 PM EST (Sundays by private appointment)",
  license: "Licensed Luxury Real Estate Brokerage & Master Developer #RE-98442-AZ",

  // Brand Palette (mirrored in custom.css)
  colors: {
    primary: "#0F2A43",      // Deep Navy
    accent: "#C8A96A",       // Sand Gold
    background: "#F7F5F0",   // Warm Ivory
    text: "#1F2933",         // Charcoal
    border: "#E6E2DA",       // Light Stone
    white: "#FFFFFF"
  },

  // Social Links
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com"
  }
};

function getStoredBrandConfig() {
  try {
    const raw = localStorage.getItem('azure_brand_settings');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return { ...DEFAULT_BRAND_CONFIG, ...parsed };
      }
    }
  } catch (e) {}
  return DEFAULT_BRAND_CONFIG;
}

let BRAND_CONFIG = getStoredBrandConfig();

// Master Curated Luxury Properties Collection (21 Estates)
const DEFAULT_PROPERTIES = [
  {
    id: "villa-solis",
    slug: "villa-solis-clifftop-sanctuary",
    name: "Villa Solis Clifftop Sanctuary",
    location: "Azure Bay Coast",
    type: "Villa",
    price: 2450000,
    status: "Available",
    bedrooms: 5,
    bathrooms: 6,
    landArea: 1200,
    buildingArea: 680,
    yearBuilt: 2024,
    featured: true,
    tagline: "Unobstructed Pacific Horizon & Private Infinity Pool",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Perched majestically on the southern bluffs of Azure Bay, Villa Solis represents the zenith of contemporary coastal architecture. Floor-to-ceiling motorized glass facades disappear into travertine walls, uniting opulent living spaces with a cantilevered heated salt-water infinity pool overlooking the ocean.\n\nCrafted with bespoke Italian Calacatta marble, European white oak, and integrated Sub-Zero and Miele appliances, the residence includes a dedicated sommelier tasting room, multi-car motor court, and separate staff accommodations. Designed with sustainability in mind, the villa features an intelligent microgrid solar array and rainwater purification systems.",
    amenities: [
      "22m Cantilevered Infinity Pool",
      "Panoramic 270° Ocean Views",
      "Sub-Zero & Miele Chef's Kitchen",
      "Temperature-Controlled Wine Cellar",
      "Smart Home Creston Automation",
      "Private Gated Motor Court",
      "Solar Microgrid & Tesla Powerwall",
      "Private Spa Suite with Finnish Sauna"
    ],
    coordinates: { lat: 25.7617, lng: -80.1918 }
  },
  {
    id: "the-horizon-penthouse",
    slug: "the-horizon-marina-penthouse",
    name: "The Horizon Marina Penthouse",
    location: "Azure Marina",
    type: "Apartment",
    price: 1850000,
    status: "Available",
    bedrooms: 4,
    bathrooms: 4.5,
    landArea: 0,
    buildingArea: 420,
    yearBuilt: 2023,
    featured: true,
    tagline: "Skyline Panoramas & Private Superyacht Berth Option",
    images: [
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Crown jewel of the Azure Marina towers, The Horizon Penthouse offers double-height 20-foot ceilings and wraparound terraces commanding uninterrupted views of the deep-water harbor. An expansive open-concept great room connects effortlessly to a private rooftop sundeck complete with heated plunge pool and summer kitchen.\n\nResidents enjoy biometric private elevator entry, 24/7 concierge services, and the opportunity to secure a dedicated 80-foot superyacht slip directly outside the tower lobby.",
    amenities: [
      "Private Rooftop Plunge Pool",
      "Direct Keyed Elevator Access",
      "80ft Superyacht Slip Capability",
      "24-Hour White-Glove Concierge",
      "Custom Poliform Italian Cabinetry",
      "Bang & Olufsen Integrated Acoustics",
      "Underground EV Fast-Charging Garage",
      "Residents Fitness & Hydrotherapy Suite"
    ],
    coordinates: { lat: 25.7725, lng: -80.1855 }
  },
  {
    id: "eden-crest-villa",
    slug: "eden-crest-hillside-villa",
    name: "Eden Crest Hillside Villa",
    location: "Pine Ridge Highlands",
    type: "Villa",
    price: 1950000,
    status: "Reserved",
    bedrooms: 4,
    bathrooms: 5,
    landArea: 980,
    buildingArea: 540,
    yearBuilt: 2024,
    featured: true,
    tagline: "Serene Mountain Terraces & Glass Pavilion Living",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Nestled in the lush hills above Azure Bay, Eden Crest combines raw volcanic stone, warm teak timber, and dramatic structural glass. Oriented towards panoramic sunsets over the pine ridge, this modern pavilion provides unmatched privacy and tranquility.\n\nThe master suite occupies its own secluded wing with an outdoor rain shower, cedar-lined walk-in dressing room, and direct bridge access to an elevated meditation gazebo.",
    amenities: [
      "Organic Architectural Design",
      "Heated Negative-Edge Lap Pool",
      "Outdoor Stone Fireplace Terrace",
      "Meditation Gazebo & Zen Garden",
      "Private Primary Wing with Sunken Tub",
      "Gourmet Outdoor Teppanyaki Kitchen",
      "High-Efficiency Geothermal Cooling",
      "Secure 3-Car Gated Showroom Garage"
    ],
    coordinates: { lat: 25.7950, lng: -80.2200 }
  },
  {
    id: "azure-haven-villa",
    slug: "azure-haven-waterfront-villa",
    name: "Azure Haven Waterfront Villa",
    location: "Azure Bay Coast",
    type: "Villa",
    price: 1280000,
    status: "Available",
    bedrooms: 3,
    bathrooms: 3.5,
    landArea: 750,
    buildingArea: 380,
    yearBuilt: 2023,
    featured: true,
    tagline: "Direct Shoreline Access & Tropical Courtyard",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "An idyllic beachfront retreat providing barefoot luxury living at its finest. Azure Haven was conceived around a central open-air atrium with a mature frangipani tree, channeling coastal sea breezes naturally through every room.\n\nStep off your back deck directly onto powder-soft sands, or entertain guests around the built-in lounge bar beside the turquoise plunge pool.",
    amenities: [
      "Direct Beach Path & Kayak Storage",
      "Central Open-Air Living Courtyard",
      "Custom Teak Woodwork & Millwork",
      "Private Saltwater Plunge Pool",
      "Outdoor Shaded Dining Pergola",
      "Integrated Sonos Audio Throughout",
      "Turnkey Fully Furnished Option",
      "High-Yield Rental License Ready"
    ],
    coordinates: { lat: 25.7580, lng: -80.1890 }
  },
  {
    id: "palma-courtyard-townhome",
    slug: "palma-courtyard-townhome",
    name: "The Palma Courtyard Townhome",
    location: "Palm Gardens Quarter",
    type: "Townhouse",
    price: 890000,
    status: "Available",
    bedrooms: 3,
    bathrooms: 3,
    landArea: 310,
    buildingArea: 290,
    yearBuilt: 2024,
    featured: true,
    tagline: "Sophisticated Urban Sanctuary with Private Garden Patio",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Combining low-maintenance lock-and-leave convenience with the elegance of a private residence, The Palma Townhome is positioned within the charming boulevards of Palm Gardens Quarter.\n\nFeaturing an artisan brick facade, dramatic herringbone hardwood floors, private rooftop cocktail terrace, and an enclosed courtyard garden designed by renowned landscape architects.",
    amenities: [
      "Private Walled Courtyard Garden",
      "Rooftop Sunset Lounge & Wet Bar",
      "Herringbone French Oak Flooring",
      "Gourmet Quartz Kitchen Island",
      "Attached 2-Car Garage with Storage",
      "Walking Distance to Boutiques & Cafes",
      "Low HOA Maintenance Program",
      "Pet-Friendly Secure Grounds"
    ],
    coordinates: { lat: 25.7650, lng: -80.2050 }
  },
  {
    id: "serena-cliff-plot",
    slug: "serena-promontory-sea-view-plot",
    name: "Serena Promontory Sea-View Plot",
    location: "Azure Bay Coast",
    type: "Land",
    price: 640000,
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    landArea: 1800,
    buildingArea: 0,
    yearBuilt: 2025,
    featured: true,
    tagline: "Prime Clifftop Parcel with Approved Architectural Blueprints",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "An extraordinary opportunity to construct your custom dream villa on one of Azure Bay's rarest cliff parcels. This 1,800 square meter property features 45 meters of unobstructed ocean frontage with sweeping elevated views.\n\nComes complete with pre-cleared zoning permits, completed geological surveys, and full turnkey architectural plans designed for a 6-bedroom estate.",
    amenities: [
      "Full Oceanfront Topography",
      "Permitted For Up to 3-Story Luxury Villa",
      "Underground Municipal Utilities at Border",
      "Dedicated Private Beach Access Easement",
      "Complete Geological & Topo Reports",
      "Exclusive Gated Enclave Community",
      "Foreign Ownership Eligible (Freehold)",
      "Zero Immediate Build Timeline Requirement"
    ],
    coordinates: { lat: 25.7500, lng: -80.1940 }
  },
  {
    id: "mirador-estate",
    slug: "mirador-grand-oceanfront-estate",
    name: "El Mirador Grand Oceanfront Estate",
    location: "Azure Bay Coast",
    type: "Villa",
    price: 2750000,
    status: "Available",
    bedrooms: 6,
    bathrooms: 7,
    landArea: 1600,
    buildingArea: 850,
    yearBuilt: 2024,
    featured: false,
    tagline: "The Pinnacle of Coastal Luxury and Entertaining",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Spread across an expansive 1,600m² estate parcel, El Mirador is tailored for grand entertaining and ultra-luxurious everyday living. The property boasts a dual-level pool structure featuring an upper glass-bottom pool cascading into an Olympic-spec lower basin.\n\nIncludes a 12-seat private Dolby Atmos screening cinema, separate two-bedroom guest cottage, tennis pavilion, and full security outpost.",
    amenities: [
      "Cascading Dual-Tier Pool Architecture",
      "12-Seat Dolby Atmos Cinema",
      "Separate 2-Bedroom Guest Villa",
      "Championship Pickleball & Tennis Court",
      "Private Helipad Transfer Access",
      "Commercial Grade Butler's Pantry",
      "Wine Cellar with 1,500 Bottle Capacity",
      "24/7 Monitored Security Outpost"
    ],
    coordinates: { lat: 25.7530, lng: -80.1960 }
  },
  {
    id: "azure-promenade-suite",
    slug: "azure-promenade-luxury-suite",
    name: "Azure Promenade Luxury Suite",
    location: "Azure Marina",
    type: "Apartment",
    price: 480000,
    status: "Available",
    bedrooms: 2,
    bathrooms: 2,
    landArea: 0,
    buildingArea: 145,
    yearBuilt: 2023,
    featured: false,
    tagline: "Vibrant Marina Promenade Living with High Rental Yield",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Centrally situated right above the yacht basin cafes and promenade, this pristine corner residence features seamless flow, natural marble bathrooms, and dual balconies capturing yacht activity and evening harbor lights.\n\nAn ideal investment asset with fully managed short-term lease privileges and an on-site property management desk delivering 10.4% net historical yields.",
    amenities: [
      "Dual Marina-Facing Balconies",
      "Turnkey Designer Furnishing Package",
      "Managed Rental Program with 10%+ Yield",
      "Heated Olympic Lap Pool on Deck",
      "Fitness Center & Pilates Studio",
      "Assigned Underground Parking Bay",
      "High-Speed Fiber-Optic Infrastructure",
      "Storage Locker for Watersport Gear"
    ],
    coordinates: { lat: 25.7710, lng: -80.1870 }
  },
  {
    id: "cypress-terrace-townhome",
    slug: "cypress-terrace-garden-townhome",
    name: "Cypress Terrace Garden Townhome",
    location: "Palm Gardens Quarter",
    type: "Townhouse",
    price: 760000,
    status: "Reserved",
    bedrooms: 3,
    bathrooms: 3,
    landArea: 280,
    buildingArea: 250,
    yearBuilt: 2023,
    featured: false,
    tagline: "Timeless Mediterranean Architecture in Leafy Boulevards",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Cypress Terrace presents European refinement with its hand-laid terracotta barrel tiles, wrought iron Juliette balconies, and private rear sun terrace lined with mature Tuscan cypress trees.\n\nInside, an open layout integrates a chef's kitchen with limestone countertops, custom gas range, and a warm hearth fireplace in the salon.",
    amenities: [
      "Private Cypress-Lined Sun Terrace",
      "Natural Limestone Countertops",
      "Artisan Wood-Burning Hearth Fireplace",
      "Master Suite with Marble Double Vanity",
      "Direct Street and Alley Garage Access",
      "Energy Star Certified Climate Systems",
      "Smart Irrigation for Private Gardens",
      "Quiet Pedestrian-Friendly District"
    ],
    coordinates: { lat: 25.7680, lng: -80.2080 }
  },
  {
    id: "highland-ridge-parcel",
    slug: "highland-ridge-panorama-land-parcel",
    name: "Highland Ridge Panorama Land Parcel",
    location: "Pine Ridge Highlands",
    type: "Land",
    price: 390000,
    status: "Available",
    bedrooms: 0,
    bathrooms: 0,
    landArea: 2400,
    buildingArea: 0,
    yearBuilt: 2024,
    featured: false,
    tagline: "High-Altitude Estate Parcel with 360° Valley and Ocean Vistas",
    images: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Perched 400 meters above sea level, this expansive 2,400 square meter hillside plot commands breezy year-round temperatures and unmatched 360-degree vistas taking in both mountain ridgelines and the glittering bay below.\n\nIdeal for an eco-luxury compound, multi-tiered cantilever villa, or wellness sanctuary retreat.",
    amenities: [
      "2,400m² Expansive Hillside Acreage",
      "Dual Mountain and Coast Views",
      "Paved Roadway Access to Boundary",
      "Cooler High-Altitude Microclimate",
      "Zoned For Custom Multi-Structure Compound",
      "Clean Title Ready for Immediate Transfer",
      "Architectural Review Support Included",
      "Private Hiking Trail Connections"
    ],
    coordinates: { lat: 25.8010, lng: -80.2280 }
  },
  {
    id: "bayview-garden-villa",
    slug: "bayview-oasis-garden-villa",
    name: "Bayview Oasis Garden Villa",
    location: "Palm Gardens Quarter",
    type: "Villa",
    price: 1150000,
    status: "Sold",
    bedrooms: 4,
    bathrooms: 4,
    landArea: 820,
    buildingArea: 410,
    yearBuilt: 2023,
    featured: false,
    tagline: "Tropical Botanic Gardens & Saltwater Lagoon Pool",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "A private tropical paradise featuring manicured botanical gardens, mature royal palms, and a freeform saltwater lagoon pool with built-in stone sun loungers.\n\nThe single-level architectural layout celebrates effortless flow, with wide covered verandahs providing year-round shaded outdoor living.",
    amenities: [
      "Freeform Saltwater Lagoon Pool",
      "Botanical Grounds with Mature Royal Palms",
      "Single-Story Barrier-Free Architecture",
      "Covered Wrap-Around Verandahs",
      "Outdoor Summer Kitchen with Pizza Oven",
      "Primary Suite with Private Sun Courtyard",
      "High Ceilings with Exposed Hardwood Beams",
      "Private Borehole & Advanced Water Filtration"
    ],
    coordinates: { lat: 25.7620, lng: -80.2010 }
  },
  {
    id: "the-marina-studio-loft",
    slug: "the-marina-port-view-studio-loft",
    name: "The Marina Port View Studio Loft",
    location: "Azure Marina",
    type: "Apartment",
    price: 2950000 / 15, // $196,666 approx
    status: "Available",
    bedrooms: 1,
    bathrooms: 1,
    landArea: 0,
    buildingArea: 88,
    yearBuilt: 2024,
    featured: false,
    tagline: "Turnkey Waterfront Pied-à-Terre & High Yield Asset",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "An impeccably designed urban pied-à-terre offering bespoke space optimization, full-height acoustic glass, and a private glass terrace overlooking the yacht moorings.\n\nAn accessible entry price point into the prestigious Azure Marina development, ideal for international executives and hands-off rental investors.",
    amenities: [
      "Direct Yacht Basin Views",
      "Custom Italian Murphy Wall-Bed System",
      "Acoustic Soundproofing Double Glazing",
      "Access to Marina Club & Infinity Pool",
      "Dedicated High-Speed WiFi Network",
      "Automated Keyless Digital Entry",
      "Concierge Mail & Package Receiving",
      "Strong Historical 9.2% Net Yield"
    ],
    coordinates: { lat: 25.7735, lng: -80.1840 }
  },
  {
    id: "villa-celestial",
    slug: "villa-celestial-clifftop-compound",
    name: "Villa Celestial Clifftop Compound",
    location: "Azure Bay Coast",
    type: "Villa",
    price: 5800000,
    status: "Available",
    bedrooms: 6,
    bathrooms: 8,
    landArea: 2200,
    buildingArea: 940,
    yearBuilt: 2025,
    featured: true,
    tagline: "Ultra-Prime Promontory Compound with Private Funicular & 30m Infinity Edge",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Villa Celestial is the crown architectural statement of the southern coastline. Anchored onto bedrock sixty meters above the waves, this monolithic marvel features a private cliffside funicular elevator down to a secluded marine grotto, triple-height gallery salons, and a 30-meter heated black obsidian infinity pool.\n\nIncludes dual master suites, private wellness spa pavilion with cold plunge, and private quarters for estate staff.",
    amenities: [
      "Private Cliffside Funicular Elevator",
      "30m Black Obsidian Infinity Pool",
      "Secluded Marine Grotto Access",
      "Cold Plunge & Cryo-Wellness Suite",
      "Bespoke Boffi Stainless Steel Kitchen",
      "6-Vehicle Underground Gallery",
      "Discreet Security Command Center",
      "Unrestricted Direct Helipad Rights"
    ],
    coordinates: { lat: 25.7510, lng: -80.1980 }
  },
  {
    id: "the-atlantis-penthouse",
    slug: "the-atlantis-ultra-penthouse",
    name: "The Atlantis Sky Triplex Penthouse",
    location: "Azure Marina",
    type: "Apartment",
    price: 4200000,
    status: "Available",
    bedrooms: 5,
    bathrooms: 6,
    landArea: 0,
    buildingArea: 680,
    yearBuilt: 2024,
    featured: true,
    tagline: "Triplex Crown Above Marina with Private Cantilever Glass Pool",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Occupying the top three floors of the Azure Landmark Tower, The Atlantis is an extraordinary sky mansion. An open glass atrium connects all three levels via a floating bronze sculptural staircase. The upper rooftop terrace boasts a transparent-bottom swimming pool projecting out over the marina harbor.",
    amenities: [
      "Triplex Private Sky Residence",
      "Cantilevered Glass-Bottom Rooftop Pool",
      "Private Bronze Floating Staircase & Elevator",
      "Dedicated 100ft Superyacht Slip",
      "Sommelier Tasting Vault & Cigar Lounge",
      "Full Smart Home Crestron Integration",
      "24-Hour In-Residence Chef Available",
      "VIP Yacht Club Lifetime Membership"
    ],
    coordinates: { lat: 25.7740, lng: -80.1830 }
  },
  {
    id: "sanctuary-island-estate",
    slug: "sanctuary-island-estate",
    name: "Sanctuary Cove Oceanfront Domain",
    location: "Azure Bay Coast",
    type: "Villa",
    price: 8900000,
    status: "Available",
    bedrooms: 7,
    bathrooms: 9,
    landArea: 3800,
    buildingArea: 1350,
    yearBuilt: 2025,
    featured: true,
    tagline: "Private Peninsula Sanctuary with Dual White Sand Coves",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "The most prestigious residential compound in Azure Bay. Occupying its own private peninsula surrounded on three sides by turquoise waters, the domain incorporates two private white sand beaches, a deepwater boat dock, Olympic lap pool, and three independent guest pavilions.\n\nDesigned for sovereign families and heads of industry demanding absolute seclusion.",
    amenities: [
      "Private Peninsula with Dual Sand Coves",
      "Direct Private Deepwater Dock",
      "Three Autonomous Guest Pavilions",
      "Olympic-Length Saltwater Lap Pool",
      "Commercial Grade Professional Kitchen",
      "Full Perimeter Biometric Perimeter",
      "Off-Grid Solar & Desalination Facilities",
      "Dedicated Private Resident Beach Club"
    ],
    coordinates: { lat: 25.7480, lng: -80.2010 }
  },
  {
    id: "montecito-coastal-manor",
    slug: "montecito-coastal-manor",
    name: "Montecito Palm Estate Manor",
    location: "Palm Gardens Quarter",
    type: "Villa",
    price: 3650000,
    status: "Available",
    bedrooms: 5,
    bathrooms: 6,
    landArea: 1450,
    buildingArea: 720,
    yearBuilt: 2024,
    featured: false,
    tagline: "Classic Santa Barbara Architecture with Modern European Sophistication",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Inspired by classic coastal California estates, Montecito Manor unites hand-troweled stucco, limestone colonnades, and mature olive courtyards. Features an expansive light-filled great room with 18-foot beamed ceilings and steel-framed French doors opening onto an Italian loggia and heated courtyard pool.",
    amenities: [
      "Courtyard Heated Pool & Outdoor Hearth",
      "Centuries-Old Olive & Citrus Grove",
      "Sub-Zero Heritage Wine Cellar",
      "Separate In-Law or Staff Studio",
      "European White Oak Flooring",
      "Integrated Sonos Whole-Home Sound",
      "Secured Electric Gated Driveway",
      "Adjacent to Palm Gardens Equestrian Trails"
    ],
    coordinates: { lat: 25.7660, lng: -80.2030 }
  },
  {
    id: "zenith-sky-mansion",
    slug: "zenith-sky-mansion",
    name: "Zenith Sky Mansion",
    location: "Azure Marina",
    type: "Apartment",
    price: 6100000,
    status: "Reserved",
    bedrooms: 5,
    bathrooms: 7,
    landArea: 0,
    buildingArea: 820,
    yearBuilt: 2025,
    featured: true,
    tagline: "Full-Floor Sky Villa with 360° Glass Ribbon & Private Helipad Access",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "An unprecedented full-floor sky mansion commanding panoramic 360-degree views stretching across the entire coastal bay and mountain range. Equipped with high-speed private elevator entrance opening directly into a triple-height foyer, indoor Japanese reflection pond, and wraparound heated sunset deck.",
    amenities: [
      "Full-Floor 360° Sky Mansion",
      "Indoor Zen Reflection Water Garden",
      "Direct Keycard Private Elevator",
      "Dual Master Suites with Spa Baths",
      "Private Rooftop Helipad Fast Track",
      "Dedicated Full-Time Concierge Butler",
      "Custom Italian Molteni&C Furnishings",
      "State-of-the-Art Private Wellness Spa"
    ],
    coordinates: { lat: 25.7750, lng: -80.1820 }
  },
  {
    id: "the-dune-residence",
    slug: "the-dune-residence",
    name: "The Dune Oceanfront Pavilion",
    location: "Azure Bay Coast",
    type: "Villa",
    price: 2150000,
    status: "Available",
    bedrooms: 4,
    bathrooms: 4.5,
    landArea: 950,
    buildingArea: 480,
    yearBuilt: 2024,
    featured: false,
    tagline: "Organic Dune Architecture Tucked Harmoniously into Coastal Fringes",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Crafted with rammed-earth walls, board-formed concrete, and marine-grade teak, The Dune Residence seems to rise naturally out of the shoreline landscape. Direct private boardwalk extends through sea oats directly onto the water's edge.",
    amenities: [
      "Organic Rammed-Earth Construction",
      "Private Boardwalk Directly to Beach",
      "Natural Stone Sunken Fire Pit Lounge",
      "Heated Beachfront Plunge Pool",
      "Turnkey Custom Scandinavian Interior",
      "Integrated Solar Energy Battery System",
      "Outdoor Sunset Cocktail Bar",
      "Dedicated Board & Surf Gear Room"
    ],
    coordinates: { lat: 25.7560, lng: -80.1910 }
  },
  {
    id: "azure-crest-villa",
    slug: "azure-crest-oceanfront-villa",
    name: "Azure Crest Oceanfront Villa",
    location: "Azure Bay Coast",
    type: "Villa",
    price: 3400000,
    status: "Available",
    bedrooms: 5,
    bathrooms: 6,
    landArea: 1280,
    buildingArea: 720,
    yearBuilt: 2024,
    featured: false,
    tagline: "Dramatic Cantilevered Terraces Over Ocean Swells",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Engineered with precision aerospace cantilevers, Azure Crest extends fearlessly beyond the cliff edge. The living pavilion feels as though suspended directly above the ocean. Features a glass wine gallery, gym with steam room, and 25-meter infinity pool.",
    amenities: [
      "Cantilevered Architectural Engineering",
      "25m Glass-Edge Heated Infinity Pool",
      "Full Oceanfront Gym & Steam Room",
      "Climate-Controlled Glass Wine Gallery",
      "Smart Motorized Glass Curtain Walls",
      "Four En-Suite Oceanview Bedrooms",
      "Staff Accommodation Wing",
      "High Return Luxury Rental History"
    ],
    coordinates: { lat: 25.7590, lng: -80.1930 }
  },
  {
    id: "palazzo-marina",
    slug: "palazzo-marina-grand-villa",
    name: "Palazzo Marina Grand Villa",
    location: "Azure Marina",
    type: "Villa",
    price: 4750000,
    status: "Available",
    bedrooms: 6,
    bathrooms: 7,
    landArea: 1500,
    buildingArea: 880,
    yearBuilt: 2025,
    featured: false,
    tagline: "Venetian Grandeur Meets Modern Nautical Luxury with 120ft Berth",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Palazzo Marina is an ultra-rare standalone waterfront estate inside the marina reserve. Commands 60 meters of private canal frontage with a private dock capable of accommodating a 120-foot mega-yacht with immediate deepwater access to the open ocean.",
    amenities: [
      "120ft Superyacht Private Mooring",
      "60m Direct Harbor Water Frontage",
      "Heated Saltwater Waterfront Pool",
      "Grand Double-Height Foyer Salon",
      "Chef's Prep Kitchen & Service Entry",
      "Dedicated Captain & Crew Studio",
      "EV Fleet Garage (4 Vehicles)",
      "Unrivaled Trophy Waterfront Asset"
    ],
    coordinates: { lat: 25.7760, lng: -80.1810 }
  },
  {
    id: "pine-ridge-zen-pavilion",
    slug: "pine-ridge-zen-pavilion",
    name: "Pine Ridge Zen Pavilion",
    location: "Pine Ridge Highlands",
    type: "Villa",
    price: 1850000,
    status: "Available",
    bedrooms: 4,
    bathrooms: 4,
    landArea: 1100,
    buildingArea: 490,
    yearBuilt: 2024,
    featured: false,
    tagline: "Biophilic Highlands Villa with Cedar Bathhouse & Japanese Courtyard",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    floorPlan: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    description: "Designed around Japanese Wabi-Sabi principles and biophilic architecture, the Zen Pavilion utilizes dark yakisugi burnt cedar, natural mountain stone, and calm courtyards. Features an authentic cedar hot-spring onsen bathhouse looking into pine forests.",
    amenities: [
      "Japanese Hinoki Cedar Onsen Pavilion",
      "Yakisugi Charred Cedar Architecture",
      "Central Stone Zen Meditation Garden",
      "Heated Negative-Edge Lap Pool",
      "Photovoltaic Clean Energy Microgrid",
      "Cool Mountain Microclimate Comfort",
      "Private Tea Ceremony Pavilion",
      "High-Speed Fiber-Optic Connection"
    ],
    coordinates: { lat: 25.7980, lng: -80.2240 }
  }
];

// Clean formatted price for property 12 in master array
DEFAULT_PROPERTIES[11].price = 195000;

// Load properties from localStorage if available (Admin CMS persistence)
function getStoredProperties() {
  try {
    const raw = localStorage.getItem('azure_custom_properties');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read local properties:", e);
  }
  return DEFAULT_PROPERTIES;
}

// Global PROPERTIES array referenced across the entire application
let PROPERTIES = getStoredProperties();

// Centralized Database Engine & Admin CRUD API
const AzureDB = {
  getProperties() {
    return getStoredProperties();
  },
  saveProperties(list) {
    try {
      localStorage.setItem('azure_custom_properties', JSON.stringify(list));
      PROPERTIES = list;
      return true;
    } catch (e) {
      console.error("Storage error:", e);
      return false;
    }
  },
  addProperty(newProp) {
    const list = this.getProperties();
    if (!newProp.id) {
      newProp.id = 'azure-' + Date.now();
    }
    if (!newProp.slug) {
      newProp.slug = (newProp.name || 'residence').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (!newProp.images || newProp.images.length === 0) {
      newProp.images = [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ];
    }
    if (!newProp.floorPlan) {
      newProp.floorPlan = "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80";
    }
    list.unshift(newProp);
    this.saveProperties(list);
    return newProp;
  },
  updateProperty(id, updatedFields) {
    const list = this.getProperties();
    const idx = list.findIndex(p => p.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedFields };
      this.saveProperties(list);
      return list[idx];
    }
    return null;
  },
  deleteProperty(id) {
    const list = this.getProperties();
    const filtered = list.filter(p => p.id !== id);
    this.saveProperties(filtered);
    return true;
  },
  getLeads() {
    return getStoredLeads();
  },
  saveLeads(list) {
    try {
      localStorage.setItem('azure_custom_leads', JSON.stringify(list));
      return true;
    } catch (e) {
      console.error("Leads storage error:", e);
      return false;
    }
  },
  addLead(lead) {
    const list = this.getLeads();
    if (!lead.id) lead.id = 'lead-' + Date.now();
    if (!lead.date) lead.date = new Date().toISOString().split('T')[0];
    if (!lead.status) lead.status = 'New Lead';
    list.unshift(lead);
    this.saveLeads(list);
    return lead;
  },
  updateLeadStatus(id, newStatus) {
    const list = this.getLeads();
    const item = list.find(l => l.id === id);
    if (item) {
      item.status = newStatus;
      this.saveLeads(list);
      return item;
    }
    return null;
  },
  deleteLead(id) {
    const list = this.getLeads();
    const filtered = list.filter(l => l.id !== id);
    this.saveLeads(filtered);
    return true;
  },
  getSettings() {
    return getStoredBrandConfig();
  },
  saveSettings(newSettings) {
    try {
      const merged = { ...DEFAULT_BRAND_CONFIG, ...newSettings };
      localStorage.setItem('azure_brand_settings', JSON.stringify(merged));
      BRAND_CONFIG = merged;
      if (typeof window !== 'undefined') {
        window.BRAND_CONFIG = BRAND_CONFIG;
      }
      return merged;
    } catch (e) {
      console.error("Settings save error:", e);
      return null;
    }
  },
  resetToDefault() {
    try {
      localStorage.removeItem('azure_custom_properties');
      localStorage.removeItem('azure_custom_leads');
      localStorage.removeItem('azure_brand_settings');
      PROPERTIES = DEFAULT_PROPERTIES;
      BRAND_CONFIG = DEFAULT_BRAND_CONFIG;
      if (typeof window !== 'undefined') {
        window.BRAND_CONFIG = BRAND_CONFIG;
        window.PROPERTIES = PROPERTIES;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
};

const DEFAULT_LEADS = [
  {
    id: "lead-101",
    name: "Lord Arthur Pendelton",
    email: "a.pendelton@mayfairholdings.co.uk",
    phone: "+44 7911 123456",
    property: "Villa Solis Clifftop Sanctuary",
    type: "Villa",
    budget: "$2,500,000",
    goal: "Hands-off Luxury Rental Yield & Escrow",
    source: "Owner Lead Landing Page",
    status: "VIP Qualified",
    date: "2026-09-28",
    notes: "Requires private helicopter transfer. Interested in quarterly net yield repatriation to London Barclays."
  },
  {
    id: "lead-102",
    name: "Dr. Elena Rostova",
    email: "elena.rostova@genevabiotech.ch",
    phone: "+41 22 789 0123",
    property: "The Horizon Marina Penthouse",
    type: "Apartment",
    budget: "$1,850,000",
    goal: "Tax-Advantaged Offshore Holding",
    source: "Private Viewing Request",
    status: "Viewing Scheduled",
    date: "2026-09-29",
    notes: "4K live virtual tour completed with Camille Moreau. In-person notary contract review scheduled."
  },
  {
    id: "lead-103",
    name: "Daisuke & Mei Tanaka",
    email: "tanaka@tokyocapital.jp",
    phone: "+81 90 1234 5678",
    property: "Villa Botanica Sanctuary",
    type: "Villa",
    budget: "$2,200,000",
    goal: "Vacation Residence + Turnkey Management",
    source: "Owner Prospectus Form",
    status: "New Lead",
    date: "2026-09-30",
    notes: "Downloaded architectural dossiers. Wants 3 months personal stay + 9 months high-end asset rental management."
  },
  {
    id: "lead-104",
    name: "Sheikh Tariq Al-Qasimi",
    email: "t.alqasimi@alnahda-group.ae",
    phone: "+971 50 123 4567",
    property: "The Sanctuary Trophy Penthouse",
    type: "Apartment",
    budget: "$3,850,000",
    goal: "Superyacht Berth + Portfolio Anchor",
    source: "WhatsApp Concierge Direct",
    status: "Escrow Negotiation",
    date: "2026-09-30",
    notes: "Title deed escrow draft shared with family office legal counsel in DIFC Dubai. 100% foreign freehold ownership."
  }
];

function getStoredLeads() {
  try {
    const raw = localStorage.getItem('azure_custom_leads');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return DEFAULT_LEADS;
}

// 8 Curated Global Investors (For Smooth Non-Stop Marquee)
const INVESTOR_TESTIMONIALS = [
  {
    id: "inv-1",
    name: "Alexander & Sophia Van Der Bilt",
    title: "Private Wealth Principals",
    country: "Zurich, Switzerland",
    flag: "🇨🇭",
    property: "Villa Solis Clifftop Sanctuary",
    tag: "Freehold Acquisition",
    quote: "Acquiring a home overseas felt daunting until we engaged Azure Bay. Their legal counsel navigated cross-border trust structuring flawlessly, and the craftsmanship of our clifftop villa exceeded our highest standards.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    metric: "+48% Est. 5-Yr Growth"
  },
  {
    id: "inv-2",
    name: "Marcus Sterling",
    title: "Fintech Founder & Angel Investor",
    country: "London, United Kingdom",
    flag: "🇬🇧",
    property: "The Horizon Marina Penthouse",
    tag: "High-Yield Asset",
    quote: "From our first WhatsApp inquiry to key handover, Azure Bay operated with absolute transparency and white-glove precision. The rental yields on the marina penthouse have surpassed projected returns by 18%.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    metric: "11.2% Net Annual Yield"
  },
  {
    id: "inv-3",
    name: "Dr. Elena Rostova",
    title: "Biotech Managing Director",
    country: "Toronto, Canada",
    flag: "🇨🇦",
    property: "Azure Haven Waterfront Villa",
    tag: "Primary Coastal Home",
    quote: "The quiet luxury of the architecture and the team's commitment to preserving natural coastal vegetation were what won me over. Their private concierge made our family relocation seamless.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    metric: "Turnkey Relocation"
  },
  {
    id: "inv-4",
    name: "Henrik & Astrid Lindqvist",
    title: "Nordic Capital Partners",
    country: "Stockholm, Sweden",
    flag: "🇸🇪",
    property: "Eden Crest Hillside Villa",
    tag: "Custom Hillside Build",
    quote: "The bioclimatic pavilion design and negative-edge pool integration into the pine bluffs is pure architectural poetry. We spend four months a year here, completely insulated in tranquility.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    metric: "Off-Grid Solar Ready"
  },
  {
    id: "inv-5",
    name: "Faisal & Layla Al-Hassan",
    title: "Family Office Chairman",
    country: "Dubai, United Arab Emirates",
    flag: "🇦🇪",
    property: "El Mirador Oceanfront Estate",
    tag: "Ultra-Prime Estate",
    quote: "Azure Bay's discretionary private office treated our privacy and family office requirements with supreme professionalism. The title escrow execution was instantaneous and fully unencumbered.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    metric: "Title Escrow Guaranteed"
  },
  {
    id: "inv-6",
    name: "Julian & Claire Tan",
    title: "Managing Partner, Horizons Capital",
    country: "Singapore",
    flag: "🇸🇬",
    property: "The Atlantis Sky Triplex",
    tag: "Trophy Penthouse",
    quote: "Securing the deepwater superyacht berth with our sky triplex was handled in one single notarized contract. The property appreciation has already exceeded our internal hurdle rate.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    metric: "+52% Capital Appreciation"
  },
  {
    id: "inv-7",
    name: "Maximilian Von Klausen",
    title: "Industrialist & Collector",
    country: "Munich, Germany",
    flag: "🇩🇪",
    property: "Villa Celestial Compound",
    tag: "Private Sanctuary",
    quote: "German engineering standards met Mediterranean artistry. The structural glass cantilevers, geothermal systems, and private funicular elevator are built to last generations.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    metric: "Passive House Standard"
  },
  {
    id: "inv-8",
    name: "Victoria & Ethan Crawford",
    title: "Venture Partners",
    country: "Sydney, Australia",
    flag: "🇦🇺",
    property: "Sanctuary Cove Domain",
    tag: "Private Island Domain",
    quote: "We toured dozens of coastal sanctuaries across the Mediterranean and Caribbean. Nothing matched the purity of Azure Bay's beaches and the architectural restraint of the residences.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    metric: "Double-Cove Beach Access"
  }
];

// Testimonials Data (5 Curated International Clients)
const TESTIMONIALS = [
  {
    id: 1,
    name: "Alexander & Sophia Van Der Bilt",
    location: "Zurich, Switzerland",
    country: "Switzerland",
    property: "Villa Solis Clifftop Sanctuary",
    quote: "Acquiring a home overseas felt daunting until we engaged Azure Bay Residences. Their legal team navigated cross-border structuring flawlessly, and the craftsmanship of our clifftop villa exceeded even our highest expectations.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    tag: "Freehold Acquisition"
  },
  {
    id: 2,
    name: "Marcus Sterling",
    location: "London, United Kingdom",
    country: "United Kingdom",
    property: "The Horizon Marina Penthouse",
    quote: "From our first WhatsApp inquiry to key handover, Azure Bay operated with absolute transparency and white-glove precision. The rental yields on the marina penthouse have surpassed projected returns by 18%.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    tag: "High-Yield Marina Asset"
  },
  {
    id: 3,
    name: "Dr. Elena Rostova",
    location: "Toronto, Canada",
    country: "Canada",
    property: "Azure Haven Waterfront Villa",
    quote: "The quiet luxury of the architecture and the team's commitment to preserving natural coastal vegetation were what won me over. Their private concierge made our family relocation seamless.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    tag: "Primary Coastal Home"
  },
  {
    id: 4,
    name: "Henrik & Astrid Lindqvist",
    location: "Stockholm, Sweden",
    country: "Sweden",
    property: "Eden Crest Hillside Villa",
    quote: "The bioclimatic pavilion design and negative-edge pool integration into the pine bluffs is pure architectural poetry. We spend four months a year here, completely insulated in tranquility.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    tag: "Custom Hillside Build"
  },
  {
    id: 5,
    name: "Faisal & Layla Al-Hassan",
    location: "Dubai, United Arab Emirates",
    country: "UAE",
    property: "El Mirador Grand Oceanfront Estate",
    quote: "Azure Bay's discretionary private office treated our privacy and family office requirements with supreme professionalism. The title escrow execution was instantaneous and fully unencumbered.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&h=240&q=80",
    rating: 5,
    tag: "Ultra-Prime Estate"
  }
];

// Curated Enclaves for Interactive Neighborhood Guide
const ENCLAVES = [
  {
    name: "Azure Bay Coast",
    tagline: "Clifftop Sanctuaries & Direct Oceanfront",
    description: "Dramatic limestone promontories, private beach paths, and unobstructed 270-degree turquoise horizons.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    lifestyle: "Oceanfront Living • Beach Club",
    avgYield: "9.4% Net",
    filterParam: "Azure Bay Coast"
  },
  {
    name: "Azure Marina",
    tagline: "Waterfront Towers & Superyacht Berths",
    description: "Deepwater harbor promenades, fine dining, private 120ft yacht slips, and lock-and-leave sky penthouses.",
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
    lifestyle: "Nautical Luxury • Promenade",
    avgYield: "10.8% Net",
    filterParam: "Azure Marina"
  },
  {
    name: "Pine Ridge Highlands",
    tagline: "Cool-Climate Hillside Pavilions",
    description: "Elevated 400m above sea level with breezes, volcanic stone architecture, and sweeping valley-to-sea vistas.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    lifestyle: "Zen Mountain Living • Seclusion",
    avgYield: "8.6% Net",
    filterParam: "Pine Ridge Highlands"
  },
  {
    name: "Palm Gardens Quarter",
    tagline: "Mediterranean Courtyard Enclaves",
    description: "Tree-lined shaded boulevards, artisan terracotta facades, walled citrus gardens, and quiet walking promenades.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    lifestyle: "Boutique Elegance • Low HOA",
    avgYield: "9.1% Net",
    filterParam: "Palm Gardens Quarter"
  }
];

// Nearby Location Highlights for Home Page
const LOCATION_HIGHLIGHTS = [
  {
    title: "Azure Bay White Sand Beach",
    distance: "300 meters (4 min walk)",
    description: "Pristine private cove with calm turquoise waters and private beach club service.",
    icon: "waves"
  },
  {
    title: "Azure International Marina & Yacht Club",
    distance: "1.2 km (3 min drive)",
    description: "Full-service deepwater marina accommodating vessels up to 120 feet with waterfront dining.",
    icon: "anchor"
  },
  {
    title: "The Promenade Fine Dining District",
    distance: "1.8 km (5 min drive)",
    description: "Michelin-starred culinary experiences, artisan bakeries, and luxury boutique shopping.",
    icon: "utensils"
  },
  {
    title: "Azure Bay International Airport (Private Jet Terminal)",
    distance: "18 km (20 min drive)",
    description: "Seamless private aviation customs clearance and regional commercial connections.",
    icon: "plane"
  }
];

// FAQ Data
const FAQS = [
  {
    question: "Can foreign nationals purchase property with 100% legal ownership?",
    answer: "Yes. All properties offered by Azure Bay Residences qualify for direct, 100% freehold foreign ownership or long-term renewable 99-year registered leases, depending on the buyer's preference and legal residency status. Our in-house legal counsel facilitates all title deed registrations through accredited government notaries."
  },
  {
    question: "What is the typical payment schedule for off-plan and completed properties?",
    answer: "For completed residences, purchase terms typically require a 10% refundable earnest deposit, followed by 90% at notary deed execution (within 30–60 days). For bespoke builds and off-plan acquisitions, payments are tied directly to certified construction milestones: 20% reservation, 20% foundation, 25% roof completion, 25% interior finishes, and 10% upon formal key handover."
  },
  {
    question: "What taxes, notary fees, and recurring costs should international buyers expect?",
    answer: "Closing costs typically total between 3% and 4.5% of the deeded purchase price, covering government transfer taxes, independent legal fees, and official notary stamps. Annual property taxes are exceptionally favorable at approximately 0.25% to 0.4%, and monthly estate maintenance covers 24/7 security, landscaping, and community amenities."
  },
  {
    question: "How does the private viewing process work for international clients?",
    answer: "We offer both immersive 4K live guided video walkthroughs with our senior brokers and curated VIP Discovery Trips. For clients visiting in person, our concierge arranges airport transfers, luxury accommodation, and private chauffeur-driven viewings of our estates and private clubs."
  },
  {
    question: "Are financing and mortgage options available for overseas purchasers?",
    answer: "Yes. We maintain preferred relationships with premier international private banks that provide cross-border mortgage lending for qualified foreign buyers up to 60–70% loan-to-value (LTV). Alternatively, developer installment plans are available with 0% interest during active construction periods."
  },
  {
    question: "What after-sales and asset management services do you provide?",
    answer: "Azure Bay Residences operates a dedicated full-service asset management division. Services include turnkey furnishing packages, 24/7 preventative maintenance, high-end short-term vacation rental management (including guest screening and cleaning), bill payments, and tax compliance reporting."
  }
];

// Team Members for About Page
const TEAM_MEMBERS = [
  {
    name: "Julian De La Torre",
    role: "Founder & Chief Executive Officer",
    bio: "Over 22 years spearheading ultra-prime coastal developments across Southern Europe, the Caribbean, and Central America.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=80"
  },
  {
    name: "Camille Moreau",
    role: "Principal Architectural Director",
    bio: "Renowned French architect specializing in passive bioclimatic villa design, sustainable luxury materials, and cantilevered infinity structures.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=80"
  },
  {
    name: "Tariq Al-Mansoor",
    role: "Managing Director, International Investments",
    bio: "Advises sovereign wealth funds, family offices, and high-net-worth individuals on offshore property portfolios and tax-advantaged holding structures.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=80"
  },
  {
    name: "Isabella Rossi",
    role: "Head of Client Experience & Private Concierge",
    bio: "Directs client onboarding, bespoke viewings, and VIP discovery stays with impeccable attention to detail and discretion.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=750&q=80"
  }
];

// Multi-Currency Engine
const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)', flag: '🇺🇸', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)', flag: '🇪🇺', locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)', flag: '🇬🇧', locale: 'en-GB' },
  AED: { code: 'AED', symbol: 'AED ', rate: 3.67, label: 'AED (د.إ)', flag: '🇦🇪', locale: 'ar-AE' },
  SGD: { code: 'SGD', symbol: 'S$', rate: 1.34, label: 'SGD (S$)', flag: '🇸🇬', locale: 'en-SG' },
  IDR: { code: 'IDR', symbol: 'Rp ', rate: 15600, label: 'IDR (Rp)', flag: '🇮🇩', locale: 'id-ID' }
};

let currentCurrency = (typeof localStorage !== 'undefined' && localStorage.getItem('azure_currency')) || 'USD';

function setAppCurrency(currencyCode) {
  if (CURRENCIES[currencyCode]) {
    currentCurrency = currencyCode;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('azure_currency', currencyCode);
    }
  }
}

function formatCurrency(amountUSD, currencyCode) {
  const code = currencyCode || currentCurrency || 'USD';
  const curr = CURRENCIES[code] || CURRENCIES.USD;
  const converted = Math.round(amountUSD * curr.rate);
  
  if (code === 'IDR') {
    return 'Rp ' + converted.toLocaleString('id-ID');
  }
  if (code === 'AED') {
    return 'AED ' + converted.toLocaleString('en-US');
  }
  return new Intl.NumberFormat(curr.locale, {
    style: 'currency',
    currency: curr.code,
    maximumFractionDigits: 0
  }).format(converted);
}

// Backwards-compatible helper that respects active currency
function formatUSD(number) {
  return formatCurrency(number, currentCurrency);
}

// Masterplan Pins Mapping (Coordinates on Resort Aerial Blueprint)
const MASTERPLAN_UNITS = [
  { id: "villa-solis", name: "Villa Solis", x: 18, y: 32, type: "Clifftop Villa", status: "Available", price: 2450000 },
  { id: "the-horizon-penthouse", name: "Azure Horizon", x: 74, y: 22, type: "Marina Penthouse", status: "Available", price: 1890000 },
  { id: "villa-botanica", name: "Villa Botanica", x: 42, y: 58, type: "Sanctuary Villa", status: "Reserved", price: 2150000 },
  { id: "pine-ridge-estate", name: "Pine Ridge Estate", x: 26, y: 78, type: "Highland Estate", status: "Available", price: 1680000 },
  { id: "coral-cove-residence", name: "Coral Cove", x: 12, y: 52, type: "Waterfront Villa", status: "Sold", price: 3200000 },
  { id: "azure-heights-penthouse", name: "Azure Heights", x: 82, y: 38, type: "Sky Residence", status: "Available", price: 1450000 },
  { id: "palm-grove-townhouse", name: "Palm Grove", x: 55, y: 68, type: "Townhouse", status: "Available", price: 920000 },
  { id: "villa-marina-blu", name: "Villa Marina Blu", x: 68, y: 48, type: "Marina Villa", status: "Available", price: 2780000 },
  { id: "highland-crest-land", name: "Highland Crest", x: 34, y: 88, type: "Land Parcel", status: "Available", price: 850000 },
  { id: "the-sanctuary-penthouse", name: "The Sanctuary", x: 88, y: 15, type: "Trophy Penthouse", status: "Reserved", price: 3850000 },
  { id: "cypress-ridge-villa", name: "Cypress Ridge", x: 38, y: 42, type: "Courtyard Villa", status: "Available", price: 1980000 },
  { id: "palm-quarter-townhome", name: "Palm Quarter", x: 60, y: 80, type: "Townhouse", status: "Available", price: 890000 }
];

// Attach all core objects to global window object
if (typeof window !== 'undefined') {
  window.BRAND_CONFIG = BRAND_CONFIG;
  window.DEFAULT_PROPERTIES = DEFAULT_PROPERTIES;
  window.PROPERTIES = PROPERTIES;
  window.AzureDB = AzureDB;
  window.INVESTOR_TESTIMONIALS = INVESTOR_TESTIMONIALS;
  window.FAQS = FAQS;
  window.TEAM_MEMBERS = TEAM_MEMBERS;
  window.CURRENCIES = CURRENCIES;
  window.currentCurrency = currentCurrency;
  window.setAppCurrency = setAppCurrency;
  window.formatCurrency = formatCurrency;
  window.formatUSD = formatUSD;
  window.MASTERPLAN_UNITS = MASTERPLAN_UNITS;
}

