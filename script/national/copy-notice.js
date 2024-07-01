const fs = require("fs");

fs.copyFile(
  "patch/cloud-screenshot.png",
  "dist/lcp_vue_web/cloud-screenshot.png",
  function callback(err) {
    if (err) throw err;
    console.log(
      "Copy cloud-screenshot.png patch to dist/national successfully!"
    );
  }
);

fs.copyFile(
  "patch/notice.html",
  "dist/lcp_vue_web/notice.html",
  function callback(err) {
    if (err) throw err;
    console.log("Copy notice.html patch to dist/national successfully!");
  }
);
