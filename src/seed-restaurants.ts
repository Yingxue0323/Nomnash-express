import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from './models/RestaurantModel';
import { connectDB } from './configs/db';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Convert time format (9:00AM -> 900, 5:30PM -> 1730)
function convertTimeToNumber(timeStr: string) {
  const [time, period] = timeStr.toUpperCase().split(/([AP]M)/);
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  
  return hours * 100 + (minutes || 0);
}

// Restaurant data
const restaurants = [
  {
    name: 'Noodle Plus',
    description: 'Authentic Chinese hand-pulled noodles made fresh daily.',
    category: 'CHINESE',
    campus: 'CLAYTON',
    address: 'Monash University Clayton Campus, Learning and Teaching Building, Ground Floor, Clayton VIC 3168',
    priceRange: [20],
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/NoodlePlus.jpg'],
    rating: 3.9,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('9:00AM'), closeTime: convertTimeToNumber('5:30pm') }
    ]
  },
  {
    name: 'Noodle Noodle',
    description: 'Quick and hearty Chinese stir-fry and noodle dishes.',
    category: 'CHINESE',
    campus: 'CLAYTON',
    address: 'Shop G30, Campus Centre, Monash University, 21 Chancellors Walk Clayton Victoria 3168 Australia',
    priceRange: [20],
    phone: '99058058',
    websiteUrl: 'https://www.monash.edu/food-and-retail/vendors/noodle-noodle',
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/NoodleNoodle.jpg'],
    rating: 3.8,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('8:00AM'), closeTime: convertTimeToNumber('7:00pm') }
    ]
  },
  {
    name: 'PappaRich Monash',
    description: 'Popular Malaysian chain offering roti, laksa, and teh tarik.',
    category: 'SOUTH_EAST_ASIAN',
    campus: 'CLAYTON',
    address: 'Shop G15, Campus Centre, Monash University, 21 Chancellors Walk Clayton Victoria 3168 Australia',
    priceRange: [20],
    phone: '95433884',
    websiteUrl: 'https://www.papparich.net.au/store/monash-express?utm_content=PappaRich%20Monash%20-%20Clayton&utm_campaign=Google%20My%20Business&utm_medium=organic&utm_source=google&utm_term=plcid_9438989265666385837',
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/papparich.jpg'],
    rating: 3.3,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('10:00AM'), closeTime: convertTimeToNumber('7:00pm') }
    ]
  },
  {
    name: 'Guzman y Gomez - Monash University',
    description: 'Lively Mexican eatery serving burritos, tacos, and nachos.',
    category: 'MEXICAN',
    campus: 'CLAYTON',
    address: 'Monash University Clayton Campus, 21 Chancellors Walk, Clayton VIC 3800',
    priceRange: [20],
    phone: '99881409',
    websiteUrl: 'https://www.guzmanygomez.com.au/locations/monash-university/',
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/Guzman.jpg'],
    rating: 4,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('6:30AM'), closeTime: convertTimeToNumber('11pm') }
    ]
  },
  {
    name: 'Neptune\'s Seafood Catch',
    description: 'Classic fish & chips and seafood snacks, Aussie-style.',
    category: 'FAST_FOOD',
    campus: 'CLAYTON',
    address: 'Ground Floor, Campus Centre, 21 Chancellors Walk, Clayton campus',
    priceRange: [20],
    phone: '+614234511987',
    websiteUrl: 'https://www.monash.edu/food-and-retail/vendors/neptunes-seafood-catch',
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/Neptune.jpg'],
    rating: 3.7,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('8:30AM'), closeTime: convertTimeToNumber('5:00pm') }
    ]
  },
  {
    name: 'Subway',
    description: 'Custom-made sandwiches and wraps with fresh ingredients.',
    category: 'FAST_FOOD',
    campus: 'CLAYTON',
    address: '21 Chancellors Walk Part Monash University, Clayton Campus Ground Floor G25, Clayton VIC 3168',
    priceRange: [20],
    websiteUrl: 'https://www.subway.com/en-au',
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/subway.jpg'],
    rating: 3,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('8:00AM'), closeTime: convertTimeToNumber('7:00pm') }
    ]
  },
  {
    name: 'Sushi Sushi',
    description: 'Grab-and-go sushi rolls, nigiri, and Japanese snacks.',
    category: 'JAPANESE',
    campus: 'CLAYTON',
    address: 'Monash University Clayton Campus & Blackburn Rd Clayton VIC 3800 AU, Wellington Road, G29/21 Chancellors Walk, Clayton VIC 3168',
    priceRange: [20],
    phone: '95432629',
    websiteUrl: 'https://www.sushisushi.com.au/our-stores/monash-university-clayton-132',
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/sushi.jpg'],
    rating: 2.7,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('9:00AM'), closeTime: convertTimeToNumber('5:00pm') }
    ]
  },
  {
    name: 'Schnitz Monash University',
    description: 'Crispy hand-crumbed schnitzels with Aussie flair.',
    category: 'FAST_FOOD',
    campus: 'CLAYTON',
    address: '28 Sports Walk, Clayton VIC 3800',
    priceRange: [40],
    phone: '+61385222866',
    websiteUrl: 'https://schnitz.com.au/our-menu/',
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/schnitz.jpg'],
    rating: 4,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('10:00AM'), closeTime: convertTimeToNumber('8:45pm') }
    ]
  },
  {
    name: 'Meeting Point',
    description: 'Cosy campus café known for coffee, pastries, and study-friendly vibes.',
    category: 'CAFE',
    campus: 'CLAYTON',
    address: 'Shop 61, Ground Floor, Campus Centre, 21 Chancellors Walk, Clayton campus',
    priceRange: [20],
    phone: '99055714',
    websiteUrl: 'https://www.monash.edu/food-and-retail/vendors/meeting-point-clayton',
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/meetingpoint.jpg'],
    rating: 4,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('8:00AM'), closeTime: convertTimeToNumber('6:00pm') }
    ]
  },
  {
    name: 'Roll\'d Monash University Clayton',
    description: 'Vietnamese street food with a modern twist – banh mi, pho, and rice paper rolls.',
    category: 'SOUTH_EAST_ASIAN',
    campus: 'CLAYTON',
    address: 'Tenancy G16, Northern Plaza Monash University, Clayton VIC 3168',
    priceRange: [20],
    phone: '+61395589291',
    websiteUrl: 'https://rolld.com.au/',
    imagesUrl: ['https://koala-ccl-bucket.s3.ap-southeast-2.amazonaws.com/nomnash/rolld.jpg'],
    rating: 3.2,
    openTime: [
      { dayOfWeek: 'FRIDAY', openTime: convertTimeToNumber('9:00AM'), closeTime: convertTimeToNumber('8:00pm') }
    ]
  }
];

// Insert restaurants
async function seedRestaurants() {
  try {
    // Clear existing restaurants (optional)
    await Restaurant.deleteMany({});
    
    // Insert new restaurants
    const result = await Restaurant.insertMany(restaurants);
    console.log(`${result.length} restaurants inserted successfully`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding restaurants:', error);
    mongoose.connection.close();
  }
}

// Run the seed function
seedRestaurants();
