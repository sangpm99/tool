export default [
  {
    title: "Home",
    to: { name: "root" },
    icon: { icon: "ri-home-smile-2-line" },
  },
  {
    title: "Products",
    to: { name: "products" },
    icon: { icon: "ri-shirt-line" },
    children: [
      {
        title: "Change SKU / ID",
        to: { name: "products-change-sku-id" },
      },
    ],
  },
];
