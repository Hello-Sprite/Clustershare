(() => {
const cats = [
  "All",
  "STEM & Lab",
  "Curriculum Sets",
  "Classroom Furniture",
  "Storage & Office",
];
const seed = [
  {
    id: 1,
    title: "TI-84 Plus CE Calculator Caddy",
    cat: 1,
    school: "Piney Grove Middle School",
    qty: "10 calculators + charging caddy",
    condition: "Excellent condition",
    value: 1100,
    image:
      "https://underwooddistributing.com/cdn/shop/files/ti-84-plus-ce-teacher-pack-underwood-distributing-co--11.png?v=1784232945&width=1000",
    pos: "center",
    urgent: true,
    count: 10,
    unitValue: 110,
    source: "",
  },
  {
    id: 2,
    title: "Stackable Classroom Chairs",
    cat: 3,
    school: "Lambert High School",
    qty: "6 chairs · 18-inch seat height",
    condition: "Gently used",
    value: 240,
    image: "https://www.officeboffins.co.uk/media/img/shop/pd/031442.jpg",
    swap: true,
    count: 6,
    unitValue: 40,
    source: "",
  },
  {
    id: 3,
    title: "Vernier Sensor & Probe Lab Kit",
    cat: 1,
    school: "South Forsyth High School",
    qty: "8 temperature probes + charging station",
    condition: "Excellent condition",
    value: 640,
    image:
      "https://www.dynatech.de/media/c7/6b/81/1674706448/f05c39bd5bf54ef7a3c0f51b3e02877d.jpg",
    count: 8,
    unitValue: 80,
    source: "",
  },
  {
    id: 4,
    title: "The Great Gatsby · Class Novel Set",
    cat: 2,
    school: "South Forsyth High School",
    qty: "Class set of 30 paperbacks",
    condition: "Gently used",
    value: 240,
    image:
      "https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/QEUAAOSwzKNnyD~e/%24_57.JPG?set_id=880000500F",
    pos: "center",
    count: 30,
    unitValue: 8,
    source: "",
  },
  {
    id: 5,
    title: "Mobile Magnetic Whiteboards",
    cat: 3,
    school: "South Forsyth Middle School",
    qty: "2 double-sided boards · 48 × 24 inches",
    condition: "Gently used",
    value: 320,
    image: "https://m.media-amazon.com/images/I/51AKrPL4JnL.jpg",
    count: 2,
    unitValue: 160,
    source: "",
  },
  {
    id: 6,
    title: "Leveled Guided Reading Sets",
    cat: 2,
    school: "Shiloh Point Elementary",
    qty: "80 leveled readers · levels J–M · labeled bins",
    condition: "Good condition",
    value: 400,
    image:
      "https://img.lakeshorelearning.com/is/image/OCProduction/tt160x?fmt=jpeg&qlt=85&wid=1000",
    swap: true,
    count: 80,
    unitValue: 5,
    source: "",
  },
  {
    id: 7,
    title: "Classroom Library Book Bins",
    cat: 4,
    school: "Big Creek Elementary",
    qty: "12 book bins · label holders included",
    condition: "Excellent condition",
    value: 72,
    image:
      "https://img.lakeshorelearning.com/is/image/OCProduction/lm453?qlt=85&wid=1000",
    count: 12,
    unitValue: 6,
    source: "",
  },
  {
    id: 8,
    title: "Student Microscope Lab Set",
    cat: 1,
    school: "Lakeside Middle School",
    qty: "4 compound microscopes · 40–400×",
    condition: "Excellent condition",
    value: 800,
    image:
      "https://cdn.schoolspecialty.com/fd9cc405-998d-4296-aebe-b1e30153a260/2132612_A_JPG%20Output.jpg?bg-color=ffffff&canvas=700%2C700&fit=bounds&height=700&width=700",
    count: 4,
    unitValue: 200,
    source: "",
  },
  {
    id: 9,
    title: "Triple Beam Balances",
    cat: 1,
    school: "South Forsyth High School",
    count: 4,
    unitValue: 120,
    qty: "4 balances · 610 g capacity",
    value: 480,
    condition: "Excellent condition",
    image: "https://m.media-amazon.com/images/I/61PgcEAPNiL.jpg",
    swap: false,
    source:
      "https://www.cart2india.com/analytical-balances/bonvoisin-triple-beam-scale-2610g-x-01g-mechanical-lab-scale-with-stainless-steel-platform-balance-scale-pan-balance-for-classroom/00000000004389958459",
  },
  {
    id: 10,
    title: "Graduated Cylinder Lab Sets",
    cat: 1,
    school: "South Forsyth Middle School",
    count: 6,
    unitValue: 20,
    qty: "6 sets · 10, 25, 50 & 100 mL cylinders",
    value: 120,
    condition: "Gently used",
    image:
      "https://assets.thermofisher.com/TFS-Assets/CCG/Thermo-Scientific/product-images/20-1582224-02540270-STD-00.jpg-650.jpg",
    swap: false,
    source: "https://www.thermofisher.com/order/catalog/product/3662-1234",
  },
  {
    id: 11,
    title: "Safety Goggles & Storage Caddy",
    cat: 1,
    school: "Lakeside Middle School",
    count: 30,
    unitValue: 4,
    qty: "30 splash goggles · caddy included",
    value: 120,
    condition: "Good condition",
    image:
      "https://www.hand2mind.com/media/catalog/product/e/5/e557c33a2f67407a49289e1ceb59a2ce67c4ca1f.jpg?bg-color=255%2C255%2C255&canvas=480%3A480&fit=bounds&height=480&quality=80&width=480",
    swap: false,
    source: "https://www.hand2mind.com/item/elementary-school-goggle-kit",
  },
  {
    id: 12,
    title: "Arduino Starter Packs",
    cat: 1,
    school: "Lambert High School",
    count: 6,
    unitValue: 65,
    qty: "6 kits · boards, breadboards & components",
    value: 390,
    condition: "Excellent condition",
    image:
      "https://thepihut.com/cdn/shop/files/arduino-starter-kit-arduino-k000007-41151529713859_1000x.jpg?v=1699615943",
    swap: false,
    source: "https://thepihut.com/products/arduino-starter-kit",
  },
  {
    id: 13,
    title: "Reusable Dissection Pan Sets",
    cat: 1,
    school: "South Forsyth High School",
    count: 12,
    unitValue: 12,
    qty: "12 pans · reusable inserts · no specimens",
    value: 144,
    condition: "Gently used",
    image:
      "https://gosciencecrazy.com/cdn/shop/files/360_20_dissecting_20pan__amaseo_4_19d336ba-8e65-4296-9ab8-c35511bc97a1_1024x.jpg?v=1746731619",
    swap: false,
    source:
      "https://gosciencecrazy.com/products/dissection-kit-with-dissecting-pan-and-tool-set-1",
  },
  {
    id: 14,
    title: "Solar System Orbital Model",
    cat: 1,
    school: "Piney Grove Middle School",
    count: 1,
    unitValue: 85,
    qty: "1 tabletop model · complete planet set",
    value: 85,
    condition: "Good condition",
    image:
      "https://myriadsgifts.com/cdn/shop/products/e14f5bf0-de8b-5a38-ae67-6bb6f83afb4f_530x%402x.jpg?v=1678390025",
    swap: true,
    source:
      "https://myriadsgifts.com/products/thames-kosmos-orbiting-solar-system-stem-kit-build-a-rotating-solar-system-difficulty-level-intermediate",
  },
  {
    id: 15,
    title: "1984 · AP Literature Class Set",
    cat: 2,
    school: "Lambert High School",
    count: 30,
    unitValue: 9,
    qty: "Class set of 30 paperbacks",
    value: 270,
    condition: "Excellent condition",
    image:
      "https://classroomlibrarycompany.com/152-large_default/1984-novel-units-classroom-kit.jpg",
    swap: false,
    source: "https://classroomlibrarycompany.com/13-teacher-resources",
  },
  {
    id: 16,
    title: "Hamlet · Classroom Reading Pack",
    cat: 2,
    school: "South Forsyth High School",
    count: 30,
    unitValue: 6,
    qty: "Class set of 30 paperbacks",
    value: 180,
    condition: "Gently used",
    image: "https://i.ebayimg.com/images/g/YTAAAOSww3tmDA6k/s-l1200.jpg",
    swap: false,
    source: "https://www.ebay.com/itm/305488483111",
  },
  {
    id: 17,
    title: "Spanish–English Classroom Dictionaries",
    cat: 2,
    school: "South Forsyth Middle School",
    count: 24,
    unitValue: 12,
    qty: "24 student dictionaries · matching edition",
    value: 288,
    condition: "Good condition",
    image:
      "https://media.officedepot.com/images/f_auto%2Cq_auto%2Ce_sharpen%2Ch_450/products/8157764/8157764",
    swap: false,
    source:
      "https://www.odpbusiness.com/a/products/8157764/Websters-Spanish-English-Dictionaries-For-Students/",
  },
  {
    id: 18,
    title: "Phonics Flipcharts",
    cat: 2,
    school: "Shiloh Point Elementary",
    count: 4,
    unitValue: 25,
    qty: "4 flipcharts · phonics & word building",
    value: 100,
    condition: "Excellent condition",
    image:
      "https://s3-ap-southeast-2.amazonaws.com/wc-prod-pim/JPEG_1000x1000/SMFPA_studymate_phonic_alphabet_flip_chart.jpg",
    swap: false,
    source:
      "https://narodnatribuna.info/lists/p/the-phonetic-alphabet-qld-poster-teachers-bazaar/",
  },
  {
    id: 19,
    title: "IPEVO Document Camera",
    cat: 4,
    school: "Daves Creek Elementary",
    count: 1,
    unitValue: 180,
    qty: "1 USB document camera · cable included",
    value: 180,
    condition: "Gently used",
    image:
      "https://assetlibrary.dstewart.com/ImageFolio43_files/gallery/Product_Images/Web/PNG/Zoom/153982.png",
    swap: false,
    source:
      "https://www.dstewartcanada.com/ipevo-v4k-ultra-high-definition-usb-document-camera-153982.html",
  },
  {
    id: 20,
    title: "Wireless Presentation Clickers",
    cat: 4,
    school: "Lambert High School",
    count: 4,
    unitValue: 25,
    qty: "4 clickers · USB receivers included",
    value: 100,
    condition: "Good condition",
    image:
      "https://i5.walmartimages.com/seo/QQV-Presentation-Clicker-Wireless-PowerPoint-Remote-Kit-with-USB-Receiver-2-Count-1-Pack_538b527f-0556-44fd-998c-144a3f9268ec.e38e4ab1ba7d2f433c332c63797c73ef.jpeg",
    swap: false,
    source: "https://www.walmart.com/ip/616513046",
  },
  {
    id: 21,
    title: "Classroom Headphones · 10-Pack",
    cat: 4,
    school: "Big Creek Elementary",
    count: 10,
    unitValue: 12,
    qty: "10 wired headphones · 3.5 mm connectors",
    value: 120,
    condition: "Excellent condition",
    image:
      "https://c1.neweggimages.com/productimage/nb640/B7VES2503060MHZKZC0.jpg",
    swap: false,
    source: "https://www.newegg.com/p/0TH-0798-00085",
  },
  {
    id: 22,
    title: "Rolling Chromebook Charging Cart",
    cat: 4,
    school: "Lakeside Middle School",
    count: 1,
    unitValue: 650,
    qty: "1 cart · 30 bays · power cords included",
    value: 650,
    condition: "Gently used",
    image:
      "https://www.pochar.com/cdn/shop/files/C30D-H_2_1597x1597.jpg?v=1766366770",
    swap: false,
    source: "https://www.pochar.com/collections/charging-carts",
  },
  {
    id: 23,
    title: "HDMI Switchers",
    cat: 4,
    school: "South Forsyth High School",
    count: 3,
    unitValue: 25,
    qty: "3 switches · 3 inputs / 1 output each",
    value: 75,
    condition: "Good condition",
    image: "https://m.media-amazon.com/images/I/61oXu6eeBaL.jpg",
    swap: false,
    source:
      "https://www.nellisauction.com/p/HDMI-Switch-3-in-1-Out-4K-HDMI-Switcher-Splitter-4k-2K-Aluminum/25611218",
  },
  {
    id: 24,
    title: "Short-Throw Classroom Projector",
    cat: 4,
    school: "Piney Grove Middle School",
    count: 1,
    unitValue: 550,
    qty: "1 projector · tested · remote included",
    value: 550,
    condition: "Excellent condition",
    image:
      "https://cdn.shopify.com/s/files/1/0273/3542/6147/products/1_e200bce6-a4ff-40fd-b8f5-da1f85cd9dab.jpg?v=1585773854",
    swap: false,
    source:
      "https://www.imageprointernational.com/products/epson-powerlite-530-3lcd-short-throw-projector",
  },
  {
    id: 25,
    title: "Dry-Erase Lapboards · Class Set",
    cat: 2,
    school: "Sharon Elementary",
    count: 30,
    unitValue: 3,
    qty: "30 lapboards · double-sided · 9 × 12 inches",
    value: 90,
    condition: "Gently used",
    image: "https://m.media-amazon.com/images/I/71oM-3hnWML._AC_SL1500_.jpg",
    swap: false,
    source:
      "https://www.ubuy.co.in/product/2DAT7A3M-dry-erase-boards-60pc-double-sided-lapboards-with-clearwipe-coating-small-white-boards-9-quot-x-12-q",
  },
  {
    id: 26,
    title: "Heavy-Duty Pouch Laminator",
    cat: 4,
    school: "Daves Creek Elementary",
    count: 1,
    unitValue: 150,
    qty: "1 laminator · 12-inch feed · tested",
    value: 150,
    condition: "Good condition",
    image:
      "https://cdn11.bigcommerce.com/s-xpez047bp6/images/stencil/1280x1280/products/575/1629/7020_Front_Top__84224.1628863802.1280.1280__43411.1641842773.jpg?c=1",
    swap: true,
    source:
      "https://klaico.com/la-7020-refurbished-12-heavy-duty-pouch-laminator/",
  },
  {
    id: 27,
    title: "Electric Pencil Sharpener Set",
    cat: 4,
    school: "Shiloh Point Elementary",
    count: 3,
    unitValue: 30,
    qty: "3 sharpeners · cleaned & tested",
    value: 90,
    condition: "Excellent condition",
    image:
      "https://content.oppictures.com/Master_Images/Master_Variants/Variant_500/701677.JPG",
    swap: false,
    source:
      "https://www.harperoffice.com/model-1675-teacherpro-classroom-electric-pencil-sharpener-ac-powered-4-x-7-5-x-8-black-silver-smoke--1",
  },
  {
    id: 28,
    title: "Chart Paper Easel Stands",
    cat: 3,
    school: "Big Creek Elementary",
    count: 2,
    unitValue: 65,
    qty: "2 adjustable stands · folding legs",
    value: 130,
    condition: "Gently used",
    image: "https://static.viking-direct.co.uk/is/image/odeu13/2624038",
    swap: false,
    source:
      "https://www.viking-direct.co.uk/en/professional-easel-tripod-1070h-x-710wmm-p-2624038",
  },
  {
    id: 29,
    title: "Teacher Desk Organizers",
    cat: 4,
    school: "Sharon Elementary",
    count: 6,
    unitValue: 15,
    qty: "6 organizers · assorted compartments",
    value: 90,
    condition: "Good condition",
    image:
      "https://dkc1jod44tx5p.cloudfront.net/images/products/1190Wx1190H/175215_G.jpg",
    swap: false,
    source:
      "https://www.reallygoodstuff.com/really-good-stuff-modular-6-piece-wire-desk-organizer/p/175215/",
  },
  {
    id: 30,
    title: "Base-Ten Math Manipulative Kits",
    cat: 2,
    school: "Shiloh Point Elementary",
    count: 8,
    unitValue: 22,
    qty: "8 kits · units, rods & flats",
    value: 176,
    condition: "Excellent condition",
    image:
      "https://i5.walmartimages.com/seo/Learning-Resources-Brights-Base-Ten-Classroom-Set_bca351f6-c066-4f86-94b7-1f69de8838d1.d628c92e38369748519afb117600123d.jpeg",
    swap: false,
    source:
      "https://www.walmart.com/ip/Learning-Resources-Brights-Base-Ten-Classroom-Set/44757231",
  },
  {
    id: 31,
    title: "Fraction Tiles & Activity Mats",
    cat: 2,
    school: "Daves Creek Elementary",
    count: 12,
    unitValue: 12,
    qty: "12 tile sets · reusable activity mats",
    value: 144,
    condition: "Gently used",
    image:
      "https://www.eaieducation.com/media/catalog/product/5/0/506550_L.jpg?bg-color=255%2C255%2C255&canvas=800%3A800&fit=bounds&height=800&quality=80&width=800",
    swap: false,
    source:
      "https://www.eaieducation.com/fraction-tiles-with-tray-equivalency-classroom-set-in-tub-506550.html",
  },
  {
    id: 32,
    title: "Magnetic Letter Tile Kits",
    cat: 2,
    school: "Big Creek Elementary",
    count: 10,
    unitValue: 18,
    qty: "10 kits · uppercase & lowercase letters",
    value: 180,
    condition: "Good condition",
    image:
      "https://i5.walmartimages.com/seo/Lakeshore-Double-Sided-Magnetic-Letter-Tiles_6049527f-1925-4f3b-9a32-e5365eee20e8.603387407dcd81eb18ee8fb03137b118.png",
    swap: false,
    source: "https://www.walmart.com/ip/2539850239",
  },
  {
    id: 33,
    title: "Classroom Globe",
    cat: 2,
    school: "South Forsyth Middle School",
    count: 1,
    unitValue: 60,
    qty: "1 globe · 12-inch · intact stand",
    value: 60,
    condition: "Excellent condition",
    image: "https://i.ebayimg.com/images/g/SeIAAOSworxn0vx9/s-l960.jpg",
    swap: false,
    source: "https://www.ebay.com/itm/146447128388",
  },
  {
    id: 34,
    title: "Rock & Mineral Study Collection",
    cat: 1,
    school: "Lakeside Middle School",
    count: 4,
    unitValue: 30,
    qty: "4 collections · 24 labeled samples each",
    value: 120,
    condition: "Gently used",
    image:
      "https://rockparadise.com/cdn/shop/products/1-thumbnail_IMG_9840_5827687b-def1-4f38-9b9d-8335ffe91fb2_1400x.jpg?v=1629835992",
    swap: false,
    source:
      "https://rockparadise.com/products/mineral-collection-flat-box-mixed-bulk-crystals-24-pieces",
  },
  {
    id: 35,
    title: "Spring Scale Investigation Sets",
    cat: 1,
    school: "Piney Grove Middle School",
    count: 6,
    unitValue: 15,
    qty: "6 sets · assorted measuring ranges",
    value: 90,
    condition: "Good condition",
    image:
      "https://d2x7nmti04c7jb.cloudfront.net/uploads/dc11730/dc11730_spring-balance-set-6p_v2_1.webp",
    swap: false,
    source:
      "https://www.teaching.com.au/product/spring-balance-set-8211-6-piece",
  },
  {
    id: 36,
    title: "Meter Sticks",
    cat: 1,
    school: "South Forsyth High School",
    count: 15,
    unitValue: 5,
    qty: "15 wooden meter sticks · metric markings",
    value: 75,
    condition: "Excellent condition",
    image:
      "https://cdn11.bigcommerce.com/s-se335tdcoh/images/stencil/original/products/422251/7078632/32b6301ca0abe49eebd89fb0978da8c922387b80__51806.1745771294.jpg?c=2",
    swap: true,
    source:
      "https://filingsupplies.com/math-tools/rulers/meter-stick-with-storage-hole-pack-of-6",
  },
  {
    id: 37,
    title: "Prepared Microscope Slide Sets",
    cat: 1,
    school: "Lambert High School",
    count: 6,
    unitValue: 20,
    qty: "6 boxes · 25 prepared slides per box",
    value: 120,
    condition: "Gently used",
    image:
      "https://microscopecentral.com/cdn/shop/products/microscope-prepared-slides-2_2.jpg?v=1544117111&width=1946",
    swap: false,
    source:
      "https://microscopecentral.com/products/25-glass-prepared-zoological-and-botanical-microscope-slides-with-plastic-box",
  },
  {
    id: 38,
    title: "Geometry Compass & Protractor Kits",
    cat: 2,
    school: "South Forsyth Middle School",
    count: 30,
    unitValue: 4,
    qty: "30 kits · compasses, protractors & rulers",
    value: 120,
    condition: "Good condition",
    image:
      "https://www.officecrave.com/image/cache/data/product_image_large/1069097499-500x500-0.jpg",
    swap: false,
    source:
      "https://www.officecrave.com/staedtler-compass-math-set-55060s92.html",
  },
  {
    id: 39,
    title: "Classroom Pocket Charts",
    cat: 2,
    school: "Sharon Elementary",
    count: 4,
    unitValue: 18,
    qty: "4 hanging charts · sentence-strip pockets",
    value: 72,
    condition: "Excellent condition",
    image:
      "https://cdn11.bigcommerce.com/s-se335tdcoh/images/stencil/original/products/418614/7074998/812c6798087396ac230a5ea741dc0f47656edb3b__54064.1745770444.jpg?c=2",
    swap: false,
    source:
      "https://filingsupplies.com/classroom-essentials/organization-tools/standard-pocket-chart-35-x-42-blue",
  },
  {
    id: 40,
    title: "Classroom Rhythm Instrument Kit",
    cat: 2,
    school: "Daves Creek Elementary",
    count: 1,
    unitValue: 120,
    qty: "1 kit · 24 assorted percussion pieces",
    value: 120,
    condition: "Gently used",
    image:
      "https://img.lakeshorelearning.com/is/image/OCProduction/lc1430?fmt=jpeg&op_sharpen=0&op_usm=1%2C0.65%2C6%2C0&pscan=auto&qlt=85%2C1&resMode=sharp2&wid=800",
    swap: false,
    source:
      "https://www.lakeshorelearning.com/products/music/musical-instruments/span-stylewhite-space-nowrap30-player-span-rhythm-set/p/LC1430/",
  },
  {
    id: 41,
    title: "Art Room Paintbrush Packs",
    cat: 4,
    school: "Big Creek Elementary",
    count: 6,
    unitValue: 12,
    qty: "6 packs · 12 assorted brushes per pack",
    value: 72,
    condition: "Good condition",
    image:
      "https://i5.walmartimages.com/seo/Crayola-Paintbrush-Variety-Classpack-36-Ct-Bulk-Paint-Brushes-Bulk-School-Supplies-Classroom-Must-Haves_4e02041f-9391-4197-bbc3-d70183b50c2a_1.6df0e0d7aa6df9e90f162a38851c1b74.jpeg?odnBg=FFFFFF&odnHeight=640&odnWidth=640",
    swap: false,
    source:
      "https://business.walmart.com/ip/Crayola-Paintbrush-Variety-Classpack-36-Ct-Bulk-Paint-Brushes-Bulk-School-Supplies-Classroom-Must-Haves/55525243",
  },
  {
    id: 42,
    title: "Construction Paper Assortment",
    cat: 4,
    school: "Shiloh Point Elementary",
    count: 5,
    unitValue: 15,
    qty: "5 unopened packs · 500 sheets per pack",
    value: 75,
    condition: "Excellent condition",
    image: "https://m.media-amazon.com/images/I/614WcRjS61L.jpg",
    swap: false,
    source:
      "https://snapklik.com/en-ca/product/crayola-construction-paper-480ct-2-pack-bulk-school-supplies-for-kids-classroom-supplies-for-preschool-elementary-great-for-arts-and-crafts/05V84PU7TVHC5",
  },
  {
    id: 43,
    title: "Chart Paper Easel Pads",
    cat: 4,
    school: "Sharon Elementary",
    count: 4,
    unitValue: 35,
    qty: "4 unused pads · 25 × 30 inches",
    value: 140,
    condition: "Gently used",
    image: "https://pacon.com/isotope/i/id-3385_pa.jpg",
    swap: false,
    source: "https://pacon.com/easel-pads-535/easel-pads-unruled.html",
  },
  {
    id: 44,
    title: "Classroom Stopwatches",
    cat: 1,
    school: "Lakeside Middle School",
    count: 12,
    unitValue: 8,
    qty: "12 stopwatches · batteries included",
    value: 96,
    condition: "Good condition",
    image: "https://www.primaryict.co.uk/p/pr7021-1-large.jpg",
    swap: false,
    source:
      "https://www.primaryict.co.uk/pr7021/simple-stopwatch-set-6-learning-resourc-ler0809",
  },
  {
    id: 45,
    title: "Mobile Art Drying Rack",
    cat: 3,
    school: "Daves Creek Elementary",
    count: 1,
    unitValue: 180,
    qty: "1 rolling rack · 40 drying shelves",
    value: 180,
    condition: "Excellent condition",
    image:
      "https://www.educationaltoys.co.uk/cdn/shop/files/C1183_700x700.png?v=1698326296",
    swap: false,
    source:
      "https://www.educationaltoys.co.uk/products/drying-rack-mobile-40-large-shelf",
  },
];
const campusCodes = {
  "Denmark High School": "DHS",
  "East Forsyth High School": "EFH",
  "Forsyth Central High School": "FCH",
  "Lambert High School": "LHS",
  "North Forsyth High School": "NFH",
  "South Forsyth High School": "SFH",
  "West Forsyth High School": "WFH",
  "North Forsyth Middle School": "NFM",
  "South Forsyth Middle School": "SFM",
  "Piney Grove Middle School": "PGM",
  "Lakeside Middle School": "LMS",
  "Brookwood Elementary": "BWE",
  "Big Creek Elementary": "BCE",
  "Daves Creek Elementary": "DCE",
  "Midway Elementary": "MWE",
  "Sharon Elementary": "SHE",
  "Shiloh Point Elementary": "SPE",
};
const demoTeachers = [
  "Maya Patel",
  "Daniel Brooks",
  "Elena Ramirez",
  "Marcus Reed",
  "Lauren Chen",
  "Priya Shah",
  "Owen Mitchell",
  "Rachel Bennett",
  "Amelia Turner",
  "Noah Carter",
  "Grace Kim",
  "Sofia Martinez",
  "Ethan Williams",
  "Hannah Collins",
  "Jamal Robinson",
  "Claire Morgan",
  "Alex Nguyen",
];
const countyCampuses = Object.keys(campusCodes);
seed.forEach((a, i) => {
  if (i > 7) {
    const elementary =
      /phonics|guided|leveled|reading|book bin|base.ten|rhythm|construction paper|paintbrush|lapboard|fraction/i.test(
        a.title,
      );
    const pool = elementary
      ? countyCampuses.filter((c) => c.includes("Elementary"))
      : a.cat === 1
        ? countyCampuses.filter((c) => /High|Middle/.test(c))
        : a.cat === 2
          ? countyCampuses.filter((c) => c.includes("High"))
          : countyCampuses;
    a.school = pool[(i - 8) % pool.length];
  }
  if (a.title === "Graduated Cylinder Lab Sets")
    a.school = "North Forsyth Middle School";
  if (a.title === "Arduino Starter Packs") a.school = "Denmark High School";
  a.teacher =
    demoTeachers[countyCampuses.indexOf(a.school) % demoTeachers.length];
});
const courierRoutes = [
  {
    name: "South Forsyth supply loop",
    day: "Tuesday",
    stops: [
      ["09:00", "Denmark High School"],
      ["09:30", "Midway Elementary"],
      ["10:15", "Big Creek Elementary"],
      ["11:00", "Shiloh Point Elementary"],
    ],
  },
  {
    name: "Central & north campus loop",
    day: "Thursday",
    stops: [
      ["09:00", "Forsyth Central High School"],
      ["09:40", "North Forsyth High School"],
      ["10:00", "North Forsyth Middle School"],
      ["11:00", "East Forsyth High School"],
    ],
  },
];

seed.forEach((a) => {
  a.department = /calculator|fraction|geometry|meter|base.ten/i.test(a.title)
    ? "MATHEMATICS"
    : a.cat === 1
      ? "SCIENCE"
      : /camera|headphone|HDMI|projector|clicker|charging/i.test(a.title)
        ? "TECHNOLOGY"
        : /paint|art |rhythm|paper assortment/i.test(a.title)
          ? "ARTS"
          : a.cat === 2
            ? "LITERACY"
            : "CLASSROOM";
  a.assetId = "FC-" + (8491 + a.id);
  a.room = String(200 + ((a.id * 7) % 120));
  a.tier =
    a.condition === "Excellent condition"
      ? "TIER A: LIKE NEW"
      : a.condition === "Gently used"
        ? "TIER B: GOOD"
        : "TIER C: SERVICEABLE";
  a.offers = a.swap ? 2 + (a.id % 3) : 0;
  a.selfPickup = a.cat === 3 || /Charging Cart/.test(a.title);
});

/* Side-effect-free catalog, lifecycle, and value rules shared with tests. */
(function (root) {
  const key = (id) => String(id);
  const STATUS = Object.freeze({
    REQUESTED: "requested",
    PENDING: "pending",
    WITHDRAWN: "withdrawn",
  });
  const isActive = (record) => !!record && record.status !== STATUS.WITHDRAWN;
  function normalizeState(value) {
    const v = value && typeof value === "object" ? value : {};
    const records = (name) => (Array.isArray(v[name]) ? v[name] : []);
    return {
      ...v,
      ...(["claims", "listings", "saved"].some(
        (name) =>
          Array.isArray(v[name]) &&
          v[name].some((record) =>
            name === "claims"
              ? !(
                  record &&
                  typeof record === "object" &&
                  record.id != null &&
                  record.asset != null
                )
              : name === "listings"
                ? !(
                    record &&
                    record.id != null &&
                    typeof record.title === "string" &&
                    typeof record.school === "string"
                  )
                : !(typeof record === "string" || typeof record === "number"),
          ),
      )
        ? {
            unrecognizedRecords: {
              ...v.unrecognizedRecords,
              ...Object.fromEntries(
                ["claims", "listings", "saved"]
                  .filter((name) => Array.isArray(v[name]))
                  .map((name) => [name, v[name]]),
              ),
            },
          }
        : {}),
      claims: records("claims")
        .filter(
          (c) => c && typeof c === "object" && c.id != null && c.asset != null,
        )
        .map((c) => ({
          ...c,
          status: Object.values(STATUS).includes(c.status)
            ? c.status
            : c.type === "swap"
              ? STATUS.PENDING
              : STATUS.REQUESTED,
        })),
      saved: records("saved").filter(
        (id) => typeof id === "string" || typeof id === "number",
      ),
      listings: records("listings")
        .filter(
          (a) =>
            a &&
            a.id != null &&
            typeof a.title === "string" &&
            typeof a.school === "string",
        )
        .map((a) => ({
          ...a,
          image:
            typeof a.image === "string"
              ? a.image
              : "assets/resource-fallback.svg",
          qty: String(a.qty || "Quantity unspecified"),
          local: true,
        })),
      read: !!v.read,
      started: v.started || Date.now(),
    };
  }
  function requestFor(state, id) {
    return state.claims.find((c) => key(c.asset) === key(id) && isActive(c));
  }
  function catalog(seed, state) {
    return [...state.listings, ...seed].filter((a) => !a.archived);
  }
  function searchCorrection(query, assets) {
    const normalize = s => s.toLowerCase().replace(/white\s+boards?/g, "whiteboard").replace(/[^a-z0-9 ]/g, " ").trim();
    const words = [...new Set(assets.flatMap(a => normalize(`${a.title} ${a.school} ${a.qty}`).split(/\s+/)))];
    const distance = (a,b) => { let row = Array.from({length:b.length+1},(_,i)=>i); for(let i=1;i<=a.length;i++){let next=[i];for(let j=1;j<=b.length;j++) next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}return row[b.length]; };
    return normalize(query).split(/\s+/).map(w => {
      if(w.length<5 || words.includes(w) || words.includes(w.replace(/s$/, ""))) return w;
      const candidates = words.filter(t=>t.length>=5 && t[0]===w[0]).map(t=>[t,distance(w,t)]).sort((a,b)=>a[1]-b[1]);
      return candidates[0]?.[1]<=1 ? candidates[0][0] : w;
    }).join(" ");
  }
  function recommendations(assets, preferences = {}) {
    const {grade, subject, category} = preferences;
    if (!grade || !subject || !category) return [];
    return assets.filter(a => !a.archived && !a.swap &&
      (category === "any" || a.cat === Number(category)) &&
      (subject === "any" || (subject === "art" ? /\b(art|arts|music)\b/i.test(`${a.department || ""} ${a.title}`) : `${a.department || ""} ${a.title}`.toLowerCase().includes(subject))) &&
      (grade === "any" || a.school.includes(grade))).slice(0,3);
  }
  function selectResources(assets, state, filters = {}) {
    const q = filters.literal ? (filters.query || "").trim().toLowerCase() : searchCorrection(filters.query || "", assets);
    return assets
      .filter(
        (a) =>
          !a.archived &&
          (!filters.category || a.cat === Number(filters.category)) &&
          (!q ||
            `${a.title} ${a.school} ${a.qty} ${a.department || ""} ${a.notes || ""}`
              .toLowerCase()
              .replace(/white\s+boards?/g, "whiteboard").includes(q.replace(/s$/, ""))) &&
          (!filters.school || a.school === filters.school) &&
          (!filters.condition || a.condition === filters.condition) &&
          (!filters.method ||
            (filters.method === "pickup" ? a.selfPickup : !a.selfPickup)) &&
          (!filters.kind || (filters.kind === "swap" ? a.swap : !a.swap)) &&
          (!filters.available || !requestFor(state, a.id)),
      )
      .sort((a, b) =>
        filters.sort === "value"
          ? b.value - a.value
          : filters.sort === "name"
            ? a.title.localeCompare(b.title)
            : (b.createdAt || 0) - (a.createdAt || 0),
      );
  }
  function paginate(assets, page, size = 8) {
    const pages = Math.max(1, Math.ceil(assets.length / size));
    const current = Math.min(Math.max(1, Math.trunc(Number(page)) || 1), pages);
    return {
      page: current,
      pages,
      total: assets.length,
      first: (current - 1) * size,
      items: assets.slice((current - 1) * size, current * size),
    };
  }
  function validateRequest(asset, data, state, schools, editingId) {
    if (!asset || asset.archived)
      return "This resource is unavailable. Restore archived listings before requesting.";
    if (
      state.claims.some(
        (c) =>
          isActive(c) && key(c.asset) === key(asset.id) && c.id !== editingId,
      )
    )
      return "You already have a request for this resource. Open Your Items to review it.";
    if (
      !data.name?.trim() ||
      !data.department?.trim() ||
      !/^\S+@\S+\.\S+$/.test(data.email || "")
    )
      return "Enter your name, department, and a valid email address.";
    if (!schools.includes(data.campus) || !data.room?.trim())
      return "Choose a destination school and enter the room.";
    if (!["Cluster courier", "Self-pickup"].includes(data.method))
      return "Choose a transfer method.";
    if (asset.selfPickup && data.method !== "Self-pickup")
      return "This bulky resource requires self-pickup.";
    if (asset.swap && !data.offer?.trim())
      return "Describe the resource you would offer in exchange.";
    return "";
  }
  function createRequest(asset, data, state, schools, id, date) {
    const error = validateRequest(asset, data, state, schools);
    if (error) throw new Error(error);
    return {
      ...data,
      name: data.name.trim(),
      room: data.room.trim(),
      id: "CS-" + id,
      trackingHash: id,
      asset: asset.id,
      type: asset.swap ? "swap" : "claim",
      status: asset.swap ? STATUS.PENDING : STATUS.REQUESTED,
      date,
    };
  }
  function reviseRequest(asset, existing, data, state, schools, date) {
    if (!isActive(existing))
      throw new Error(
        "Withdrawn records cannot be revised. Create a new request.",
      );
    const error = validateRequest(asset, data, state, schools, existing.id);
    if (error) throw new Error(error);
    return {
      ...existing,
      name: data.name.trim(),
      department: data.department,
      email: data.email.trim(),
      campus: data.campus,
      room: data.room.trim(),
      method: data.method,
      offer: data.offer || "",
      date,
      updatedAt: Date.now(),
    };
  }
  function withdrawRequest(state, id) {
    return {
      ...state,
      claims: state.claims.map((c) =>
        c.id === id
          ? { ...c, status: STATUS.WITHDRAWN, updatedAt: Date.now() }
          : c,
      ),
    };
  }
  function requestLabel(c) {
    return !isActive(c)
      ? "Withdrawn"
      : c.type === "swap"
        ? "Swap proposed · pending"
        : "Transfer requested";
  }
  function fallbackImage(category) {
    return `assets/resource-category-${[1,2,3,4].includes(Number(category)) ? Number(category) : 4}.svg`;
  }
  function validPhoto(value) {
    return !value || /^https:\/\//i.test(value) || (value.length <= 500000 && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value));
  }
  function browseRecommendations(assets, state, filters = {}) {
    if (["query", "category", "school", "condition", "method", "kind", "available"].some(k => filters[k])) return [];
    return recommendations(assets, state.preferences).filter(a => !a.local && !requestFor(state, a.id));
  }
  function saveListing(state, data, schools, id) {
    const existing = state.listings.find((a) => key(a.id) === key(id)),
      count = Number(data.count),
      unitValue = data.unitValue == null || String(data.unitValue).trim() === "" ? 0 : Number(data.unitValue),
      cat = Number(data.cat);
    if (
      !["title", "unit", "teacher", "room"].every(
        (k) => typeof data[k] === "string" && data[k].trim(),
      ) ||
      !schools.includes(data.school) ||
      ![1, 2, 3, 4].includes(cat)
    )
      throw new Error(
        "Complete the resource, quantity description, educator, room, category, and campus.",
      );
    if (
      !Number.isInteger(count) ||
      count < 1 ||
      count > 1000 ||
      !Number.isFinite(unitValue) ||
      unitValue < 0 ||
      unitValue > 100000
    )
      throw new Error("Check quantity and replacement estimate.");
    if (
      ![
        "Excellent condition",
        "Good condition",
        "Gently used",
        "Serviceable",
      ].includes(data.condition)
    )
      throw new Error("Choose a valid condition.");
    if (!validPhoto(data.photo?.trim()))
      throw new Error("Choose a JPEG, PNG or WebP photo under the local storage limit.");
    const now = Date.now();
    const listing = {
      ...existing,
      id,
      title: data.title.trim(),
      unit: data.unit.trim(),
      cat,
      school: data.school,
      qty: count + " " + data.unit.trim(),
      condition: data.condition,
      count,
      unitValue,
      value: Math.round(count * unitValue * 100) / 100,
      image: data.photo?.trim() || fallbackImage(cat),
      teacher: data.teacher.trim(),
      room: data.room.trim(),
      swap: data.kind === "swap",
      selfPickup: cat === 3 || data.method === "pickup",
      department: ["", "SCIENCE", "LITERACY", "CLASSROOM", "CLASSROOM"][cat],
      assetId: existing?.assetId || "LOCAL-" + id.slice(-8).toUpperCase(),
      notes: String(data.notes || "").trim(),
      local: true,
      archived: !!existing?.archived,
      createdAt: existing?.createdAt || now,
      updatedAt: existing ? now : undefined,
    };
    // Keep active handoffs coherent when the owner changes a resource to bulky or swap-only.
    if (
      existing &&
      state.claims.some((c) => key(c.asset) === key(id) && isActive(c)) &&
      (listing.swap !== existing.swap ||
        listing.selfPickup !== existing.selfPickup)
    )
      throw new Error(
        "Withdraw active requests before changing transfer type or handoff requirements.",
      );
    return {
      ...state,
      listings: existing
        ? state.listings.map((a) => (key(a.id) === key(id) ? listing : a))
        : [listing, ...state.listings],
    };
  }
  function archiveListing(state, id) {
    return {
      ...state,
      listings: state.listings.map((a) =>
        key(a.id) === key(id)
          ? { ...a, archived: !a.archived, updatedAt: Date.now() }
          : a,
      ),
    };
  }
  function valueBreakdown(assets, state) {
    const ids = new Set(
      state.claims
        .filter((c) => isActive(c) && c.type === "claim")
        .map((c) => key(c.asset)),
    );
    return assets.filter((a) => ids.has(key(a.id)));
  }
  function requestedValue(assets, state) {
    return valueBreakdown(assets, state).reduce(
      (n, a) => n + (Number(a.value) || 0),
      0,
    );
  }
  function routeEligibility(asset, request, routes) {
    if (request.method === "Self-pickup" || asset?.selfPickup)
      return "Self-pickup: agree on timing and suitable transport directly with the school.";
    const matching = routes.find((r) =>
      [asset?.school, request.campus].every((s) =>
        r.stops.some(([, school]) => school === s),
      ),
    );
    return matching
      ? `${matching.day} sample loop includes both campuses. Confirm permission, actual service, and timing externally; no booking exists.`
      : "Outside a shared sample loop. Arrange separate campus coordination or self-pickup; no courier booking exists.";
  }
  const api = {
    fallbackImage,
    validPhoto,
    browseRecommendations,
    searchCorrection,
    recommendations,
    STATUS,
    isActive,
    normalizeState,
    requestFor,
    catalog,
    selectResources,
    paginate,
    validateRequest,
    createRequest,
    reviseRequest,
    withdrawRequest,
    requestLabel,
    saveListing,
    archiveListing,
    valueBreakdown,
    requestedValue,
    routeEligibility,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ClusterModel = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

/* Browser-local persistence with optimistic concurrency protection. */
(function (root) {
  function read(storage, key) {
    const raw = storage.getItem(key),
      value = raw ? JSON.parse(raw) : {};
    if (
      value === null ||
      typeof value !== "object" ||
      Array.isArray(value) ||
      ["claims", "saved", "listings"].some(
        (k) => k in value && !Array.isArray(value[k]),
      )
    )
      throw new Error("Unrecognized saved data");
    return { raw, value };
  }
  function commit(storage, key, expected, value) {
    if (storage.getItem(key) !== expected) throw new Error("STORAGE_CONFLICT");
    const raw = JSON.stringify(value);
    storage.setItem(key, raw);
    return raw;
  }
  const api = { read, commit };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ClusterStorage = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

function hero() {
  return `<section class="hero" aria-labelledby="home-title"><div class="hero-copy"><span class="eyebrow">The Forsyth classroom commons</span><h1 id="home-title">Made for the<br><em>next classroom.</em></h1><p>Share surplus classroom supplies, books, and equipment with Forsyth County educators. Find what your classroom needs, completely free.</p><div class="button-row"><a href="#inventory" class="primary">Browse free resources <span aria-hidden="true">↗</span></a><button class="secondary" data-list>List a resource</button></div><form id="home-search" class="hero-search"><label for="home-query">Find a resource</label><div><input id="home-query" name="query" placeholder="Try lab kits, books, or your school…"><button type="submit" aria-label="Search resources">↗</button></div></form><p class="free-assurance">Free classroom resources. No purchases or payments.</p><p class="fineprint">An independent student demo. No real requests are sent.</p></div><div class="hero-composition"><div class="rotating-showcase">${[0,2,3,4,5].map((n,i)=>`<button class="hero-showcase hero-slide" data-slide="${i}" ${i ? 'hidden' : ''} data-detail="${seed[n].id}" aria-label="View ${esc(seed[n].title)}"><div class="showcase-photo">${resourceImage(seed[n])}</div><div class="showcase-caption"><div><span>${esc(seed[n].school)}</span><strong>${esc(seed[n].title)}</strong></div><span>${esc(seed[n].qty)}</span></div></button>`).join("")}<div class="carousel-controls"><button id="hero-prev" aria-label="Previous resource">←</button><span id="hero-position">1 / 5</span><button id="hero-next" aria-label="Next resource">→</button></div></div></div></section>`;
}
function workflow() {
  return `<section class="workflow section rounded-section" id="sharing" aria-labelledby="sharing-title"><div class="section-heading"><h2 id="sharing-title">How sharing works.</h2></div><div class="handoff-track"><div class="track-line" aria-hidden="true"></div><article><div class="handoff-art asset-tag" aria-hidden="true"><span>CLUSTERSHARE</span><b>Ready for another<br>school year.</b><small>RESOURCE / FREE</small><i class="mini-barcode"></i></div><span class="step-number">01</span><h3>Find a resource</h3><p>Browse free supplies from nearby classrooms.</p><a class="text-link" href="#inventory">Browse free resources ↗</a></article><article><div class="handoff-art transfer-art" aria-hidden="true"><span>Transfer Custody Record</span><b>$0</b><small>Origin → Destination</small><i></i><i></i><em>PROPOSED HANDOFF</em></div><span class="step-number">02</span><h3>Send a request</h3><p>Request the resource or suggest an equipment swap.</p><a class="text-link" href="#inventory">Find your next resource ↗</a></article><article><div class="handoff-art route-art" aria-hidden="true"><b>AGREE &amp; COLLECT</b><div><span>TAG</span><i>→</i><span>RECORD</span><i>→</i><span>CLASS</span></div><small>Or coordinate self-pickup</small></div><span class="step-number">03</span><h3>Plan the handoff</h3><p>Coordinate collection and any required school approval.</p><a class="text-link" href="#items">Review your requests ↗</a></article></div></section>`;
}
function faq() {
  return `<section class="faq" aria-labelledby="faq-title"><div><h2 id="faq-title">A few useful answers.</h2></div><div class="faq-questions">${[
    [
      "Is everything really free?",
      "Yes. The demo models free internal transfers or equipment-for-equipment swaps. Replacement estimates are reference values, never sale prices.",
    ],
    [
      "Who can use ClusterShare?",
      "The concept serves Forsyth County educators. This independent student prototype has no sign-in or educator verification and is not affiliated with the school district.",
    ],
    [
      "Does choosing delivery book transportation?",
      "No. Delivery means arranging transportation with the school. This demo does not book a service. Bulky furniture requires pickup.",
    ],
    [
      "Where are my listings and requests stored?",
      "Only in this browser on this device. Listings, saved resources, and requests persist locally until you reset the demo or clear site storage. Avoid entering private student or staff information.",
    ],
    [
      "What happens after I propose a swap?",
      "Your proposal stays pending. Review, revise, or withdraw it in Your Items. The prototype does not contact another educator, accept offers, or authorize dispatch.",
    ],
  ]
    .map(
      ([q, a]) =>
        `<details><summary>${q}<span aria-hidden="true">＋</span></summary><p>${a}</p></details>`,
    )
    .join("")}</div></section>`;
}
function renderHome() {
  window.ClusterReveal?.dispose();
  main.innerHTML =
    hero() +
    finderSection() +
    workflow() +
    `<section class="contribute section rounded-section" id="contribute" data-reveal="2"><div class="contribute-copy"><h2>Something to spare.<br><em>Something to share.</em></h2><p>Give the equipment, books, and supplies in your classroom a useful next chapter.</p><button class="primary" data-list>Share a resource ↗</button><p class="fineprint">Listings are saved only in this browser.</p></div>${faq()}</section>`;
  $("#home-search").onsubmit = (e) => {
    e.preventDefault();
    browse = { ...defaults(), query: $("#home-query").value };
    navigate("inventory");
  };
  bindFinder();
  startHero();
  startSharingAnimation();
  bindCommon();
}

function renderItems() {
  const tabs = [
    ["requests", "Requests & swaps"],
    ["saved", "Saved resources"],
    ["listed", "Your listings"],
  ];
  if (!tabs.some(([key]) => key === itemsTab)) itemsTab = "requests";
  main.innerHTML =
    pageHeading(
      "",
      "Your Items",
      "",
      `<button class="secondary" data-list>List a resource ↗</button>`,
    ) +
    `<nav class="item-tabs" aria-label="Your items categories">${tabs.map(([key, label]) => `<a href="#items?tab=${key}" ${itemsTab === key ? 'aria-current="page"' : ""}>${label} <span>${key === "requests" ? state.claims.filter(M.isActive).length : key === "saved" ? allAssets().filter((a) => state.saved.some((id) => String(id) === String(a.id))).length : state.listings.length}</span></a>`).join("")}</nav>`;
  if (itemsTab === "requests") {
    main.innerHTML += state.claims.length
      ? `<label class="request-filter">Request status<select id="requestStatus" aria-label="Request status"><option value="all">All records</option><option value="active">Active requests</option><option value="withdrawn">Withdrawn</option></select></label><div id="requestRecords"></div><p class="notice">Local records do not contact educators, reserve resources, or book deliveries.</p>`
      : emptyState(
          "Your next discovery starts here.",
          "Request a resource or propose a swap to review your handoff details.",
        );
    const draw = () => {
      const filter = $("#requestStatus")?.value || "all";
      const records = state.claims.filter(
        (c) =>
          filter === "all" ||
          (filter === "active" ? M.isActive(c) : !M.isActive(c)),
      );
      $("#requestRecords").innerHTML = records.length
        ? `<div class="resource-grid request-cards">${records
            .map((c) => {
              const a = findAsset(c.asset);
              return `<article class="resource-card managed-request request-card"><div class="resource-media">${a ? `<button class="media-detail" data-detail="${esc(a.id)}" aria-label="View details: ${esc(a.title)}">${resourceImage(a)}</button>` : ''}</div><div class="resource-copy"><h2>${esc(a?.title || "Resource unavailable")}</h2><p class="quantity">${esc(a?.qty || "")}</p><p>${esc(c.date)}</p><div class="request-destination"><p>${esc(c.campus)} · Room ${esc(c.room)}</p><p>${c.method === "Self-pickup" ? "Pick up" : "Delivery"}</p></div><span class="resource-status ${M.isActive(c) ? "pending" : ""}">${M.requestLabel(c)}</span><button class="primary" data-voucher="${esc(c.id)}">${M.isActive(c) ? "Review & manage" : "View record"} ↗</button></div></article>`;
            })
            .join("")}</div>`
        : '<p class="notice">No records in this status. <button class="text-link" id="show-all-requests">Show all records</button></p>';
      if ($("#show-all-requests")) $("#show-all-requests").onclick = () => { $("#requestStatus").value = "all"; draw(); };
      bindCommon();
      bind("[data-voucher]", (el) =>
        reviewExisting(state.claims.find((c) => c.id === el.dataset.voucher)),
      );
    };
    if (state.claims.length) {
      draw();
      $("#requestStatus").onchange = draw;
    }
  } else {
    const resources =
      itemsTab === "saved"
        ? allAssets().filter((a) =>
            state.saved.some((id) => String(id) === String(a.id)),
          )
        : state.listings;
    main.innerHTML += resources.length
      ? `<div class="resource-grid">${resources.map((a) => (itemsTab === "listed" ? ownerCard(a) : card(a))).join("")}</div>`
      : emptyState(
          itemsTab === "saved"
            ? "Keep a useful resource close."
            : "Share the next useful thing.",
          itemsTab === "saved"
            ? "Use the heart on a resource to save it here."
            : "Create a listing with quantity, condition, and campus.",
        );
  }
  bindCommon();
  bind("[data-owner-request]", el => reviewExisting(requestFor(el.dataset.ownerRequest)));
  bind("[data-edit]", (el) => listResource(el.dataset.edit));
  bind("[data-archive]", (el) => {
    state = M.archiveListing(state, el.dataset.archive);
    const saved = persist();
    renderItems();
    document
      .querySelector(`[data-archive="${CSS.escape(el.dataset.archive)}"]`)
      ?.focus({ preventScroll: true });
    toast(
      saved
        ? "Listing updated. You can restore archived listings here."
        : "Listing changed for this session only; storage unavailable.",
    );
  });
}
function withdrawRequest(id) {
  if (!ensureFresh()) return;
  state = M.withdrawRequest(state, id);
  const saved = persist();
  render();
  drawer.close();
  toast(
    saved
      ? "Request withdrawn. You can request this resource again."
      : "Request withdrawn for this session only; storage unavailable.",
  );
}

function emptyState(title, description) {
  return `<div class="empty"><div class="empty-symbol" aria-hidden="true"><svg width="64" height="64" viewBox="0 0 64 64" fill="none"><path d="M13 17h24l10 10v25H13zM37 17v12h10M21 38h18M21 44h11" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M32 8v8m-7-4h14" stroke="currentColor" stroke-width="1.5"/></svg></div><div><h2>${title}</h2><p>${description}</p>${view === "items" && itemsTab === "listed" ? '<button class="primary" data-list>List a resource ↗</button>' : '<a class="primary" href="#inventory">Browse free resources ↗</a>'}</div></div>`;
}
function listResource(id = null) {
  const existing = id ? findAsset(id) : null;
  if (id && !existing?.local) return;
  let stage = 1,
    draft = existing
      ? {
          ...existing,
          unit: existing.unit || existing.qty.replace(/^\d+\s*/, ""),
          kind: existing.swap ? "swap" : "transfer",
          method: existing.selfPickup ? "pickup" : "courier",
          photo: /resource-(fallback|category-\d)\.svg$/.test(existing.image)
            ? ""
            : existing.image,
        }
      : { count: 1, unitValue: "", kind: "transfer", method: "courier" };
  const input = (name, label, attrs = "") =>
    `<label for="list-${name}">${label}</label><input id="list-${name}" name="${name}" ${attrs} value="${esc(draft[name] ?? "")}">`;
  const select = (name, label, values, placeholder) =>
    `<label for="list-${name}">${label}</label><select id="list-${name}" name="${name}" required>${options(values, draft[name], placeholder)}</select>`;
  const draw = () => {
    const labels = ["Resource details", "Campus & handoff", "Review listing"];
    openDrawer(
      dh(
        existing ? "Edit your resource." : "Share something useful.",
        `Local listing · Step ${stage} of 3`,
      ) +
        `<ol class="step-index">${labels.map((label, i) => `<li ${stage === i + 1 ? 'aria-current="step"' : ""}><b>0${i + 1}</b>${label}</li>`).join("")}</ol><form id="listing"><p class="form-error" id="form-error" role="alert" hidden></p>${
          stage === 1
            ? input("title", "Resource name", 'required maxlength="120"') +
              `<div class="field-pair"><div>${input("count", "Number of units", 'type="number" min="1" max="1000" required')}</div><div>${input("unit", "Unit description", 'required maxlength="80" placeholder="e.g. microscopes"')}</div></div><label for="list-cat">Category</label><select id="list-cat" name="cat" required><option value="">Choose category</option>${cats
                .slice(1)
                .map(
                  (c, i) =>
                    `<option value="${i + 1}" ${Number(draft.cat) === i + 1 ? "selected" : ""}>${c}</option>`,
                )
                .join("")}</select>` +
              select(
                "condition",
                "Condition",
                [
                  "Excellent condition",
                  "Good condition",
                  "Gently used",
                  "Serviceable",
                ],
                "Choose condition",
              ) +
              input(
                "unitValue",
                "Replacement estimate per unit ($)",
                'type="number" min="0" max="100000" step="0.01" aria-describedby="replacement-help"',
              ) +
              '<p class="field-help" id="replacement-help">Optional — enter $0 or leave blank if unknown.</p>'
            : stage === 2
              ? select(
                  "school",
                  "Origin campus",
                  Object.keys(campusCodes),
                  "Choose campus",
                ) +
                input("room", "Room", 'required maxlength="40"') +
                input("teacher", "Educator name", 'required maxlength="100"') +
                `<label for="list-kind">Transfer type</label><select id="list-kind" name="kind"><option value="transfer">Free transfer</option><option value="swap" ${draft.kind === "swap" ? "selected" : ""}>Equipment swap</option></select><label for="list-method">Handoff</label><select id="list-method" name="method"><option value="courier">Pick up or delivery</option><option value="pickup" ${draft.method === "pickup" ? "selected" : ""}>Self-pickup required</option></select><p class="field-help">Furniture requires pickup. Arrange delivery with the school for other items.</p>`
              : `<dl class="quick-details"><dt>Resource</dt><dd>${esc(draft.title)}</dd><dt>Quantity</dt><dd>${esc(draft.count)} ${esc(draft.unit)} · ${esc(draft.condition)}</dd><dt>Origin</dt><dd>${esc(draft.school)} · Room ${esc(draft.room)}<br>${esc(draft.teacher)}</dd><dt>Transfer</dt><dd>${draft.kind === "swap" ? "Free equipment swap" : "Free resource"} · ${Number(draft.cat) === 3 || draft.method === "pickup" ? "Self-pickup" : "Pick up or delivery"}</dd><dt>Lot estimate</dt><dd>${money(Number(draft.count) * Number(draft.unitValue || 0))}</dd></dl><label for="list-notes">Condition details & included accessories (optional)</label><textarea id="list-notes" name="notes" maxlength="1000" placeholder="Describe wear, working condition, and what is included…">${esc(draft.notes)}</textarea>` +
                `<label for="list-photo-file">Resource photo (optional)</label><input id="list-photo-file" type="file" accept="image/jpeg,image/png,image/webp"><p class="field-help">Choose a photo from this device. It is resized and saved only in this browser. Without a photo, a category illustration is used.</p><div id="photo-preview">${draft.photo ? `<img src="${esc(draft.photo)}" alt="Selected resource photo"><button type="button" class="text-link" id="remove-photo">Remove photo</button>` : ''}</div><p id="photo-error" class="form-error" role="alert" hidden></p><p class="notice">Saved only in this browser. No publication, school approval, or real dispatch occurs.</p>`
        }<div class="form-actions">${stage > 1 ? '<button type="button" class="secondary" id="listingBack">Back</button>' : ""}<button type="submit" class="primary">${stage === 3 ? "Save local listing" : "Continue →"}</button></div></form>`,
    );
    const collect = () =>
      Object.assign(draft, Object.fromEntries(new FormData($("#listing"))));
    const photoInput = $('#list-photo-file');
    if (photoInput) photoInput.onchange = async () => {
      const file = photoInput.files[0]; if (!file) return;
      const submit = $('#listing button[type="submit"]'); submit.disabled = true;
      try { draft.photo = await ClusterPhoto.prepare(file); collect(); draw(); }
      catch (error) { $('#photo-error').textContent = error.message; $('#photo-error').hidden = false; }
      finally { if (submit.isConnected) submit.disabled = false; }
    };
    if ($('#remove-photo')) $('#remove-photo').onclick = () => { collect(); draft.photo = ''; draw(); };
    $("#listingBack")?.addEventListener("click", () => {
      collect();
      stage--;
      draw();
    });
    $("#listing").onsubmit = (e) => {
      e.preventDefault();
      collect();
      for (const key of ["title", "unit", "room", "teacher"])
        if (key in draft && !String(draft[key]).trim())
          return showFormError(
            "Enter meaningful text for this field.",
            "list-" + key,
          );
      if (stage < 3) {
        stage++;
        draw();
        return;
      }
      if (!M.validPhoto(draft.photo))
        return showFormError(
          "Choose a smaller JPEG, PNG or WebP photo.",
          "list-photo-file",
        );
      if (!ensureFresh()) return;
      try {
        state = M.saveListing(
          state,
          draft,
          Object.keys(campusCodes),
          existing?.id || "local-" + crypto.randomUUID(),
        );
        const saved = persist();
        render();
        openDrawer(
          dh(
            saved ? "Your listing is saved." : "Listing kept for this session.",
            saved ? "Browser-local resource" : "Storage unavailable",
          ) +
            `<p>${esc(draft.title)} is ready to manage in Your Items. Archived listings stay archived when edited.</p><div class="form-actions"><button class="primary" id="viewListed">View your listings ↗</button><button class="secondary" id="printDraft">Print listing summary</button></div><div class="voucher"><h3>${esc(draft.title)}</h3><p>${esc(draft.count)} ${esc(draft.unit)} · ${esc(draft.school)}<br>Free resource · Browser-local listing</p></div>`,
        );
        $("#viewListed").onclick = () => {
          drawer.close();
          navigate("items?tab=listed");
        };
        $("#printDraft").onclick = () => window.print();
      } catch (error) {
        showFormError(error.message);
      }
    };
  };
  draw();
}

function renderLedger() {
  const rows = M.valueBreakdown([...state.listings, ...seed], state);
  const examples = seed.filter(a => [1,3,4].includes(a.id));
  main.innerHTML = pageHeading('', 'Impact', '') +
    `<section class="impact-intro"><h2>More for your classroom.<br>Less to buy.</h2><p>A spare set in one classroom could fill a need in another. Find resources teachers can donate before spending on replacements.</p><a class="primary" href="#inventory">Find free classroom resources ↗</a></section>` +
    `<section class="impact-panel donation-panel" aria-labelledby="donation-title"><div class="donation-heading"><div><h2 id="donation-title">See what sharing could keep in a classroom budget.</h2><p>Compare buying a replacement with receiving the same resource as a free donation.</p></div><label for="impact-resource">Explore a catalog example<select id="impact-resource">${examples.map(a=>`<option value="${a.id}">${esc(a.title)}</option>`).join('')}</select></label></div><div id="donation-comparison"></div><p class="fineprint">Illustrative catalog estimates, not verified savings. Donation acquisition price is $0; pickup or delivery costs are excluded. Availability and school approval must be confirmed.</p></section>` +
    `<section class="impact-panel" aria-labelledby="discovery-title"><h2 id="discovery-title">A shared catalog beats starting another email chain.</h2><div class="discovery-comparison"><article><h3>Scattered emails</h3><ol><li>Ask around and wait for replies.</li><li>Follow up for photos, quantity, and condition.</li><li>Piece together where the resource is and whether it fits.</li></ol></article><article><h3>Browse with ClusterShare</h3><ol><li>Search resources across the listed schools.</li><li>Compare photos, quantities, and condition in one place.</li><li>Request a match, then arrange an approved handoff.</li></ol></article></div><p class="fineprint">The proposed benefit is less back-and-forth before a request. Time saved is not measured by this demo; school coordination still happens outside it.</p></section>` +
    `<section class="impact-panel"><h2>Your requests: the potential, not the result.</h2><div class="impact-request-summary"><div><strong>${rows.length}</strong><span>${rows.length === 1 ? 'resource requested' : 'resources requested'}</span></div><div><strong>${money(M.requestedValue([...state.listings,...seed],state))}</strong><span>estimated replacement cost of those resources</span></div></div>${valueBreakdown()}<details class="impact-method"><summary>How to read these figures</summary><p>Quantity × estimated cost per item. Only active transfer requests are included; pending swaps and withdrawn requests are excluded. A request is not a completed donation or verified saving.</p></details><button class="secondary" data-sources>Sources & methodology ↗</button></section>`;
  const show = () => {
    const a = examples.find(a=>String(a.id)===$('#impact-resource').value);
    $('#donation-comparison').innerHTML = `<div class="donation-example"><div class="donation-photo">${resourceImage(a)}</div><div><h3>${esc(a.title)}</h3><p>${esc(a.qty)}</p><figure class="donation-chart" aria-label="Estimated replacement cost ${money(a.value)} compared with a free donation acquisition price of $0"><div class="cost-row"><div><span>Buy a replacement</span><strong>${money(a.value)}</strong></div><div class="cost-track"><span class="replacement-bar"></span></div></div><div class="cost-row"><div><span>Receive a donation</span><strong>$0</strong></div><div class="cost-track"><span class="donation-zero"></span></div></div><figcaption><strong>${money(a.value)}</strong> in replacement spending could be avoided if this complete set is donated instead of purchased.</figcaption></figure></div></div>`;
    setupImages();
  };
  $('#impact-resource').onchange = show; show(); bindCommon();
}
function valueBreakdown() {
  const rows = M.valueBreakdown([...state.listings, ...seed], state);
  return rows.length ? `<div class="value-rows">${rows.map(a=>`<article><div><h3>${esc(a.title)}</h3><p>${esc(a.qty)} · ${esc(a.school)}</p></div><strong>${money(a.value)}</strong></article>`).join('')}</div>` : '<a class="text-link" href="#inventory">Browse free resources ↗</a>';
}

function ownerCard(a) {
  const request = requestFor(a.id);
  return `<article class="resource-card managed-listing"><div class="resource-media"><button class="media-detail" data-detail="${esc(a.id)}" aria-label="View details: ${esc(a.title)}">${resourceImage(a)}</button><span class="free-tag">${a.swap ? 'Swap' : 'Free transfer'}</span></div><div class="resource-copy"><h2>${esc(a.title)}</h2><p class="quantity">${esc(a.qty)}</p><div class="resource-facts"><p>${esc(a.school)}</p><span>${esc(a.condition)}</span></div><p class="owner-status">${a.archived ? 'Archived · hidden from inventory' : 'Listed in this browser'}</p><p>${request ? esc(M.requestLabel(request)) + ' · local demo record' : 'No active local request'}</p><div class="listing-tools"><button class="primary" data-edit="${esc(a.id)}" data-focus-key="edit-${esc(a.id)}">Edit listing</button><button class="secondary" data-archive="${esc(a.id)}">${a.archived ? 'Restore' : 'Archive'}</button>${request ? `<button class="text-link" data-owner-request="${esc(a.id)}">Review request</button>` : ''}</div></div></article>`;
}

/* Lightweight preferences and progressive homepage enhancement. */
let heroCleanup = () => {};
function preferenceFields(p = state.preferences || {}) {
  const field = (key, label, choices) => `<label>${label}<select name="${key}" required><option value="">Choose ${label.toLowerCase()}</option>${choices.map(([v,t])=>`<option value="${v}" ${p[key]===v?'selected':''}>${t}</option>`).join('')}</select></label>`;
  return field('grade','Grade band',[['any','Any grade'],['Elementary','Elementary'],['Middle','Middle school'],['High','High school']])+field('subject','Teaching area',[['any','Across subjects'],['math','Mathematics'],['science','Science'],['literacy','Literacy & reading'],['art','Arts']])+field('category','Resource type',[['any','Any resource'],['1','STEM & Lab'],['2','Curriculum Sets'],['3','Classroom Furniture'],['4','Storage & Office']]);
}
function finderSection() {
  return `<section class="section finder rounded-section" aria-labelledby="finder-title"><div class="section-heading"><h2 id="finder-title">Find resources for your classroom.</h2></div><form id="finder-form" class="preference-fields">${preferenceFields()}<button class="primary">Find my matches ↗</button></form><div id="finder-results"></div></section>`;
}
function matchingResources() { return M.recommendations(allAssets(), state.preferences).filter(a=>!a.local && !requestFor(a.id)); }
function bindFinder() {
  const show = () => {const matches=matchingResources(); $('#finder-results').innerHTML=`<p>${matches.length ? 'Matched to your choices. These simulated listings are free to request.' : 'No exact matches right now. Try broader preferences or explore all resources.'}</p><div class="featured-grid">${matches.map(a=>card(a,true)).join('')}</div><a class="text-link" href="#inventory">Browse all resources ↗</a>`;bindCommon();};
  $('#finder-form').onsubmit=e=>{e.preventDefault();if(!ensureFresh())return;state.preferences={...state.preferences,...Object.fromEntries(new FormData(e.target))};persist();show();};
  if(state.preferences?.category) show();
}
function startHero() {
  heroCleanup();
  const slides = [...document.querySelectorAll('[data-slide]')];
  if (!slides.length) return;
  let index = 0;
  const show = n => {
    slides[index].hidden = true;
    index = (n + slides.length) % slides.length;
    slides[index].hidden = false;
    $('#hero-position').textContent = `${index + 1} / ${slides.length}`;
  };
  $('#hero-prev').onclick = () => show(index - 1);
  $('#hero-next').onclick = () => show(index + 1);
  // Continue during hover/focus; skip hidden tabs and honor the system motion preference.
  const timer = setInterval(() => {
    if (!document.hidden && !reducedMotion.matches) show(index + 1);
  }, 7000);
  heroCleanup = () => clearInterval(timer);
}
function openProfile() {
  const p=state.preferences||{};
  openDrawer(dh('Your classroom preferences.','Browser-local profile')+`<p>Optional personalization, not an account. Information stays on this browser.</p><form id="profile-form"><label for="profile-name">Name (optional)</label><input id="profile-name" name="name" maxlength="80" value="${esc(p.name)}"><label for="profile-campus">Campus (optional)</label><select id="profile-campus" name="campus">${options(Object.keys(campusCodes),p.campus,'Choose a campus')}</select><div class="profile-preferences">${preferenceFields(p)}</div><button class="primary">Save preferences</button></form><p class="fineprint">Requests still need their own educator details. Theme is available in the header; local data controls are in the footer.</p>`);
  $('#profile-form').onsubmit=e=>{e.preventDefault();if(!ensureFresh())return;state.preferences=Object.fromEntries(new FormData(e.target));persist();drawer.close();render();toast('Classroom preferences saved on this browser.');};
}

function renderRecommendations() {
  const slot = $('#recommendation-slot');
  if (!slot) return;
  const matches = M.browseRecommendations(allAssets(), state, browse);
  slot.innerHTML = matches.length ? `<section class="recommendation-shelf"><div class="recommendation-heading"><h2>Recommended for your room</h2><button class="text-link" id="edit-preferences">Edit preferences</button></div><div class="recommendation-list">${matches.map(a=>`<button class="recommendation-item" data-detail="${esc(a.id)}">${resourceImage(a)}<span><strong>${esc(a.title)}</strong><small>${esc(a.qty)} · ${esc(a.school)}</small></span><span aria-hidden="true">↗</span></button>`).join('')}</div></section>` : '';
  if ($('#edit-preferences')) $('#edit-preferences').onclick = openProfile;
}

let sharingCleanup = () => {};
function startSharingAnimation() {
  sharingCleanup();
  const section = $('#sharing'), track = section?.querySelector('.handoff-track');
  if (!track || reducedMotion.matches || (!('IntersectionObserver' in window) || !('ResizeObserver' in window))) return;
  const circles = [...track.querySelectorAll('.step-number')];
  let svg, inView = false, frame;
  const update = () => {
    const paused = !inView || document.hidden || reducedMotion.matches;
    section.classList.toggle('flight-paused', paused);
    if (svg) paused ? svg.pauseAnimations() : svg.unpauseAnimations();
  };
  const draw = () => {
    cancelAnimationFrame(frame);
    svg?.remove(); section.classList.remove('flight-ready');
    const bounds = track.getBoundingClientRect();
    const points = circles.map(circle => {
      const r = circle.getBoundingClientRect();
      return [r.left - bounds.left + r.width / 2, r.top - bounds.top + r.height / 2];
    });
    const path = points.map(([x,y],i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ');
    const linePath = points.slice(1).map((end,i) => {
      const start=points[i], length=Math.hypot(end[0]-start[0],end[1]-start[1]);
      const dx=(end[0]-start[0])/length*22, dy=(end[1]-start[1])/length*22;
      return `M ${start[0]+dx} ${start[1]+dy} L ${end[0]-dx} ${end[1]-dy}`;
    }).join(' ');
    const firstLeg = Math.hypot(points[1][0]-points[0][0],points[1][1]-points[0][1]);
    const secondLeg = Math.hypot(points[2][0]-points[1][0],points[2][1]-points[1][1]);
    const middle = firstLeg / (firstLeg + secondLeg);
    track.insertAdjacentHTML('afterbegin', `<svg class="sharing-flight" viewBox="0 0 ${bounds.width} ${bounds.height}" aria-hidden="true" focusable="false"><path d="${linePath}" fill="none" stroke="currentColor" stroke-width="1.5"/><g><path d="M -11 -7 L 12 0 L -11 7 L -6 0 Z" fill="#2857B7" stroke="white" stroke-width="1.2"><animate attributeName="fill" values="#1C784A;#2857B7;#1C784A;#2857B7;#1C784A;#1C784A" keyTimes="0;.1;.45;.55;.9;1" calcMode="discrete" dur="9s" repeatCount="indefinite"/></path><animateMotion path="${path}" dur="9s" rotate="auto" keyPoints="0;0;${middle};${middle};1;1" keyTimes="0;.1;.45;.55;.9;1" calcMode="linear" repeatCount="indefinite"/></g></svg>`);
    svg = track.querySelector('.sharing-flight');
    svg.pauseAnimations(); svg.setCurrentTime(0);
    frame = requestAnimationFrame(() => { section.classList.add('flight-ready'); update(); });
  };
  const observer = new IntersectionObserver(entries => {
    inView = entries.some(entry => entry.isIntersecting); update();
  }, {threshold:.1});
  observer.observe(section);
  const resize = new ResizeObserver(draw); resize.observe(track);
  const motionChange = () => { if (reducedMotion.matches) update(); else draw(); };
  document.addEventListener('visibilitychange', update);
  reducedMotion.addEventListener('change', motionChange);
  sharingCleanup = () => {
    observer.disconnect(); resize.disconnect(); cancelAnimationFrame(frame); svg?.remove();
    section.classList.remove('flight-ready','flight-paused');
    document.removeEventListener('visibilitychange', update);
    reducedMotion.removeEventListener('change', motionChange);
  };
  draw();
}

/* Resize local photos before browser storage; never upload them or accept executable SVG. */
const ClusterPhoto = {
  async prepare(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 12000000)
      throw new Error('Choose a JPEG, PNG or WebP photo smaller than 12 MB.');
    const url = URL.createObjectURL(file);
    try {
      const image = new Image(); image.src = url;
      await image.decode();
      if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 60000000)
        throw new Error('This image is too large to process. Choose a smaller photo.');
      const scale = Math.min(1, 1000 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      for (const quality of [.82, .65, .45]) {
        const photo = canvas.toDataURL('image/jpeg', quality);
        if (photo.length <= 500000) return photo;
      }
      throw new Error('This photo needs too much browser storage. Choose a smaller image.');
    } catch (error) {
      throw new Error(error.message.includes('photo') || error.message.includes('image') ? error.message : 'This photo could not be read. Try another JPEG, PNG or WebP.');
    } finally { URL.revokeObjectURL(url); }
  }
};

const $ = (s) => document.querySelector(s),
  main = $("main"),
  drawer = $("#drawer");
const M = ClusterModel,
  PAGE_SIZE = 8,
  storageKey = "clustershare-v1";
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const initial = () => M.normalizeState({});
let state,
  storageBlocked = false,
  baseRaw = null;
try {
  const loaded = ClusterStorage.read(localStorage, storageKey);
  state = M.normalizeState(loaded.value);
  baseRaw = loaded.raw;
} catch {
  state = initial();
  storageBlocked = true;
}
const defaults = () => ({
  query: "",
  literal: false,
  category: 0,
  school: "",
  condition: "",
  method: "",
  kind: "",
  available: false,
  sort: "newest",
  page: 1,
});
let browse = defaults();
try {
  browse = {
    ...browse,
    ...JSON.parse(localStorage.getItem("clustershare-browse-v1") || "{}"),
  };
} catch {}
let view = "home",
  itemsTab = "requests",
  selected = null,
  step = 1,
  formData = {},
  swapMode = false,
  editingRequest = null,
  returnFocus = null,
  returnKey = "";
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const allAssets = () => M.catalog(seed, state),
  findAsset = (id) =>
    [...state.listings, ...seed].find((a) => String(a.id) === String(id));
const requestFor = (id) => M.requestFor(state, id);
function persist() {
  if (storageBlocked) {
    toast(
      "Existing storage could not be read. It remains untouched; this session is temporary.",
    );
    return false;
  }
  try {
    baseRaw = ClusterStorage.commit(localStorage, storageKey, baseRaw, state);
    return true;
  } catch (error) {
    if (error.message === "STORAGE_CONFLICT") {
      ensureFresh();
      throw new Error(
        "Another tab changed your data. Latest records loaded; repeat your action.",
      );
    }
    toast("Could not save to this browser. Changes remain in this session.");
    return false;
  }
}

function toast(message) {
  $("#toast").textContent = message;
  $("#toast").hidden = false;
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => ($("#toast").hidden = true), 5000);
}
function bind(selector, fn) {
  document.querySelectorAll(selector).forEach(
    (el) =>
      (el.onclick = (e) => {
        if (!ensureFresh()) return;
        try {
          fn(el, e);
        } catch (error) {
          toast(error.message);
        }
      }),
  );
}

function ensureFresh() {
  if (storageBlocked) return true;
  try {
    const { raw, value } = ClusterStorage.read(localStorage, storageKey);
    if (raw !== baseRaw) {
      state = M.normalizeState(value);
      baseRaw = raw;
      render();
      drawer.close();
      toast(
        "Data changed in another tab. Latest records loaded; please repeat your action.",
      );
      return false;
    }
  } catch {
    storageBlocked = true;
    toast("Storage is unavailable. Existing records have been left untouched.");
    return false;
  }
  return true;
}
window.addEventListener("storage", (e) => {
  if (e.key === storageKey && !drawer.open) {
    ensureFresh();
  }
});

function options(values, current, placeholder) {
  return `<option value="">${placeholder}</option>${values.map((v) => `<option value="${esc(v)}" ${v === current ? "selected" : ""}>${esc(v)}</option>`).join("")}`;
}
function localDate() {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "America/New_York",
  }).format(new Date());
}
function statusText(a) {
  if (a.archived) return "Archived · restore to share";
  const r = requestFor(a.id);
  return r
    ? r.type === "swap"
      ? "Swap proposed · pending"
      : "Transfer requested"
    : a.swap
      ? "Swap"
      : a.selfPickup
        ? "Self-pickup"
        : "Pick up or delivery";
}
function money(n) {
  return "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
}
function resourceImage(a, extra = "") {
  a = { ...a, image: !a.image || a.image.match(/resource-(fallback|category-\d)\.svg$/) ? M.fallbackImage(a.cat) : a.image };
  return `<img data-category="${esc(a.cat)}" src="${esc(a.image)}" alt="${esc(a.title)} — ${String(a.image || "assets/resource-fallback.svg").match(/resource-(fallback|category-\d)\.svg$/) ? "representative illustration" : "representative photograph"}" loading="${extra ? "eager" : "lazy"}" decoding="async" ${extra}>`;
}
function card(a, featured = false) {
  const r = requestFor(a.id),
    heading = featured || view === "home" ? "h3" : "h2";
  return `<article class="resource-card"><div class="resource-media"><button class="media-detail" data-detail="${esc(a.id)}" data-focus-key="image-${esc(a.id)}" aria-label="View details: ${esc(a.title)}">${resourceImage(a)}</button><span class="free-tag">${a.swap ? "Swap" : "Free"}</span><button class="save icon-button" data-save="${esc(a.id)}" data-focus-key="save-${esc(a.id)}" aria-label="${state.saved.some((id) => String(id) === String(a.id)) ? "Unsave" : "Save"} ${esc(a.title)}" aria-pressed="${state.saved.some((id) => String(id) === String(a.id))}">${state.saved.some((id) => String(id) === String(a.id)) ? "♥" : "♡"}</button></div><div class="resource-copy"><${heading}><button data-detail="${esc(a.id)}" data-focus-key="detail-${esc(a.id)}">${esc(a.title)}</button></${heading}><p class="quantity">${esc(a.qty)}</p><div class="resource-facts"><p>${esc(a.school)}</p><span>${esc(a.condition)}</span></div><span class="resource-status ${r ? "pending" : a.archived ? "archived-status" : ""}">${r ? "◷" : a.archived ? "—" : "✓"} ${statusText(a)}</span><button class="primary" ${a.archived && !r ? "disabled" : ""} data-request="${esc(a.id)}" data-focus-key="request-${esc(a.id)}">${r ? "Review request" : a.archived ? "Archived" : a.swap ? "Propose a swap" : "Request resource"} <span aria-hidden="true">↗</span></button></div></article>`;
}
function pageHeading(kicker, title, description, action = "") {
  return `<div class="page-heading"><div>${kicker ? `<span class="eyebrow">${kicker}</span>` : ""}<h1>${title}</h1>${description ? `<p>${description}</p>` : ""}</div>${action}</div>`;
}
function stats() {
  const available = allAssets().filter((a) => !requestFor(a.id)).length;
  return `<section class="intro-stats" aria-label="Demonstration statistics"><div><strong>${available}</strong><span>Resources to explore</span></div><div><strong>${Object.keys(campusCodes).length}</strong><span>Real Forsyth campuses</span></div><div><strong>$0</strong><span>Transfer price</span></div><div><strong>${money(42850)}</strong><span>Estimated replacement value recirculated</span></div><p>Sample listings & estimates · Independent student project</p></section>`;
}
function sidebarContents() {
  return `<h2>Filter by</h2><div class="category-links" role="group" aria-label="Resource category">${cats.map((c,i)=>`<button class="${Number(browse.category)===i?'active':''}" data-cat="${i}" aria-pressed="${Number(browse.category)===i}">${i===0?'All resources':c}</button>`).join('')}</div><details class="sidebar-group"><summary>School</summary><select aria-label="School" data-filter="school">${options(Object.keys(campusCodes), browse.school, "All schools")}</select></details><details class="sidebar-group"><summary>Condition</summary><select aria-label="Condition" data-filter="condition">${options([...new Set(allAssets().map((a) => a.condition))], browse.condition, "Any condition")}</select></details><details class="sidebar-group"><summary>Handoff</summary><select aria-label="Handoff" data-filter="method"><option value="">Any method</option><option value="courier" ${browse.method === "courier" ? "selected" : ""}>Pick up or delivery</option><option value="pickup" ${browse.method === "pickup" ? "selected" : ""}>Self-pickup</option></select></details><details class="sidebar-group"><summary>Resource type</summary><select aria-label="Resource type" data-filter="kind"><option value="">Transfers & swaps</option><option value="transfer" ${browse.kind === "transfer" ? "selected" : ""}>Free transfers</option><option value="swap" ${browse.kind === "swap" ? "selected" : ""}>Swaps</option></select></details><label class="check-label"><input type="checkbox" id="available-only" ${browse.available ? "checked" : ""}> Not yet requested</label>`;
}
function filterControls() {
  return `<div class="search-hub"><label for="search">Find free classroom resources</label><div class="search-field"><span aria-hidden="true">⌕</span><input id="search" type="search" value="${esc(browse.query)}" placeholder="Search resources, equipment, or schools…"></div><div id="search-correction" role="status"></div><button class="secondary mobile-filter" id="open-filters">Browse & filter</button><div id="active-filters" class="active-filters"></div></div>`;
}
function bindSidebar() {
  bind('[data-cat]',el=>{browse.category=Number(el.dataset.cat);browse.page=1;document.querySelectorAll('[data-cat]').forEach(b=>{const active=Number(b.dataset.cat)===browse.category;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderGrid();saveBrowse();});
  document.querySelectorAll('[data-filter]').forEach(el=>el.onchange=()=>{browse[el.dataset.filter]=el.value;browse.page=1;renderGrid();saveBrowse();});
  const available=document.querySelector('#available-only');if(available)available.onchange=e=>{browse.available=e.target.checked;browse.page=1;renderGrid();saveBrowse();};
}
function renderInventory() {
  main.innerHTML =
    pageHeading(
      "The inventory commons",
      "Free classroom resources",
      "",
      `<button class="secondary" data-list>List resource ↗</button>`,
    ) +
    `<div class="inventory-layout"><aside class="inventory-sidebar" aria-label="Browse and filter">${sidebarContents()}</aside><div class="inventory-results">` + filterControls() +
    `<details class="personalization-option"><summary>Personalize recommendations</summary><p>Choose your grade band, teaching area, and resource interests. Preferences stay in this browser.</p><button class="text-link" id="personalize">Edit classroom preferences</button></details><div id="recommendation-slot"></div><div class="catalogbar"><p id="result-count" role="status" aria-live="polite"></p><label>Sort by<select id="sort"><option value="newest">Recently added</option><option value="value">Replacement value</option><option value="name">Name A–Z</option></select></label></div><section class="resource-grid" id="inventoryGrid" aria-label="Resources" tabindex="-1"></section><div id="pagination"></div><p class="browse-note">Representative product photography. School names are real; availability, rooms, educators, and replacement estimates are simulated. Estimates are not offers for sale.</p></div></div>`;
  $("#personalize").onclick = openProfile;
  $("#sort").value = browse.sort;
  $("#search").oninput = (e) => {
    browse.query = e.target.value;
    browse.literal = false;
    browse.page = 1;
    renderGrid();
    saveBrowse();
  };
  $("#sort").onchange = (e) => {
    browse.sort = e.target.value;
    browse.page = 1;
    renderGrid();
    saveBrowse();
  };
  bindSidebar();
  $('#open-filters').onclick=()=>{
    // Move the same controls into the native modal; no duplicate IDs or divergent state.
    const side=$('.inventory-sidebar');openDrawer(dh('Browse & filter')+'<div id="mobile-filter-content"></div><button class="primary" id="done-filters">Show resources</button>');
    $('#mobile-filter-content').append(...side.childNodes);
    $('#done-filters').onclick=()=>drawer.close();
    drawer.addEventListener('close',()=>{const content=$('#mobile-filter-content');if(content)side.append(...content.childNodes);},{once:true});
  };
  renderGrid();
  bindCommon();
}
function renderGrid() {
  renderRecommendations();
  const corrected=M.searchCorrection(browse.query,allAssets());
  $('#search-correction').innerHTML=corrected && corrected!==browse.query.trim().toLowerCase() && !browse.literal ? `Showing results for <strong>${esc(corrected)}</strong>. <button class="text-link" id="literal-search">Search instead for “${esc(browse.query)}”</button>` : '';
  if($('#literal-search')) $('#literal-search').onclick=()=>{browse.literal=true;renderGrid();saveBrowse();};
  const filtered = M.selectResources(allAssets(), state, browse),
    p = M.paginate(filtered, browse.page, PAGE_SIZE);
  const clamped = browse.page !== p.page;
  browse.page = p.page;
  $("#inventoryGrid").innerHTML = p.total
    ? p.items.map((a) => card(a)).join("")
    : `<div class="empty"><h2>No resources match just yet.</h2><p>Try a broader term, choose another school, or clear your filters.</p><button class="secondary" data-clear>Clear all filters</button></div>`;
  $("#result-count").innerHTML =
    `<span>${p.total} ${p.total === 1 ? "resource" : "resources"} found</span>${p.total ? `<span class="result-range"> · Showing ${p.first + 1}–${p.first + p.items.length}</span>` : ""}`;
  $("#pagination").innerHTML =
    p.pages > 1
      ? `<nav class="pagination" aria-label="Inventory pages"><button data-page="${p.page - 1}" ${p.page === 1 ? "disabled" : ""} aria-label="Previous page">←</button>${Array.from({ length: p.pages }, (_, i) => `<button data-page="${i + 1}" aria-label="Page ${i + 1}" ${p.page === i + 1 ? 'aria-current="page"' : ""}>${i + 1}</button>`).join("")}<button data-page="${p.page + 1}" ${p.page === p.pages ? "disabled" : ""} aria-label="Next page">→</button></nav>`
      : "";
  const chips = [];
  if (browse.query) chips.push(["query", "Search: " + browse.query]);
  if (browse.category) chips.push(["category", cats[browse.category]]);
  if (browse.school) chips.push(["school", browse.school]);
  if (browse.condition) chips.push(["condition", browse.condition]);
  if (browse.method)
    chips.push([
      "method",
      browse.method === "pickup" ? "Self-pickup" : "Pick up or delivery",
    ]);
  if (browse.kind)
    chips.push(["kind", browse.kind === "swap" ? "Swaps" : "Free transfers"]);
  if (browse.available) chips.push(["available", "Not yet requested"]);
  $("#active-filters").innerHTML = chips.length
    ? chips
        .map(
          ([key, label]) =>
            `<button class="filter-chip" data-remove-filter="${key}" aria-label="Remove filter: ${esc(label)}">${esc(label)} <span aria-hidden="true">×</span></button>`,
        )
        .join("") + '<button class="text-link" data-clear>Clear all</button>'
    : "<p>Use one filter or combine several.</p>";
  bind("[data-page]", (el) => {
    browse.page = Number(el.dataset.page);
    renderGrid();
    saveBrowse();
    $("#inventoryGrid").focus({ preventScroll: true });
    $(".catalogbar").scrollIntoView({
      block: "start",
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
  });
  bind("[data-remove-filter]", (el) => {
    const key = el.dataset.removeFilter;
    browse[key] = defaults()[key];
    browse.page = 1;
    renderInventory();
    saveBrowse();
    $("#search").focus({ preventScroll: true });
  });
  bindCommon();
  if (clamped) saveBrowse();
}
function saveBrowse() {
  try {
    localStorage.setItem("clustershare-browse-v1", JSON.stringify(browse));
  } catch {}
  if (view === "inventory") history.replaceState(null, "", inventoryHash());
}
function inventoryHash() {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(browse))
    if (value !== defaults()[key] && value !== "")
      params.set(key, String(value));
  return "#inventory" + (params.size ? "?" + params.toString() : "");
}
function navigate(target) {
  const hash = target === "inventory" ? inventoryHash() : "#" + target;
  if (location.hash === hash) readRoute(true);
  else location.hash = hash;
}
function readRoute(scroll = true) {
  const [path, search = ""] = location.hash.slice(1).split("?");
  const known = ["home", "inventory", "items", "ledger"];
  if (path === "courier") { history.replaceState(null, "", "#items"); return readRoute(scroll); }
  view = known.includes(path) ? path : "home";
  if (view === "inventory") {
    const params = new URLSearchParams(search);
    browse = defaults();
    for (const key of Object.keys(browse))
      if (params.has(key)) browse[key] = params.get(key);
    browse.category = Math.min(
      4,
      Math.max(0, Math.trunc(Number(browse.category)) || 0),
    );
    browse.page = Math.max(1, Number(browse.page) || 1);
    browse.literal = browse.literal === true || browse.literal === "true";
    browse.available = browse.available === true || browse.available === "true";
    if (browse.school && !campusCodes[browse.school]) browse.school = "";
    if (!["", "courier", "pickup"].includes(browse.method)) browse.method = "";
    if (!["", "transfer", "swap"].includes(browse.kind)) browse.kind = "";
    if (!["newest", "value", "name"].includes(browse.sort))
      browse.sort = "newest";
    saveBrowse();
  }
  itemsTab = new URLSearchParams(search).get("tab") || "requests";
  render();
  if (scroll) window.scrollTo({ top: 0, behavior: "instant" });
}
window.addEventListener("hashchange", () => readRoute());
function bindCommon() {
  window.ClusterReveal?.mount(main);
  document
    .querySelectorAll("[data-list]")
    .forEach((el, i) => (el.dataset.focusKey ||= `list-${view}-${i}`));
  bind("[data-list]", () => listResource());
  bind("[data-request]", (el) =>
    requestFor(el.dataset.request)
      ? reviewExisting(requestFor(el.dataset.request))
      : openClaim(el.dataset.request),
  );
  bind("[data-detail]", (el) => quickView(el.dataset.detail));
  bind("[data-save]", (el) => {
    toggleSave(el.dataset.save);
    if (view === "inventory") renderGrid();
    else if (view === "items") renderItems();
    else renderHome();
    const button = document.querySelector(
      `[data-focus-key="save-${CSS.escape(el.dataset.save)}"]`,
    );
    button?.focus({ preventScroll: true });
  });
  bind("[data-clear]", () => {
    browse = defaults();
    renderInventory();
    saveBrowse();
    $("#search").focus({ preventScroll: true });
  });
  bind("[data-sources]", () => $("#sources").click());
  setupImages();
}
function setupImages() {
  document.querySelectorAll("img").forEach((img) => {
    const container = img.closest(
      ".resource-media,.hero-asset,.quick-photo,.showcase-photo",
    );
    const ready = () => {
      img.dataset.ready = "true";
      container?.removeAttribute("aria-busy");
    };
    img.onload = ready;
    img.onerror = () => {
      if (img.dataset.fallback) {
        ready();
        return;
      }
      img.dataset.fallback = "true";
      img.src = M.fallbackImage(img.dataset.category);
      img.alt = "Classroom resource illustration; photograph unavailable.";
    };
    if (img.complete && img.naturalWidth) ready();
    else if (img.complete) img.onerror();
    else container?.setAttribute("aria-busy", "true");
  });
}

function toggleSave(id) {
  if (!ensureFresh()) return false;
  const present = state.saved.some((s) => String(s) === String(id));
  state.saved = present
    ? state.saved.filter((s) => String(s) !== String(id))
    : [...state.saved, findAsset(id)?.id || id];
  const stored = persist();
  toast(
    !stored
      ? "Saved-item change applies to this session only; browser storage is unavailable."
      : present
        ? "Resource removed from saved items."
        : "Resource saved. Find it in Your Items.",
  );
  return !present;
}
function render() {
  try { renderView(); window.ClusterStartup?.ready(); }
  catch (error) { console.error(error); window.ClusterStartup?.fail(); }
}
function renderView() {
  window.ClusterReveal?.dispose();
  heroCleanup();
  sharingCleanup();
  document.title =
    "ClusterShare — " +
    {
      home: "Made for the next classroom",
      inventory: "Inventory Commons",
      items: "Your Items",
      ledger: "Impact",
    }[view];
  document
    .querySelectorAll("[data-view]")
    .forEach((el) =>
      el.setAttribute(
        "aria-current",
        el.dataset.view === view ? "page" : "false",
      ),
    );
  $("#claimCount").textContent = state.claims.filter(M.isActive).length;
  $(".bell i").hidden = state.read;
  main.className = "view-" + view;
  ({
    home: () => renderHome(),
    inventory: () => renderInventory(),
    items: () => renderItems(),
    ledger: () => renderLedger(),
  })[view]();
  if ($('#personalize')) $('#personalize').onclick = openProfile;
  if (storageBlocked && !$("#storage-notice"))
    main.insertAdjacentHTML(
      "afterbegin",
      '<p id="storage-notice" class="notice" role="alert">Existing browser data could not be read and has been left untouched. This session is temporary.</p>',
    );
}
function dh(title, kicker = "ClusterShare") {
  return `<div class="dialog-head"><div><span class="eyebrow">${kicker}</span><h2 id="drawerTitle" tabindex="-1">${title}</h2></div><button class="icon-button close" aria-label="Close drawer">×</button></div>`;
}
function openDrawer(html) {
  if (!drawer.open) {
    returnFocus = document.activeElement;
    returnKey = returnFocus?.dataset?.focusKey || "";
  }
  drawer.className = html.includes('class="quick-photo"')
    ? "resource-detail"
    : "workflow-drawer";
  drawer.innerHTML = html;
  if (!drawer.open) drawer.showModal();
  $(".close")?.addEventListener("click", () => drawer.close());
  $("#drawerTitle")?.focus();
  setupImages();
  prepareValidation();
}
drawer.addEventListener("close", () => {
  const replacement = returnKey
    ? document.querySelector(`[data-focus-key="${CSS.escape(returnKey)}"]`)
    : null;
  const target = returnFocus?.isConnected
    ? returnFocus
    : replacement || document.querySelector(`[data-view="${view}"]`);
  target?.focus({ preventScroll: true });
});
function quickView(id) {
  const a = findAsset(id);
  if (!a) {
    toast("Resource not found. Try refreshing inventory.");
    return;
  }
  openDrawer(
    dh(esc(a.title), "Resource details") +
      `<div class="quick-photo">${resourceImage(a)}</div><dl class="quick-details decision-facts"><dt>Quantity & included items</dt><dd>${esc(a.qty)}</dd><dt>Condition</dt><dd>${esc(a.condition)}</dd>${a.notes ? `<dt>Condition details & accessories</dt><dd>${esc(a.notes)}</dd>` : ""}<dt>Known limitations</dt><dd>${a.selfPickup ? "Self-pickup required for this bulky resource. " : ""}${a.notes ? "Confirm the listed details and accessories with the origin school." : "No additional condition or accessory details supplied. Confirm with the origin school before an actual handoff."}</dd></dl><span class="resource-status">${statusText(a)}</span><div class="form-actions detail-actions"><button class="secondary" id="quickSave" aria-pressed="${state.saved.some((s) => String(s) === String(id))}">${state.saved.some((s) => String(s) === String(id)) ? "Unsave resource" : "Save resource"}</button><button class="primary" id="quickRequest">${requestFor(id) ? "Review request" : a.swap ? "Propose a swap" : "Request resource"} ↗</button></div><dl class="quick-details"><dt>Transfer price</dt><dd><strong>Free · $0</strong></dd><dt>School</dt><dd>${esc(a.school)} · Room ${esc(a.room)}</dd><dt>Educator</dt><dd>${esc(a.teacher)}${a.local ? "" : " · Fictional demo educator"}</dd><dt>Department</dt><dd>${esc(a.department)}</dd><dt>Asset ID</dt><dd>${esc(a.assetId)}</dd><dt>Replacement estimate</dt><dd>${money(a.value)} / complete lot<br><small>${a.count} × ${money(a.unitValue)} per unit. Reference estimate, not a sale price.</small></dd><dt>Handoff</dt><dd>${a.selfPickup ? "Coordinated self-pickup required for this bulky resource." : "Pick up or delivery. Arrange transportation with the school."}</dd></dl><p class="notice">${a.local ? "This listing was created in this browser. It has not been published or approved by a school." : "Seeded demonstration listing. Availability, teacher identity, room, and condition are simulated."} No educator verification or real dispatch occurs.</p>`,
  );
  if (a.local) {
    $("#quickSave").remove();
    $("#quickRequest").textContent = "Edit listing";
    $("#quickRequest").onclick = () => listResource(id);
    return;
  }
  $("#quickSave").onclick = () => {
    const saved = toggleSave(id);
    $("#quickSave").textContent = saved ? "Unsave resource" : "Save resource";
    $("#quickSave").setAttribute("aria-pressed", String(saved));
    if (view === "inventory") renderGrid();
    else if (view === "items") renderItems();
    else renderHome();
  };
  $("#quickRequest").onclick = () =>
    requestFor(id) ? reviewExisting(requestFor(id)) : openClaim(id);
}
function openClaim(id, existing = null) {
  selected = findAsset(id);
  if (!selected || selected.archived)
    return toast("Restore this listing before requesting it.");
  if (requestFor(id) && !existing) return reviewExisting(requestFor(id));
  editingRequest = existing;
  swapMode = !!selected.swap;
  step = 1;
  formData = existing ? { ...existing } : {};
  drawStep();
}
function drawStep() {
  const labels = ["Educator identity", "Destination", "Review & handoff"];
  const a = selected;
  openDrawer(
    dh(
      labels[step - 1],
      `${swapMode ? "Swap proposal" : "Transfer request"} · Step ${step} of 3`,
    ) +
      `<ol class="step-index" aria-label="Request progress">${labels.map((label, i) => `<li ${i + 1 === step ? 'aria-current="step"' : ""}><b>0${i + 1}</b><span>${label}</span></li>`).join("")}</ol><div class="selected-item"><strong>${esc(a.title)}</strong><p>${esc(a.qty)} · ${esc(a.school)}</p></div><form id="claimForm"><p id="form-error" class="form-error" role="alert" hidden></p>${step === 1 ? `<label for="name">Full name</label><input id="name" name="name" required maxlength="100" autocomplete="name" value="${esc(formData.name)}"><label for="department">Department</label><select id="department" name="department" required>${options(["Mathematics", "Science", "Literacy & Languages", "Technology", "Arts & Music", "Elementary Education", "Classroom Support"], formData.department, "Select a department")}</select><label for="email">Email address</label><input id="email" name="email" required type="email" autocomplete="email" value="${esc(formData.email)}"><p class="field-help">Use demo details for judging. No email is sent or verified.</p>` : step === 2 ? `<label for="campus">Destination campus</label><select id="campus" name="campus" required>${options(Object.keys(campusCodes), formData.campus, "Choose a Forsyth campus")}</select><label for="room">Target room number</label><input id="room" name="room" required maxlength="40" value="${esc(formData.room)}" placeholder="e.g. 208">${swapMode ? `<label for="offer">Resource you would offer</label><textarea id="offer" name="offer" required maxlength="800" placeholder="Quantity, condition, and resource description…">${esc(formData.offer)}</textarea>` : ""}` : `<h3>Review your request</h3><dl class="quick-details"><dt>Educator</dt><dd>${esc(formData.name)} · ${esc(formData.department)}<br>${esc(formData.email)}</dd><dt>Destination</dt><dd>${esc(formData.campus)} · Room ${esc(formData.room)}</dd><dt>Price</dt><dd>Free · $0</dd>${swapMode ? `<dt>Proposed swap</dt><dd>${esc(formData.offer)}</dd>` : ""}</dl><fieldset class="method-options"><legend>Choose a proposed handoff</legend><label class="radio"><input type="radio" name="method" value="Cluster courier" ${a.selfPickup ? "disabled" : formData.method !== "Self-pickup" ? "checked" : ""}><span>Delivery<small>Arrange transportation from the origin school to your campus with the school. This demo does not provide or book a delivery service.</small></span></label><label class="radio"><input type="radio" name="method" value="Self-pickup" ${a.selfPickup || formData.method === "Self-pickup" ? "checked" : ""}><span>Pick up<small>${a.selfPickup ? "Required for this bulky item. " : ""}Arrange timing and suitable transport with the school.</small></span></label></fieldset><p class="notice">${swapMode ? "Your proposal will remain pending; this demo cannot approve a swap." : "This records a request in this browser, not a confirmed allocation or dispatch."}</p>`}<div class="form-actions">${step > 1 ? '<button type="button" class="secondary" id="back">Back</button>' : ""}<button type="submit" class="primary">${step === 3 ? (editingRequest ? "Save revised request" : swapMode ? "Submit demo proposal" : "Submit demo request") : "Continue →"}</button></div></form>`,
  );
  $("#back")?.addEventListener("click", () => {
    Object.assign(formData, Object.fromEntries(new FormData($("#claimForm"))));
    step--;
    drawStep();
  });
  $("#claimForm").onsubmit = (e) => {
    e.preventDefault();
    const next = Object.fromEntries(new FormData(e.target));
    for (const [key, val] of Object.entries(next))
      if (typeof val === "string") next[key] = val.trim();
    if (Object.values(next).some((v) => !v)) {
      showFormError(
        "Enter meaningful text for this field.",
        Object.keys(next).find((key) => !next[key]),
      );
      return;
    }
    Object.assign(formData, next);
    if (step < 3) {
      step++;
      drawStep();
    } else {
      try {
        if (!ensureFresh()) return;
        const hash =
          editingRequest?.trackingHash ||
          Array.from(crypto.getRandomValues(new Uint8Array(8)), (n) =>
            n.toString(16).padStart(2, "0"),
          )
            .join("")
            .toUpperCase();
        const c = editingRequest
          ? M.reviseRequest(
              a,
              editingRequest,
              formData,
              state,
              Object.keys(campusCodes),
              localDate(),
            )
          : M.createRequest(
              a,
              formData,
              state,
              Object.keys(campusCodes),
              hash,
              localDate(),
            );
        c.createdAt = editingRequest?.createdAt || Date.now();
        if (editingRequest)
          state.claims = state.claims.map((r) => (r.id === c.id ? c : r));
        else state.claims.push(c);
        if (!persist()) c.sessionOnly = true;
        render();
        voucher(c);
      } catch (error) {
        showFormError(error.message);
      }
    }
  };
}
function showFormError(message, field) {
  const el = $("#form-error");
  if (!el) {
    toast(message);
    return;
  }
  el.hidden = false;
  el.textContent = message;
  el.tabIndex = -1;
  if (field) {
    const input = document.getElementById(field);
    input?.setAttribute("aria-invalid", "true");
    input?.setAttribute("aria-describedby", "form-error");
    input?.focus();
  } else el.focus();
}
function prepareValidation() {
  const form = drawer.querySelector("form");
  if (!form) return;
  form.addEventListener(
    "invalid",
    (e) => {
      e.target.setAttribute("aria-invalid", "true");
      e.target.setAttribute("aria-describedby", "form-error");
      const error = $("#form-error");
      error.hidden = false;
      error.textContent = e.target.validationMessage;
    },
    true,
  );
  form.addEventListener("input", (e) => {
    e.target.removeAttribute("aria-invalid");
    if (e.target.getAttribute("aria-describedby") === "form-error")
      e.target.removeAttribute("aria-describedby");
  });
}

function voucherBarcode(hash) {
  let x = 0;
  const bars = [...hash]
    .flatMap((char) =>
      [...char.charCodeAt(0).toString(2).padStart(8, "0")].map((bit) => {
        const bar = bit === "1" ? `<rect x="${x}" width="2" height="54"/>` : "";
        x += 2;
        return bar;
      }),
    )
    .join("");
  return `<svg viewBox="0 0 ${x} 54" role="img" aria-label="Illustrative barcode; not a scannable district tracking code" preserveAspectRatio="none">${bars}</svg>`;
}
function voucher(c) {
  const a = findAsset(c.asset);
  if (!a) return toast("The original resource could not be found.");
  const hash = c.trackingHash || c.id;
  openDrawer(
    dh(
      c.status === "withdrawn"
        ? "Request withdrawn."
        : c.type === "swap"
          ? "Swap proposal recorded."
          : "Request recorded.",
      c.sessionOnly
        ? "Session only · storage unavailable"
        : c.status === "withdrawn"
          ? "Withdrawn local record"
          : "Saved in this browser",
    ) +
      `<p class="notice">${c.sessionOnly ? "This record will not survive a refresh. " : ""}${!M.isActive(c) ? "Withdrawn record. Do not use this record for a handoff. Create a new request if needed." : c.type === "swap" ? "Swap proposal pending. This record does not verify a transfer, provide school approval, contact staff, or book transportation." : "Proposed browser-local record only. No transfer is verified, school approval provided, staff contacted, or transportation booked."}</p><div class="voucher"><div class="voucher-masthead"><b>ClusterShare</b><span>Transfer Custody Record<br>${esc(c.date)}</span></div><div class="routing-stamp"><span>ILLUSTRATIVE CAMPUS ROUTING</span><strong>${campusCodes[a.school] || "LOCAL"} → ${campusCodes[c.campus] || "LOCAL"}</strong><small>${c.method === "Self-pickup" ? "SELF-PICKUP / COORDINATION REQUIRED" : "DELIVERY / ARRANGEMENTS REQUIRED"}</small></div><h3>${esc(a.title)}</h3><p>${esc(a.qty)} · ${esc(a.assetId)}</p><dl class="voucher-details"><dt>From</dt><dd>${esc(a.school)} · Room ${esc(a.room)}</dd><dt>To</dt><dd>${esc(c.campus)} · Room ${esc(c.room)}</dd><dt>Educator</dt><dd>${esc(c.name)} · ${esc(c.department)}</dd><dt>Price</dt><dd>Free · $0</dd>${c.offer ? `<dt>Swap offer</dt><dd>${esc(c.offer)}</dd>` : ""}</dl><div class="voucher-status">${c.status === "withdrawn" ? "WITHDRAWN · DO NOT USE FOR HANDOFF" : c.type === "swap" ? "PENDING APPROVAL" : "REQUESTED · NOT DISPATCHED"}</div><div class="barcode">${voucherBarcode(hash)}</div><code>${esc(hash)}</code><p class="voucher-disclaimer">INDEPENDENT STUDENT DEMO · ILLUSTRATIVE TRACKING<br>Proposed browser-based demonstration. This record does not verify a transfer or provide school approval.</p></div><div class="form-actions"><button class="secondary" id="printVoucher">Print Transfer Custody Record</button><button class="primary" id="viewClaims">View your items →</button></div><section class="next-actions" ${!M.isActive(c) ? "hidden" : ""}><h3>Next steps outside this demo</h3><ol><li>Confirm permission and availability with the origin school.</li><li>Agree on pickup or an delivery or pickup arrangements with both campuses.</li><li>Pack accessories and bring the proposed Transfer Custody Record.</li></ol></section>${M.isActive(c) ? `<div class="form-actions"><button class="secondary" id="reviseRequest">Revise request</button><button class="secondary" id="withdrawRequest">Withdraw request</button></div>` : ""}`,
  );
  $("#reviseRequest")?.addEventListener("click", () => {
    if (ensureFresh()) openClaim(c.asset, c);
  });
  $("#withdrawRequest")?.addEventListener("click", () => withdrawRequest(c.id));
  $("#printVoucher").onclick = () => window.print();
  $("#viewClaims").onclick = () => {
    drawer.close();
    navigate("items");
  };
}
function reviewExisting(c) {
  voucher(c);
}
$("#sources").onclick = () =>
  openDrawer(
    dh("The thinking behind the numbers.", "SOURCES & METHODOLOGY") +
      `<p>The district directory substantiates school names. The other school-system policies are comparative examples, not Forsyth rules or evidence of the demonstration estimates. ClusterShare is an independent FBLA demonstration, not a district service.</p><a class="source" target="_blank" rel="noopener" href="https://apps.fcps.org/legal/documents/400-03">Frederick County Public Schools · Property relocation policy ↗<small>Public regulation describing school-system property relocation and equipment transfer requests.</small></a><a class="source" target="_blank" rel="noopener" href="https://www.fcps.edu/get-involved/procurement-services/public-auction-and-surplus">Fairfax County Public Schools · Public auction & surplus ↗<small>Context for responsible surplus materials and equipment handling.</small></a><a class="source" target="_blank" rel="noopener" href="https://www.forsyth.k12.ga.us/inside-fcs/financial-transparency">Forsyth County Schools · Financial transparency ↗<small>Official local budget and finance references. These do not substantiate the simulated ClusterShare replacement-value totals.</small></a><a class="source" target="_blank" rel="noopener" href="https://www.forsyth.k12.ga.us/schools/about">Forsyth County Schools · School directory ↗<small>Local campus names used throughout this demonstration. School names do not imply an operating delivery service.</small></a><details class="impact-research"><summary>Research behind the reuse approach</summary><p>Rheaply frames internal reuse around finding existing resources before repurchasing. DonorsChoose connects classroom needs with donor support. These are references for the approach, not evidence of ClusterShare savings.</p><a class="source" target="_blank" rel="noopener" href="https://rheaply.com/internal-reuse/">Rheaply · Internal reuse ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.donorschoose.org/teachers">DonorsChoose · Classroom resources and donor support ↗</a><a class="source" target="_blank" rel="noopener" href="https://sustainability.uchicago.edu/get-involved/waste-recycling-resources/rheaply/">University of Chicago · Internal resource exchange ↗</a></details><details class="photo-credits"><summary>Inventory photography credits</summary><p>Representative catalog photography, shown for this educational demonstration.</p><a class="source" target="_blank" rel="noopener" href="https://underwooddistributing.com/products/ti84plusceteacherpack">TI-84 Plus CE · Underwood Distributing ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.officeboffins.co.uk/bs-poly-stacking-school-chairs.html">Classroom chairs · Office Boffins ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.dynatech.de/vernier-go-direct-temperatursensor-teacherpack-gdx-tmp-tp-8x-gdx-tmp-ladestation-messbereich-40-1250c-0-250c-wireless-usb">Vernier probe kit · DynaTech ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.ebay.com/itm/126976250905">The Great Gatsby classroom lot · eBay seller ↗</a><a class="source" target="_blank" rel="noopener" href="https://manuals.plus/asin/B0CNTHVSGD">Mobile whiteboard · COSTWAY / Manuals+ ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.lakeshorelearning.com/products/books/paperback-books/leveled-books-classroom-library2/p/TT160X/">Guided reading library · Lakeshore Learning ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.lakeshorelearning.com/products/accessories/book-bins-set-of-12/p/LM453/">Book bins · Lakeshore Learning ↗</a><a class="source" target="_blank" rel="noopener" href="https://www.schoolspecialty.com/frey-scientific-classroom-microscope-bundle-intermediate-2132612">Microscope kit · School Specialty ↗</a>${seed
        .filter((a) => a.source)
        .map(
          (a) =>
            `<a class="source" target="_blank" rel="noopener" href="${esc(a.source)}">${esc(a.title)} · Photo reference ↗</a>`,
        )
        .join(
          "",
        )}</details><div class="panel"><h2>Transparent by design</h2><p>School names reflect real Forsyth County campuses. Inventory listings and replacement estimates are demonstration data, not actual school surplus. Product photographs are representative catalog images; quantities, condition, and accessories may differ. No accounts, payments, or real dispatches are created. Demo claims remain in this browser.</p></div>`,
  );
$("#alerts").onclick = () => {
  if (!ensureFresh()) return;
  state.read = true;
  persist();
  $(".bell i").hidden = true;
  const records=state.claims.slice().reverse().slice(0,5);
  openDrawer(dh('Notifications','On this browser')+`<div class="notification-list">${records.length?records.map(c=>{const a=findAsset(c.asset);return `<details><summary><span>${esc(a?.title || 'Resource request')}<small>${M.requestLabel(c)} · ${esc(c.date)}</small></span></summary><p>${esc(c.campus)} · ${c.method === "Self-pickup" ? "Pick up" : "Delivery"}. ${M.isActive(c)?'School coordination is still required. No message or booking was sent.':'This local request was withdrawn.'}</p><a href="#items">Review in Your Items ↗</a></details>`;}).join(''):'<p>No local request activity yet.</p>'}<p class="fineprint">Only browser-local activity. No real approvals or deliveries.</p></div>`);
  drawer.classList.add('notification-drawer');
  drawer.querySelectorAll('a').forEach(a=>a.onclick=()=>drawer.close());
};
$("#profile").onclick = openProfile;
$("#reset").onclick = () => {
  openDrawer(
    dh(
      "Reset this browser’s demonstration?",
      "Your data stays until you choose",
    ) +
      '<p>This clears local requests, offers, saved resources, and your created listings, and restores the 45 seeded listings. This cannot be undone in the app. Your theme preference stays.</p><div class="form-actions"><button class="secondary" id="cancelReset">Keep my data</button><button class="primary" id="confirmReset">Reset demo data</button></div>',
  );
  $("#cancelReset").onclick = () => drawer.close();
  $("#confirmReset").onclick = () => {
    if (!storageBlocked && !ensureFresh()) return;
    try {
      baseRaw = localStorage.getItem(storageKey);
    } catch {
      toast("Browser storage is unavailable; nothing was reset.");
      return;
    }
    state = initial();
    storageBlocked = false;
    browse = defaults();
    persist();
    try {
      localStorage.removeItem("clustershare-browse-v1");
    } catch {}
    drawer.close();
    navigate("home");
    toast("Demo reset. Seed listings restored.");
  };
};
const themeSwitch = $("#themeSwitch"),
  systemTheme = matchMedia("(prefers-color-scheme: dark)");
let savedTheme;
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeSwitch.setAttribute("aria-checked", String(theme === "dark"));
  themeSwitch.title =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  themeSwitch.querySelector(".theme-name").textContent =
    theme === "dark" ? "Dark" : "Light";
}
try {
  savedTheme = localStorage.getItem("clustershare-theme");
} catch {}
applyTheme(
  savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : systemTheme.matches
      ? "dark"
      : "light",
);
themeSwitch.onclick = () => {
  savedTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(savedTheme);
  try {
    localStorage.setItem("clustershare-theme", savedTheme);
  } catch {}
};
systemTheme.addEventListener("change", (e) => {
  if (!savedTheme) applyTheme(e.matches ? "dark" : "light");
});
$(".skip").onclick = (e) => {
  e.preventDefault();
  main.focus({ preventScroll: true });
  main.scrollIntoView({ block: "start", behavior: "instant" });
};
bind("[data-view]", (el, e) => {
  e.preventDefault();
  navigate(el.dataset.view);
});
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    if (view !== "inventory") {
      navigate("inventory");
      setTimeout(() => $("#search")?.focus(), 0);
    } else $("#search").focus();
  }
});
if (!location.hash) history.replaceState(null, "", "#home");
readRoute(false);

window.addEventListener("clustershare:reveal-ready", () => {
  if (view === "home") bindCommon();
});

})();
