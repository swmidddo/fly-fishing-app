// regulations.js - Australian Fish Size and Bag Regulations (Aligned with Official DPI/VFA/PIRSA/DPIRD Guidelines)

const REGULATIONS = {
    NSW: {
        stateName: "New South Wales",
        freshwater: [
            { name: "Murray Cod", minSize: 55, maxSize: 75, bagLimit: "2 (only 1 in rivers)", possessionLimit: "4", season: "Closed Sept 1 - Nov 30 (except Copeton & Blowering Dams)" },
            { name: "Golden Perch (Yellowbelly)", minSize: 30, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Rainbow Trout", minSize: 25, maxSize: null, bagLimit: "5 (dams/lakes), 2 (streams)", possessionLimit: "10", season: "Streams closed June long weekend - Oct long weekend" },
            { name: "Brown Trout", minSize: 25, maxSize: null, bagLimit: "5 (dams/lakes), 2 (streams)", possessionLimit: "10", season: "Streams closed June long weekend - Oct long weekend" },
            { name: "Brook Trout", minSize: 25, maxSize: null, bagLimit: "5 (dams/lakes), 2 (streams)", possessionLimit: "10", season: "Streams closed June long weekend - Oct long weekend" },
            { name: "Australian Bass", minSize: 0, maxSize: null, bagLimit: "2 (only 1 over 35cm in rivers)", possessionLimit: "4", season: "Rivers closed May 1 - Aug 31 (Catch & release permitted)" },
            { name: "Estuary Perch", minSize: 0, maxSize: null, bagLimit: "2 (combined with Bass, 1 over 35cm)", possessionLimit: "4", season: "Rivers closed May 1 - Aug 31 (Catch & release permitted)" },
            { name: "Silver Perch", minSize: 25, maxSize: null, bagLimit: "5 (Listed dams only)", possessionLimit: "10", season: "Protected in rivers (0 bag limit in all rivers)" },
            { name: "Macquarie Perch", minSize: "Protected", maxSize: "N/A", bagLimit: "0", possessionLimit: "0", season: "Protected species. Total closure in all waters" },
            { name: "Trout Cod", minSize: "Protected", maxSize: "N/A", bagLimit: "0", possessionLimit: "0", season: "Protected species. Total closure, return to water immediately" },
            { name: "Eastern Freshwater Cod", minSize: "Protected", maxSize: "N/A", bagLimit: "0", possessionLimit: "0", season: "Protected species. Total closure in all waters" },
            { name: "Murray Crayfish", minSize: 10, maxSize: 12, bagLimit: "2", possessionLimit: "4", season: "Open June 1 - Aug 31 only (Slot limit 10–12cm)" },
            { name: "European Carp", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Declared pest. Do not return to water alive" },
            { name: "Redfin Perch", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Declared pest. Do not return to water alive" }
        ],
        saltwater: [
            { name: "Dusky Flathead", minSize: 36, maxSize: 70, bagLimit: "5", possessionLimit: "10", season: "Open all year (Slot limit 36–70cm, all > 70cm must be released)" },
            { name: "Yellowfin Bream", minSize: 25, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Snapper", minSize: 30, maxSize: null, bagLimit: "10", possessionLimit: "10", season: "Open all year" },
            { name: "Sand Whiting", minSize: 27, maxSize: null, bagLimit: "20", possessionLimit: "20", season: "Open all year" },
            { name: "Mulloway", minSize: 70, maxSize: null, bagLimit: "1", possessionLimit: "2", season: "Open all year" },
            { name: "Kingfish (Yellowtail)", minSize: 65, maxSize: null, bagLimit: "5", possessionLimit: "5", season: "Open all year" },
            { name: "Australian Salmon", minSize: 0, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year (No min size limit)" },
            { name: "Tarwhine", minSize: 20, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Tailor", minSize: 30, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Luderick (Blackfish)", minSize: 27, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Silver Trevally", minSize: 30, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Mahi Mahi (Dorado)", minSize: 60, maxSize: null, bagLimit: "10 (only 1 over 110cm)", possessionLimit: "20", season: "Open all year" },
            { name: "Spanish Mackerel", minSize: 75, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Eastern Blue Groper", minSize: "Protected", maxSize: "N/A", bagLimit: "0", possessionLimit: "0", season: "Protected state fish. Total no-take closure in all NSW waters" },
            { name: "Blue Swimmer Crab", minSize: 6.5, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Mud Crab", minSize: 8.5, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" }
        ]
    },
    VIC: {
        stateName: "Victoria",
        freshwater: [
            { name: "Murray Cod", minSize: 55, maxSize: 75, bagLimit: "1 (Rivers), 2 (Lakes)", possessionLimit: "4", season: "Closed Sept 1 - Nov 30 (except Lake Eildon)" },
            { name: "Golden Perch", minSize: 30, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Brown Trout", minSize: 0, maxSize: null, bagLimit: "5 (only 2 over 35cm in streams)", possessionLimit: "10", season: "Streams closed June 9 - Sept 4" },
            { name: "Rainbow Trout", minSize: 0, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Streams closed June 9 - Sept 4" },
            { name: "Australian Bass", minSize: 27, maxSize: null, bagLimit: "2", possessionLimit: "4", season: "Open all year" },
            { name: "Estuary Perch", minSize: 27, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Silver Perch", minSize: 30, maxSize: null, bagLimit: "5 (Stocked dams only)", possessionLimit: "10", season: "Rivers closed all year (protected)" },
            { name: "Trout Cod", minSize: "Protected", maxSize: "N/A", bagLimit: "0", possessionLimit: "0", season: "Protected. Release immediately" },
            { name: "Macquarie Perch", minSize: "Protected (most areas)", maxSize: "N/A", bagLimit: "0 (except select dams)", possessionLimit: "0", season: "Check VFA regulations, closed in most rivers" },
            { name: "European Carp", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Pest species. Do not return to water alive" },
            { name: "Redfin Perch", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Open all year" }
        ],
        saltwater: [
            { name: "Dusky Flathead", minSize: 30, maxSize: 55, bagLimit: "5", possessionLimit: "10", season: "Open all year (slot limit 30-55cm)" },
            { name: "Sand Flathead", minSize: 27, maxSize: null, bagLimit: "20 (combined)", possessionLimit: "40", season: "Open all year" },
            { name: "Snapper", minSize: 28, maxSize: null, bagLimit: "10 (only 3 over 40cm)", possessionLimit: "20", season: "Open all year" },
            { name: "King George Whiting", minSize: 27, maxSize: null, bagLimit: "20", possessionLimit: "40", season: "Open all year" },
            { name: "Black Bream", minSize: 28, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Silver Trevally", minSize: 20, maxSize: null, bagLimit: "20", possessionLimit: "40", season: "Open all year" },
            { name: "Tailor", minSize: 23, maxSize: null, bagLimit: "20", possessionLimit: "40", season: "Open all year" },
            { name: "Mulloway", minSize: 60, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Luderick", minSize: 23, maxSize: null, bagLimit: "20", possessionLimit: "40", season: "Open all year" },
            { name: "Garfish", minSize: 0, maxSize: null, bagLimit: "40", possessionLimit: "80", season: "Open all year" }
        ]
    },
    QLD: {
        stateName: "Queensland",
        freshwater: [
            { name: "Barramundi", minSize: 58, maxSize: 120, bagLimit: "5", possessionLimit: "10", season: "Closed Nov 1 - Jan 31 (East Coast rivers)" },
            { name: "Golden Perch", minSize: 30, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Murray Cod", minSize: 60, maxSize: 110, bagLimit: "2", possessionLimit: "4", season: "Closed Sept 1 - Nov 30" },
            { name: "Sooty Grunter", minSize: 28, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Saratoga", minSize: 50, maxSize: null, bagLimit: "1", possessionLimit: "2", season: "Open all year" },
            { name: "Silver Perch", minSize: 30, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Mary River Cod", minSize: "Protected", maxSize: "N/A", bagLimit: "0", possessionLimit: "0", season: "Protected. Total closure in Mary River system" },
            { name: "Tilapia", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Declared pest. Euthanise humanely, do not release" }
        ],
        saltwater: [
            { name: "Dusky Flathead", minSize: 40, maxSize: 75, bagLimit: "5", possessionLimit: "10", season: "Open all year (slot limit 40-75cm)" },
            { name: "Yellowfin Bream", minSize: 25, maxSize: null, bagLimit: "30", possessionLimit: "30", season: "Open all year" },
            { name: "Snapper", minSize: 35, maxSize: null, bagLimit: "4 (only 1 over 70cm)", possessionLimit: "8", season: "Closed July 15 - Aug 15" },
            { name: "Mangrove Jack", minSize: 35, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Spanish Mackerel", minSize: 75, maxSize: null, bagLimit: "1", possessionLimit: "2", season: "Closed periods apply by zone" },
            { name: "Giant Trevally", minSize: 35, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Sand Whiting", minSize: 25, maxSize: null, bagLimit: "30", possessionLimit: "30", season: "Open all year" },
            { name: "Tailor", minSize: 35, maxSize: null, bagLimit: "20", possessionLimit: "40", season: "Open all year" },
            { name: "Queenfish", minSize: 50, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" }
        ]
    },
    WA: {
        stateName: "Western Australia",
        freshwater: [
            { name: "Rainbow Trout", minSize: 30, maxSize: null, bagLimit: "4", possessionLimit: "8", season: "Closed July 1 - Aug 31" },
            { name: "Brown Trout", minSize: 30, maxSize: null, bagLimit: "4", possessionLimit: "8", season: "Closed July 1 - Aug 31" },
            { name: "Redfin Perch", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Open all year" },
            { name: "European Carp", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Pest. Do not return to water alive" },
            { name: "Marron", minSize: 7.6, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Strict open season (typically Jan-Feb), permit required" }
        ],
        saltwater: [
            { name: "Pink Snapper", minSize: 41, maxSize: null, bagLimit: "2", possessionLimit: "4", season: "Closed periods apply for Cockburn Sound & Shark Bay" },
            { name: "Barramundi", minSize: 55, maxSize: 80, bagLimit: "2", possessionLimit: "4", season: "Open all year (slot limit 55-80cm)" },
            { name: "King George Whiting", minSize: 28, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Tarwhine", minSize: 25, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Tailor", minSize: 30, maxSize: null, bagLimit: "8 (only 2 over 50cm)", possessionLimit: "16", season: "Open all year" },
            { name: "Black Bream", minSize: 25, maxSize: null, bagLimit: "6", possessionLimit: "12", season: "Open all year" },
            { name: "Flathead (Blue-spotted/Southern)", minSize: 30, maxSize: null, bagLimit: "8", possessionLimit: "16", season: "Open all year" },
            { name: "Giant Trevally", minSize: 35, maxSize: null, bagLimit: "2", possessionLimit: "4", season: "Open all year" },
            { name: "Queenfish", minSize: 50, maxSize: null, bagLimit: "3", possessionLimit: "6", season: "Open all year" }
        ]
    },
    SA: {
        stateName: "South Australia",
        freshwater: [
            { name: "Murray Cod", minSize: 55, maxSize: 75, bagLimit: "1", possessionLimit: "2", season: "Closed Aug 1 - Dec 31 (Catch & Release permitted in some zones)" },
            { name: "Golden Perch", minSize: 33, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Brown Trout", minSize: 28, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Rainbow Trout", minSize: 28, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Trout Cod", minSize: "Protected", maxSize: "N/A", bagLimit: "0", possessionLimit: "0", season: "Protected. Heavy penalties apply" },
            { name: "European Carp", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Pest. Do not release back into water" }
        ],
        saltwater: [
            { name: "Snapper", minSize: 38, maxSize: null, bagLimit: "0 (Spencer Gulf/GSV/West Coast closed)", possessionLimit: "0", season: "Strict fishery closures in place. South East zone open: limit 1" },
            { name: "King George Whiting", minSize: 32, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Garfish", minSize: 23, maxSize: null, bagLimit: "20", possessionLimit: "40", season: "Open all year" },
            { name: "Salmon (Western Australian)", minSize: 21, maxSize: null, bagLimit: "20 (only 5 over 35cm)", possessionLimit: "40", season: "Open all year" },
            { name: "Black Bream", minSize: 28, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Yellowfin Whiting", minSize: 24, maxSize: null, bagLimit: "20", possessionLimit: "40", season: "Open all year" },
            { name: "Sand Flathead", minSize: 30, maxSize: null, bagLimit: "10", possessionLimit: "20", season: "Open all year" },
            { name: "Mulloway", minSize: 82, maxSize: null, bagLimit: "2 (Coorong area), 5 (elsewhere)", possessionLimit: "10", season: "Open all year" }
        ]
    },
    TAS: {
        stateName: "Tasmania",
        freshwater: [
            { name: "Brown Trout", minSize: 22, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Streams closed May - Aug (check IFS regulations)" },
            { name: "Rainbow Trout", minSize: 22, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Streams closed May - Aug (check IFS regulations)" },
            { name: "Atlantic Salmon", minSize: 30, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open during inland season" },
            { name: "Brook Trout", minSize: 22, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Streams closed May - Aug (check IFS)" },
            { name: "European Carp", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Pest. Report sightings immediately to IFS" }
        ],
        saltwater: [
            { name: "Sand Flathead", minSize: 32, maxSize: null, bagLimit: "10 (only 2 over 40cm)", possessionLimit: "20", season: "Open all year (Tiger/Dusky flathead 32cm limit)" },
            { name: "Striped Trumpeter", minSize: 45, maxSize: null, bagLimit: "4", possessionLimit: "8", season: "Closed Sept 1 - Oct 31" },
            { name: "Sea Garfish", minSize: 25, maxSize: null, bagLimit: "15", possessionLimit: "30", season: "Open all year" },
            { name: "Bream (Black)", minSize: 30, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Australian Salmon", minSize: 20, maxSize: null, bagLimit: "15", possessionLimit: "30", season: "Open all year" },
            { name: "King George Whiting", minSize: 35, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Silver Trevally", minSize: 22, maxSize: null, bagLimit: "15", possessionLimit: "30", season: "Open all year" }
        ]
    },
    NT: {
        stateName: "Northern Territory",
        freshwater: [
            { name: "Barramundi", minSize: 55, maxSize: null, bagLimit: "5 (only 1 over 90cm)", possessionLimit: "5", season: "Open all year (Regional management closures apply)" },
            { name: "Sooty Grunter", minSize: 25, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Saratoga", minSize: 50, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" }
        ],
        saltwater: [
            { name: "Barramundi", minSize: 55, maxSize: null, bagLimit: "5 (only 1 over 90cm)", possessionLimit: "5", season: "Open all year" },
            { name: "Golden Snapper", minSize: 30, maxSize: null, bagLimit: "3", possessionLimit: "3", season: "Open all year" },
            { name: "Mangrove Jack", minSize: 35, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Spanish Mackerel", minSize: 75, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Giant Trevally", minSize: 0, maxSize: null, bagLimit: "3", possessionLimit: "6", season: "Open all year" },
            { name: "Queenfish", minSize: 50, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" }
        ]
    },
    ACT: {
        stateName: "Australian Capital Territory",
        freshwater: [
            { name: "Murray Cod", minSize: 55, maxSize: 75, bagLimit: "1", possessionLimit: "2", season: "Closed Sept 1 - Nov 30" },
            { name: "Golden Perch", minSize: 30, maxSize: null, bagLimit: "5", possessionLimit: "10", season: "Open all year" },
            { name: "Brown Trout", minSize: 25, maxSize: null, bagLimit: "2", possessionLimit: "4", season: "Closed June long weekend - Oct long weekend" },
            { name: "Rainbow Trout", minSize: 25, maxSize: null, bagLimit: "2", possessionLimit: "4", season: "Closed June long weekend - Oct long weekend" },
            { name: "Silver Perch", minSize: 30, maxSize: null, bagLimit: "5 (Stocked dams only)", possessionLimit: "10", season: "Protected in rivers (Illegal to take)" },
            { name: "Trout Cod", minSize: "Protected", maxSize: "N/A", bagLimit: "0", possessionLimit: "0", season: "Protected. Return to water immediately" },
            { name: "European Carp", minSize: "No Limit (Pest)", maxSize: "N/A", bagLimit: "Unlimited", possessionLimit: "Unlimited", season: "Pest. Do not return to water alive" },
            { name: "Australian Bass", minSize: 25, maxSize: null, bagLimit: "2", possessionLimit: "4", season: "Open all year" }
        ],
        saltwater: [
            { name: "No marine waters in ACT", minSize: 0, maxSize: null, bagLimit: "N/A", possessionLimit: "N/A", season: "Landlocked territory" }
        ]
    }
};

window.REGULATIONS = REGULATIONS;
