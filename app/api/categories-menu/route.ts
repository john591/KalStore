import { NextResponse } from "next/server";
import { getCategories } from "@/lib/catalog";

export async function GET() {
  try {
    const categories = await getCategories();
    const payload = categories.map((category) => ({
      ...category,
      href: `/categories/${category.slug}`,
    }));

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to load categories right now.",
      },
      { status: 500 },
    );
  }
}
