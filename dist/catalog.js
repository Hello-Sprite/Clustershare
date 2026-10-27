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
