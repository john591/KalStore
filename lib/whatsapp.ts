const WHATSAPP_BUSINESS_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER ?? "";

type WhatsAppProduct = {
  name: string;
  slug: string;
  price: number;
};

function normalizePhoneNumber(phone: string) {
  return phone.replace(/\D/g, "");
}

export function createWhatsAppProductLink(
  product: WhatsAppProduct,
  origin: string,
) {
  const productUrl = `${origin}/products/${product.slug}`;
  const message = [
    "Bonjour, je veux acheter cet article :",
    product.name,
    `Prix: $${product.price}`,
    `Lien: ${productUrl}`,
  ].join("\n");
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = normalizePhoneNumber(WHATSAPP_BUSINESS_NUMBER);

  if (phoneNumber) {
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }

  return `https://wa.me/?text=${encodedMessage}`;
}
