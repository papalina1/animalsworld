module.exports = function (eleventyConfig) {

  // Pass static assets through unchanged
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/robots.njk": "robots.txt" });

  // Articles collection — sorted newest first
  eleventyConfig.addCollection("articles", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/articles/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Filter: limit array length
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // Filter: exclude current page from related articles
  eleventyConfig.addFilter("excludeUrl", (arr, url) =>
    arr.filter((item) => item.url !== url)
  );

  // Filter: format date
  eleventyConfig.addFilter("date", (dateVal, format) => {
    const d = new Date(dateVal);
    if (format === "MMMM D, YYYY") {
      return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }
    return d.toLocaleDateString("en-US");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
