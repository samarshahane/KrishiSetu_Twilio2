const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: "Organic Sharbati Wheat",
    category: "Crops",
    price: 2800,
    unit: "quintal",
    quantity: 50,
    description: "High quality, chemical-free Sharbati wheat from Sehore region. Harvested March 2026.",
    farmer_name: "Vijay Patil",
    farmer_phone: "+919167298995",
    location: "Nashik, Maharashtra",
    image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400",
    user_id: "seed_user_1"
  },
  {
    name: "Hybrid Tomato Seeds",
    category: "Seeds",
    price: 450,
    unit: "kg",
    quantity: 10,
    description: "High yield hybrid tomato seeds. Disease resistant and temperature tolerant.",
    farmer_name: "Amit Kumar",
    farmer_phone: "+919167298995",
    location: "Pune, Maharashtra",
    image_url: "https://images.unsplash.com/photo-1592841608272-9f37500122aa?auto=format&fit=crop&q=80&w=400",
    user_id: "seed_user_2"
  },
  {
    name: "Mango Saplings (Kesar)",
    category: "Crops",
    price: 150,
    unit: "piece",
    quantity: 200,
    description: "Grafted Kesar mango saplings. 2 years old, ready for plantation.",
    farmer_name: "Suresh Deshmukh",
    farmer_phone: "+919167298995",
    location: "Ratnagiri, Maharashtra",
    image_url: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=400",
    user_id: "seed_user_3"
  }
];

async function seedMarketplace() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🌱 Connected to MongoDB for seeding marketplace...");
    
    // Clear existing products
    await Product.deleteMany({});
    console.log("🧹 Cleared existing marketplace products.");
    
    // Insert new products
    await Product.insertMany(sampleProducts);
    console.log("✅ Seeded 3 sample products into the Marketplace!");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedMarketplace();
