"use client";
import { useParams } from "next/navigation";

function ProductDetailPage() {
  const { id } = useParams();
  return (
    <div>
      ProductDetailPage
      <p> {id}</p>
    </div>
  );
}

export default ProductDetailPage;
