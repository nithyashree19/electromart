// Import your local images
import phoneImg from './assets/phone.jpeg';
import headphonesImg from './assets/headphones.jpeg';
import watchImg from './assets/watch.jpeg';
import laptopImg from './assets/laptop.jpeg';

const products = [
  { 
    id: 1, 
    name: "Galaxy Note 23 Ultra", 
    brand: "Samsung",
    category: "Smartphone",
    price: 1299, 
    image: phoneImg,
    specs: "S Pen included, 200MP camera, 12GB RAM, 6.8 inch Dynamic AMOLED",
    description: "Ultimate productivity smartphone with built-in S Pen stylus."
  },
  { 
    id: 2, 
    name: "Bose QuietComfort Ultra", 
    brand: "Bose",
    category: "Audio",
    price: 429, 
    image: headphonesImg,
    specs: "Immersive Audio, 24hrs battery, CustomTune technology",
    description: "Premium headphones with world-class noise cancellation and spatial audio."
  },
  { 
    id: 3, 
    name: "Garmin Fenix 7X Solar", 
    brand: "Garmin",
    category: "Wearables", 
    price: 899, 
    image: watchImg,
    specs: "Solar charging, 51mm case, Multi-GNSS, 28-day battery",
    description: "Rugged multisport GPS watch with solar charging capability."
  },
  { 
    id: 4, 
    name: "Dell XPS 15 OLED", 
    brand: "Dell",
    category: "Laptop",
    price: 2199, 
    image: laptopImg,
    specs: "Intel i7-13700H, 32GB RAM, RTX 4060, 15.6 inch 3.5K OLED",
    description: "Creator laptop with stunning OLED display and powerful performance."
  },
  { 
    id: 5, 
    name: "Microsoft Surface Pro 9", 
    brand: "Microsoft",
    category: "Tablet",
    price: 1099, 
    image: laptopImg,
    specs: "13 inch PixelSense, Intel i7, Surface Pen compatible",
    description: "Versatile 2-in-1 tablet that works like a laptop."
  },
  { 
    id: 6, 
    name: "Nintendo Switch OLED", 
    brand: "Nintendo",
    category: "Gaming",
    price: 349, 
    image: headphonesImg,
    specs: "7 inch OLED screen, Enhanced audio, 64GB storage",
    description: "Portable gaming console with vibrant OLED display."
  },
  { 
    id: 7, 
    name: "Nikon Z9 Mirrorless", 
    brand: "Nikon",
    category: "Photography",
    price: 5499, 
    image: phoneImg,
    specs: "45.7MP stacked sensor, 8K video, 120fps burst mode",
    description: "Professional flagship camera for sports and wildlife photography."
  }
];

export default products;
