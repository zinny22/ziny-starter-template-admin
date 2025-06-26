export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  sku: string;
  category: string;
  price: number;
  quantitySold: number;
  revenue: number;
  stock: number;
  updatedAt: string;
  status: "판매중" | "일시중지" | "품절";
};
