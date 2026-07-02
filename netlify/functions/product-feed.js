// Génère le flux produit (Google Shopping / RSS 2.0) à partir de data/products.json,
// pour connexion à Google Merchant Center (Products → Feeds → Scheduled fetch).
// URL publique : /feed.xml (redirigé vers cette fonction, voir netlify.toml)

const CATEGORY_LABELS = {
  roupas: "Roupas",
  bijuteria: "Bijuteria",
  sacos: "Sacos & Acessórios",
  cintos: "Cintos"
};

function escapeXml(value) {
  return String(value ?? "").replace(/[<>&'"]/g, (c) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;"
  }[c]));
}

exports.handler = async () => {
  const siteUrl = (process.env.URL || "https://thelma-pt.netlify.app").replace(/\/$/, "");

  let products = [];
  try {
    const res = await fetch(`${siteUrl}/data/products.json`);
    const data = await res.json();
    products = Array.isArray(data.products) ? data.products : [];
  } catch (err) {
    return { statusCode: 502, body: "Não foi possível carregar o catálogo de produtos." };
  }

  // O Google Merchant Center exige fotografias reais: produtos sem foto ficam
  // de fora do feed até teres uma imagem real via /admin.
  const withImages = products.filter((p) => !!p.image);

  const items = withImages
    .map((p) => {
      const link = `${siteUrl}/loja.html#produto-${encodeURIComponent(p.id)}`;
      const image = p.image.startsWith("http") ? p.image : `${siteUrl}${p.image}`;
      const availability = p.stock === false ? "out of stock" : "in stock";
      return `
    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <title>${escapeXml(p.name)}</title>
      <description>${escapeXml(p.description)}</description>
      <link>${escapeXml(link)}</link>
      <g:image_link>${escapeXml(image)}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${Number(p.price).toFixed(2)} EUR</g:price>
      <g:brand>Thelma</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>false</g:identifier_exists>
      <g:google_product_category>Apparel &amp; Accessories</g:google_product_category>
      <g:product_type>${escapeXml(CATEGORY_LABELS[p.category] || p.category)}</g:product_type>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Thelma.pt — Catálogo de Produtos</title>
    <link>${siteUrl}</link>
    <description>Feed de produtos Thelma.pt para o Google Merchant Center</description>
${items}
  </channel>
</rss>`;

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/xml; charset=UTF-8" },
    body: xml
  };
};
