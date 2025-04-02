export default [
  {
    title: "Home",
    to: { name: "root" },
    icon: { icon: "ri-home-smile-2-line" },
  },
  {
    title: "Product",
    to: { name: "product" },
    icon: { icon: "ri-shirt-line" },
    children: [
      {
        title: "Change SKU / ID",
        to: { name: "product-change-sku-id" },
      },
    ],
  },
];
