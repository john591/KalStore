export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  description: string;
  moq: number;
  country: string;
  supplier: string;
  verified: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones with Noise Cancellation",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80",
    category: "audio",
    slug: "wireless-headphones",
    description:
      "Premium wireless headphones with rich sound, long battery life, and all-day comfort.",
    moq: 50,
    country: "CN",
    supplier: "Shenzhen Audio Tech Co., Ltd.",
    verified: true,
  },
  {
    id: 2,
    name: "Smart Watch for Fitness and Daily Productivity",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=80",
    category: "wearables",
    slug: "smart-watch",
    description:
      "A sleek smartwatch for fitness tracking, notifications, and everyday productivity.",
    moq: 20,
    country: "CN",
    supplier: "Guangzhou Smart Devices Ltd.",
    verified: true,
  },
  {
    id: 3,
    name: "Laptop Pro for Business, Study and Creative Work",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&auto=format&fit=crop&q=80",
    category: "computing",
    slug: "laptop-pro",
    description:
      "A powerful laptop built for professionals, creators, and students who need performance.",
    moq: 10,
    country: "US",
    supplier: "Kal Digital Systems",
    verified: true,
  },
  {
    id: 4,
    name: "Gaming Mouse with Precision Sensor and RGB",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=900&auto=format&fit=crop&q=80",
    category: "gaming",
    slug: "gaming-mouse",
    description:
      "Responsive gaming mouse with ergonomic design and precise tracking.",
    moq: 100,
    country: "CN",
    supplier: "Pro Gamer Accessories Co.",
    verified: true,
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker with Deep Bass",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=900&auto=format&fit=crop&q=80",
    category: "audio",
    slug: "bluetooth-speaker",
    description:
      "Portable Bluetooth speaker with punchy sound and compact travel-ready form.",
    moq: 30,
    country: "CN",
    supplier: "Beijing Sound World Ltd.",
    verified: false,
  },
  {
    id: 6,
    name: "Mechanical Keyboard for Gaming and Office Use",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=900&auto=format&fit=crop&q=80",
    category: "gaming",
    slug: "mechanical-keyboard",
    description:
      "Mechanical keyboard with satisfying tactile switches and durable build quality.",
    moq: 25,
    country: "CN",
    supplier: "Future Input Devices Co.",
    verified: true,
  },
];