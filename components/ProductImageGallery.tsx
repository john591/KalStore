"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CatalogProductImage } from "@/lib/catalog";

type ProductImageGalleryProps = {
  productName: string;
  images: CatalogProductImage[];
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=80";

function getImageLabel(image: CatalogProductImage, index: number) {
  return image.altText?.trim() || `Image ${index + 1}`;
}

function getImageAlt(
  image: CatalogProductImage | undefined,
  productName: string,
  index: number,
) {
  return image?.altText?.trim() || `${productName} image ${index + 1}`;
}

function getImageSrc(url?: string | null) {
  return url?.trim() ? url : FALLBACK_IMAGE;
}

function getShortImageName(url: string) {
  try {
    const parsedUrl = new URL(url);
    const parts = parsedUrl.pathname.split("/");
    return parts[parts.length - 1] || parsedUrl.hostname;
  } catch {
    const parts = url.split("?");
    const pathParts = parts[0]?.split("/") ?? [];
    return pathParts[pathParts.length - 1] || url;
  }
}

export default function ProductImageGallery({
  productName,
  images,
}: ProductImageGalleryProps) {
  const galleryImages = useMemo(
    () =>
      images.length > 0
        ? images.map((image) => ({
            ...image,
            image: getImageSrc(image.image),
            altText: image.altText?.trim() || productName,
          }))
        : [
            {
              id: 0,
              image: FALLBACK_IMAGE,
              altText: productName,
              isPrimary: true,
            },
          ],
    [images, productName],
  );

  const primaryIndex = Math.max(
    galleryImages.findIndex((image) => image.isPrimary),
    0,
  );

  const [selectedIndex, setSelectedIndex] = useState(primaryIndex);
  const activeIndex = selectedIndex >= galleryImages.length ? primaryIndex : selectedIndex;
  const selectedImage = galleryImages[activeIndex] ?? galleryImages[0];

  const showPrevious = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1,
    );
  };

  const showNext = () => {
    setSelectedIndex((currentIndex) =>
      currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (galleryImages.length <= 1) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }

    if (event.key === "Home") {
      event.preventDefault();
      setSelectedIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setSelectedIndex(galleryImages.length - 1);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5" onKeyDown={handleKeyDown}>
      <div className="rounded-[1.75rem] border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Visualisez les images du produit
            </p>
          </div>
          <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            {activeIndex + 1} / {galleryImages.length}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-100 bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/45 to-transparent sm:h-28" />
          <div className="relative aspect-[4/4.6] sm:aspect-[4/3.95] lg:aspect-[4/3.5]">
            <Image
              src={getImageSrc(selectedImage.image)}
              alt={getImageAlt(selectedImage, productName, activeIndex)}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 55vw"
              preload
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 p-4 text-white sm:p-5">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Vue en vedette
              </p>
              <p className="mt-1 truncate text-sm font-semibold sm:text-base">
                {getImageLabel(selectedImage, activeIndex)}
              </p>
            </div>

            {galleryImages.length > 1 ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/40 bg-white/95 shadow-sm"
                  onClick={showPrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/40 bg-white/95 shadow-sm"
                  onClick={showNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
            ) : null}
          </div>

          {galleryImages.length > 1 ? (
            <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-between px-4 sm:hidden">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full border-white/40 bg-white/95 shadow-sm"
                onClick={showPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full border-white/40 bg-white/95 shadow-sm"
                onClick={showNext}
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Images
          </h3>
          <p className="hidden text-sm text-gray-500 sm:block">
            Utilisez les flèches ou appuyez sur les touches gauche/droite pour naviguer entre les images.
          </p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 xl:grid-cols-3">
          {galleryImages.map((image, index) => {
            const isSelected = index === activeIndex;

            return (
              <button
                key={`${image.id}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "min-w-[220px] overflow-hidden rounded-[1.25rem] border bg-white text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 sm:min-w-0",
                  isSelected
                    ? "border-orange-500 ring-2 ring-orange-100 shadow-sm"
                    : "border-gray-200 hover:border-gray-400 hover:shadow-sm",
                )}
                aria-label={`Select image ${index + 1}`}
                aria-pressed={isSelected}
                aria-current={isSelected ? "true" : undefined}
              >
                <div className="relative aspect-[4/3] bg-gray-100">
                  <Image
                    src={getImageSrc(image.image)}
                    alt={getImageAlt(image, productName, index)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 220px, (max-width: 1280px) 45vw, 240px"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1 bg-white p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {getImageLabel(image, index)}
                    </p>
                    {image.isPrimary ? (
                      <span className="shrink-0 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700">
                        Principal
                      </span>
                    ) : null}
                  </div>
                  <p className="truncate text-xs text-gray-500">
                    {getShortImageName(image.image)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isSelected ? "Currently selected" : `Tap to view image ${index + 1}`}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
