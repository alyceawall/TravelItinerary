import mongoose from 'mongoose';
// import userModel from './userModel';
// import itineraryModel from './itineraryModel';
// import eventModel from './eventModel';

// Connect to the database
mongoose.connect(process.env.MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define a function to create test data
// async function createTestData() {
//   try {
//       // Create a test user
//       const testUser = await userModel.create({
//           name: 'John Doe',
//           username: 'johndoe',
//           password: 'testpassword',
//           email: 'johndoe@example.com',
//           itineraries: [],
//           friends: [],
//       });

//       // Create a test itinerary
//       const testItinerary = await itineraryModel.create({
//           name: 'Test Itinerary', 
//           display_name: 'Test Itinerary',
//           events: [], // Events are added separately
//           date_start: new Date(),
//           date_end: new Date(),
//           participants: [testUser._id], // Add the test user as a participant
//           desc: 'This is a test itinerary',
//       });

//       // Create a test event
//       const testEvent = await eventModel.create({
//           name: 'Test Event',
//           display_name: 'Test Event',
//           time_start: new Date(),
//           time_end: new Date(),
//           location: 'Test Location',
//           link_to_site: 'https://bobby-tables.com/',
//           participants: [testUser._id], // Add the test user as a participant
//           desc: 'This is a test event',
//       });

//       // Associate the test event with the test itinerary
//       testItinerary.events.push(testEvent._id);
//       await testItinerary.save();

//       console.log('Test data created successfully');
//   } catch (error) {
//       console.error('Error creating test data:', error);
//   }
// }

// // Call the function to create test data
// createTestData();
