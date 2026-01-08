import { DateTime } from "luxon";

export default function (eleventyConfig) {
  // Human-readable date, UTC to keep builds stable
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL d, yyyy");
  });

  // RFC 822 for RSS `<pubDate>`
  eleventyConfig.addFilter("rfc822Date", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toRFC2822();
  });

  // ISO for sitemap `<lastmod>`
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate();
  });

  // Sort posts by date descending
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByTag("posts").sort((a, b) => b.date - a.date);
  });

  // Convenience collection for all tag names, excluding internal ones
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      const tags = item.data.tags;
      if (!tags) return;
      const arr = Array.isArray(tags) ? tags : [tags];
      arr.forEach((t) => tagSet.add(t));
    });

    // Exclude these from public tag pages
    ["all", "nav", "post", "posts"].forEach((t) => tagSet.delete(t));

    return [...tagSet].sort((a, b) => a.localeCompare(b));
  });

  // Simple site metadata
  eleventyConfig.addGlobalData("site", {
    title: "Tiny Theme",
    description: "A deliberately minimal website and blog.",
    url: "" // optionally set e.g. "https://example.com"
  });

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
