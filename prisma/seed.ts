import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@store.com' },
    update: {},
    create: {
      email: 'admin@store.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
      phone: '+1234567890',
      address: '123 Admin St',
      city: 'New York',
      country: 'US',
      zipCode: '10001',
    },
  });

  // Create customer user
  const customerPassword = await bcrypt.hash('test123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      email: 'customer@test.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: Role.CUSTOMER,
      phone: '+1987654321',
      address: '456 Customer Ave',
      city: 'Los Angeles',
      country: 'US',
      zipCode: '90001',
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest gadgets and electronic devices',
        image: 'https://placehold.co/600x400?text=Electronics',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'clothing' },
      update: {},
      create: {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Trendy fashion and apparel',
        image: 'https://placehold.co/600x400?text=Clothing',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home-living' },
      update: {},
      create: {
        name: 'Home & Living',
        slug: 'home-living',
        description: 'Furniture, decor and home essentials',
        image: 'https://placehold.co/600x400?text=Home+%26+Living',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sports' },
      update: {},
      create: {
        name: 'Sports',
        slug: 'sports',
        description: 'Sports equipment and outdoor gear',
        image: 'https://placehold.co/600x400?text=Sports',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Watches, bags and personal accessories',
        image: 'https://placehold.co/600x400?text=Accessories',
      },
    }),
  ]);

  const [electronics, clothing, homeLiving, sports, accessories] = categories;

  // Create products
  const products = [
    {
      name: 'Wireless Noise-Cancelling Headphones',
      slug: 'wireless-noise-cancelling-headphones',
      description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio. Perfect for music lovers and remote workers.',
      price: 299.99,
      comparePrice: 349.99,
      images: ['https://placehold.co/600x400?text=Headphones+1', 'https://placehold.co/600x400?text=Headphones+2'],
      stock: 50,
      isActive: true,
      isFeatured: true,
      categoryId: electronics.id,
    },
    {
      name: 'Smart Watch Pro',
      slug: 'smart-watch-pro',
      description: 'Advanced fitness tracking smartwatch with GPS, heart rate monitor, sleep tracking, and 5-day battery life. Water resistant to 50m.',
      price: 199.99,
      comparePrice: 249.99,
      images: ['https://placehold.co/600x400?text=SmartWatch+1', 'https://placehold.co/600x400?text=SmartWatch+2'],
      stock: 35,
      isActive: true,
      isFeatured: true,
      categoryId: electronics.id,
    },
    {
      name: 'Portable Bluetooth Speaker',
      slug: 'portable-bluetooth-speaker',
      description: 'Compact wireless speaker with 360-degree sound, waterproof design, and 12-hour playtime. Take your music anywhere.',
      price: 79.99,
      images: ['https://placehold.co/600x400?text=Speaker+1', 'https://placehold.co/600x400?text=Speaker+2'],
      stock: 100,
      isActive: true,
      isFeatured: false,
      categoryId: electronics.id,
    },
    {
      name: 'Classic Denim Jacket',
      slug: 'classic-denim-jacket',
      description: 'Timeless denim jacket crafted from premium cotton with a comfortable relaxed fit. Features button closure and multiple pockets.',
      price: 89.99,
      comparePrice: 120.00,
      images: ['https://placehold.co/600x400?text=Denim+Jacket+1', 'https://placehold.co/600x400?text=Denim+Jacket+2'],
      stock: 75,
      isActive: true,
      isFeatured: true,
      categoryId: clothing.id,
    },
    {
      name: 'Premium Cotton T-Shirt',
      slug: 'premium-cotton-tshirt',
      description: 'Ultra-soft 100% organic cotton t-shirt with a modern slim fit. Available in multiple colors. Pre-shrunk for lasting comfort.',
      price: 34.99,
      images: ['https://placehold.co/600x400?text=T-Shirt+1', 'https://placehold.co/600x400?text=T-Shirt+2'],
      stock: 200,
      isActive: true,
      isFeatured: false,
      categoryId: clothing.id,
    },
    {
      name: 'Running Sneakers Ultra',
      slug: 'running-sneakers-ultra',
      description: 'Lightweight performance running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole.',
      price: 129.99,
      comparePrice: 159.99,
      images: ['https://placehold.co/600x400?text=Sneakers+1', 'https://placehold.co/600x400?text=Sneakers+2'],
      stock: 60,
      isActive: true,
      isFeatured: true,
      categoryId: clothing.id,
    },
    {
      name: 'Minimalist Desk Lamp',
      slug: 'minimalist-desk-lamp',
      description: 'Modern LED desk lamp with adjustable brightness, color temperature control, and USB charging port. Sleek aluminum design.',
      price: 59.99,
      images: ['https://placehold.co/600x400?text=Desk+Lamp+1', 'https://placehold.co/600x400?text=Desk+Lamp+2'],
      stock: 40,
      isActive: true,
      isFeatured: false,
      categoryId: homeLiving.id,
    },
    {
      name: 'Scented Candle Collection',
      slug: 'scented-candle-collection',
      description: 'Set of 3 luxury soy wax candles in Vanilla, Lavender, and Cedar scents. Each candle burns for 45+ hours.',
      price: 44.99,
      images: ['https://placehold.co/600x400?text=Candles+1', 'https://placehold.co/600x400?text=Candles+2'],
      stock: 120,
      isActive: true,
      isFeatured: false,
      categoryId: homeLiving.id,
    },
    {
      name: 'Ergonomic Office Chair',
      slug: 'ergonomic-office-chair',
      description: 'Premium ergonomic chair with lumbar support, adjustable armrests, breathable mesh back, and smooth-rolling casters.',
      price: 449.99,
      comparePrice: 599.99,
      images: ['https://placehold.co/600x400?text=Office+Chair+1', 'https://placehold.co/600x400?text=Office+Chair+2'],
      stock: 15,
      isActive: true,
      isFeatured: true,
      categoryId: homeLiving.id,
    },
    {
      name: 'Yoga Mat Premium',
      slug: 'yoga-mat-premium',
      description: 'Extra-thick 6mm non-slip yoga mat with alignment lines. Made from eco-friendly TPE material. Includes carrying strap.',
      price: 49.99,
      images: ['https://placehold.co/600x400?text=Yoga+Mat+1', 'https://placehold.co/600x400?text=Yoga+Mat+2'],
      stock: 80,
      isActive: true,
      isFeatured: false,
      categoryId: sports.id,
    },
    {
      name: 'Resistance Bands Set',
      slug: 'resistance-bands-set',
      description: 'Complete set of 5 resistance bands with different tension levels. Includes door anchor, handles, and ankle straps.',
      price: 29.99,
      images: ['https://placehold.co/600x400?text=Resistance+Bands+1', 'https://placehold.co/600x400?text=Resistance+Bands+2'],
      stock: 150,
      isActive: true,
      isFeatured: false,
      categoryId: sports.id,
    },
    {
      name: 'Insulated Water Bottle',
      slug: 'insulated-water-bottle',
      description: 'Double-wall vacuum insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free.',
      price: 34.99,
      images: ['https://placehold.co/600x400?text=Water+Bottle+1', 'https://placehold.co/600x400?text=Water+Bottle+2'],
      stock: 200,
      isActive: true,
      isFeatured: false,
      categoryId: sports.id,
    },
    {
      name: 'Leather Crossbody Bag',
      slug: 'leather-crossbody-bag',
      description: 'Handcrafted genuine leather crossbody bag with adjustable strap, multiple compartments, and brass hardware.',
      price: 149.99,
      comparePrice: 189.99,
      images: ['https://placehold.co/600x400?text=Crossbody+Bag+1', 'https://placehold.co/600x400?text=Crossbody+Bag+2'],
      stock: 30,
      isActive: true,
      isFeatured: true,
      categoryId: accessories.id,
    },
    {
      name: 'Aviator Sunglasses',
      slug: 'aviator-sunglasses',
      description: 'Classic aviator sunglasses with polarized lenses and lightweight metal frame. UV400 protection for all-day comfort.',
      price: 69.99,
      images: ['https://placehold.co/600x400?text=Sunglasses+1', 'https://placehold.co/600x400?text=Sunglasses+2'],
      stock: 90,
      isActive: true,
      isFeatured: false,
      categoryId: accessories.id,
    },
    {
      name: 'Minimalist Wallet',
      slug: 'minimalist-wallet',
      description: 'Slim RFID-blocking wallet made from premium leather. Holds up to 8 cards and cash. Perfect for front pocket carry.',
      price: 39.99,
      images: ['https://placehold.co/600x400?text=Wallet+1', 'https://placehold.co/600x400?text=Wallet+2'],
      stock: 110,
      isActive: true,
      isFeatured: false,
      categoryId: accessories.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log('Seed data created successfully!');
  console.log(`Admin: admin@store.com / admin123`);
  console.log(`Customer: customer@test.com / test123`);
  console.log(`Categories: ${categories.length}`);
  console.log(`Products: ${products.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
