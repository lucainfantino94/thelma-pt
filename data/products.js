/*
  Catálogo de exemplo — SUBSTITUIR pelos produtos reais da Thelma.
  Cada produto precisa de: id (único), name, category, price (número, EUR),
  description e image (caminho para a foto real em assets/img/produtos/).
  "image" pode ficar vazio ("") enquanto não há foto — aparece um placeholder.
*/
const PRODUCTS = [
  {
    id: "colete-bordado-floral",
    name: "Colete Bordado Floral",
    category: "roupas",
    price: 39.9,
    description: "Colete em algodão com bordado floral colorido feito à mão, forro em tons crus.",
    image: ""
  },
  {
    id: "top-estampa-animal",
    name: "Top Estampado Animal Print",
    category: "roupas",
    price: 24.9,
    description: "Top ombro a ombro em estampa animal print, tecido fluido.",
    image: ""
  },
  {
    id: "blusa-off-shoulder-crua",
    name: "Blusa Off-Shoulder Crua",
    category: "roupas",
    price: 29.9,
    description: "Blusa larga em tecido cru, manga ampla, ideal para o verão.",
    image: ""
  },
  {
    id: "vestido-maxi-castanho",
    name: "Vestido Maxi Castanho",
    category: "roupas",
    price: 54.9,
    description: "Vestido longo em tom castanho, alças finas, cinto incluído.",
    image: ""
  },
  {
    id: "vestido-branco-bordado",
    name: "Vestido Branco Bordado",
    category: "roupas",
    price: 59.9,
    description: "Vestido midi branco com bordados artesanais, ideal para ocasiões especiais.",
    image: ""
  },
  {
    id: "top-bolinhas-preto",
    name: "Top Halter Bolinhas",
    category: "roupas",
    price: 22.9,
    description: "Top halter em padrão bolinhas, fecho no pescoço.",
    image: ""
  },
  {
    id: "colar-dourado-classico",
    name: "Colar Dourado Clássico",
    category: "bijuteria",
    price: 14.9,
    description: "Colar banhado a dourado, fecho ajustável, peça atemporal.",
    image: ""
  },
  {
    id: "brincos-argola-natural",
    name: "Brincos Argola Natural",
    category: "bijuteria",
    price: 9.9,
    description: "Brincos em argola com acabamento natural, leves para o dia a dia.",
    image: ""
  },
  {
    id: "pulseira-conjunto-dourado",
    name: "Conjunto de Pulseiras Douradas",
    category: "bijuteria",
    price: 12.9,
    description: "Conjunto de 3 pulseiras finas em tom dourado, combináveis.",
    image: ""
  },
  {
    id: "saco-palha-alcas-pele",
    name: "Saco de Palha com Alças em Pele",
    category: "sacos",
    price: 44.9,
    description: "Saco tote em palha natural entrançada com alças e detalhes em pele castanha.",
    image: ""
  },
  {
    id: "saco-tote-crochet",
    name: "Saco Tote em Crochet",
    category: "sacos",
    price: 34.9,
    description: "Saco tote em crochet natural, forro interior e bolso pequeno.",
    image: ""
  },
  {
    id: "cinto-couro-fivela-dourada",
    name: "Cinto em Pele com Fivela Dourada",
    category: "cintos",
    price: 19.9,
    description: "Cinto fino em pele genuína com fivela dourada, várias cores disponíveis.",
    image: ""
  }
];

const CATEGORY_LABELS = {
  roupas: "Roupas",
  bijuteria: "Bijuteria",
  sacos: "Sacos & Acessórios",
  cintos: "Cintos"
};
