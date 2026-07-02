// Recombina os ficheiros individuais em data/products/*.json (um por produto,
// geridos via /admin) num único JSON { products: [...] }, consumido pelo site
// em /data/products.json (ver redirect em netlify.toml) e pelo feed do
// Google Merchant Center (netlify/functions/product-feed.js).

const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  const dir = path.join(process.cwd(), "data", "products");

  let products = [];
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    products = files.map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      return { id: path.basename(file, ".json"), ...JSON.parse(raw) };
    });
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ error: "Não foi possível carregar os produtos.", products: [] })
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ products })
  };
};
