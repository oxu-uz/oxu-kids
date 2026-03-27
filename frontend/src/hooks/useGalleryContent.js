import { useEffect, useMemo, useState } from "react";
import { applyGalleryLayout, getGalleryItems } from "../data/gallery";
import { apiFetch } from "../lib/api";

export function useGalleryContent(locale) {
  const fallbackItems = useMemo(() => getGalleryItems(locale), [locale]);
  const [galleryItems, setGalleryItems] = useState(fallbackItems);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    let active = true;

    setGalleryLoading(true);

    apiFetch("/gallery")
      .then((items) => {
        if (!active) {
          return;
        }

        if (Array.isArray(items) && items.length > 0) {
          setGalleryItems(applyGalleryLayout(items));
          return;
        }

        setGalleryItems(fallbackItems);
      })
      .catch(() => {
        if (active) {
          setGalleryItems(fallbackItems);
        }
      })
      .finally(() => {
        if (active) {
          setGalleryLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [fallbackItems]);

  return { galleryItems, galleryLoading };
}
