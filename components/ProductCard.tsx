import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block rounded-xl bg-white p-2 transition hover:shadow-md"
    >
      <div className="mb-3 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="h-40 w-full object-cover sm:h-44 md:h-48"
        />
      </div>

      <div className="space-y-1">
        <h3 className="line-clamp-2 text-sm leading-5 text-gray-900">
          {product.name}
        </h3>

        <p className="pt-1 text-2xl font-bold leading-none text-gray-900">
          ${product.price}
        </p>

        <p className="text-sm text-gray-600">MOQ: {product.moq}</p>

        <p className="truncate text-sm text-gray-600">
          <span className="mr-1 inline-block font-medium text-gray-800">
            {product.country}
          </span>
          {product.supplier}
        </p>

        <div className="pt-1">
          {product.verified ? (
            <span className="text-sm font-semibold text-blue-700">
              Verified Supplier
            </span>
          ) : (
            <span className="text-sm text-gray-500">Supplier</span>
          )}
        </div>
      </div>
    </Link>
  );
}