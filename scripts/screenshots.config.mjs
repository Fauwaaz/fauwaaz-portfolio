/**
 * Pages to capture for each project. Paths come from each site's own navigation.
 * `name` becomes the file name: public/images/projects/<slug>/<name>.jpg
 *
 * `discover`: also collect up to `max` same-site links from the header/nav, for sites
 *             whose page structure isn't listed here.
 * `hide`:     extra CSS selectors to hide on that site (popups, chat bubbles, banners).
 */
export default {
  outputDir: "public/images/projects",
  contentDir: "src/content/projects",
  viewport: { width: 1440, height: 810 }, // 16:9, matches the card carousel
  deviceScaleFactor: 1.5,
  jpegQuality: 80,
  projects: [
    {
      slug: "sparkcloud",
      baseUrl: "https://sparkcloud.in",
      pages: [{ name: "01-home", path: "/" }],
      discover: { max: 4 },
    },
    {
      slug: "dbound-media",
      baseUrl: "https://www.dboundmedia.com",
      pages: [
        { name: "01-home", path: "/" },
        { name: "02-about", path: "/about" },
        { name: "03-services", path: "/services" },
        { name: "04-projects", path: "/projects" },
        { name: "05-contact", path: "/contact" },
      ],
    },
    {
      slug: "house-of-r-martin",
      baseUrl: "https://houseofrmartin.com",
      pages: [
        { name: "01-home", path: "/" },
        { name: "02-shop", path: "/shop" },
        { name: "03-collection", path: "/shop?collection=linen-collection" },
        { name: "04-product", path: "/product/mens-regular-fit-100-linen-shirt" },
        { name: "05-about", path: "/about" },
      ],
    },
    {
      slug: "the-pawfect-story",
      baseUrl: "https://thepawfectstory.com",
      pages: [
        { name: "01-home", path: "/" },
        { name: "02-products", path: "/products" },
        { name: "03-category", path: "/category/beds" },
        { name: "04-product", path: "/products/h-shape-dual-colored-harness" },
        { name: "05-blogs", path: "/blogs" },
        { name: "06-about", path: "/about" },
      ],
    },
    {
      slug: "netcall-services",
      baseUrl: "https://netcallservices.com",
      pages: [
        { name: "01-home", path: "/" },
        { name: "02-telecom", path: "/telecom/" },
        { name: "03-products", path: "/products-showcase/" },
        { name: "04-pricing", path: "/pricing/" },
        { name: "05-cloud", path: "/cloud-services/" },
        { name: "06-contact", path: "/contact-us/" },
      ],
    },
    {
      slug: "club-de-golf",
      baseUrl: "https://clubdegolf.in",
      pages: [
        { name: "01-home", path: "/" },
        { name: "02-about", path: "/about" },
        { name: "03-menu", path: "/menu" },
        { name: "04-events", path: "/events" },
        { name: "05-golf", path: "/golf-for-everyone/" },
        { name: "06-contact", path: "/contact" },
      ],
    },
    {
      slug: "dnaughties-world",
      baseUrl: "https://dnaughtiesworld.co.in",
      pages: [
        { name: "01-home", path: "/" },
        { name: "02-about", path: "/about-us/" },
        { name: "03-preschool", path: "/programs/preschool/" },
        { name: "04-admissions", path: "/admissions/" },
        { name: "05-gallery", path: "/gallery/" },
        { name: "06-contact", path: "/contact-us/" },
      ],
    },
    {
      slug: "usifa",
      baseUrl: "https://usifa.org",
      pages: [
        { name: "01-home", path: "/" },
        { name: "02-about", path: "/about-us/" },
        { name: "03-initiatives", path: "/our-initiatives/" },
        { name: "04-how-we-work", path: "/how-we-work/" },
        { name: "05-reports", path: "/reports/" },
        { name: "06-partner", path: "/partner-with-us/" },
      ],
    },
    {
      slug: "the-woodenware",
      baseUrl: "https://thewoodenware.com",
      pages: [
        { name: "01-home", path: "/" },
        { name: "02-shop", path: "/shop/" },
        { name: "03-product", path: "/product/pen-stand/" },
        { name: "04-our-story", path: "/our-story/" },
        { name: "05-book-online", path: "/book-online/" },
        { name: "06-contact", path: "/contact-us/" },
      ],
    },
  ],
};
