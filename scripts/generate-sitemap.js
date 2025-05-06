import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

(async () => {
  const sitemap = new SitemapStream({ hostname: "https://sarah-ghobj.com" });

  // List all your static routes here
  const pages = ["/", "/cv"];

  // If your site has dynamic content, add those URLs here as well
  pages.forEach((page) => {
    sitemap.write({ url: page, changefreq: "monthly", priority: 0.8 });
  });

  sitemap.end();

  // Save the generated sitemap.xml in the public folder
  const xml = await streamToPromise(sitemap);
  createWriteStream("./public/sitemap.xml").write(xml);
})();
