import mongoose from 'mongoose';
import userModel from './userModel';
import itineraryModel from './itineraryModel';
import eventModel from './eventModel';
import { addFriend } from './addFriends';

// Connect to the database
mongoose.connect(process.env.MONGODB_URI!, { useNewUrlParser: true, useUnifiedTopology: true });


mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

//Define a function to create test data
async function createTestData() {
  try {
      // Create a test user
      const testUser = await userModel.create({
          name: 'Mario Bro',
          username: 'mariobro',
          password: 'mariopassword',
          email: 'mariobro@example.com',
          itineraries: [],
          friends: [],
      });

      const testUser2 = await userModel.create({
        name: 'Luigi Bro',
        username: 'luigibro',
        password: 'luigipassword',
        email: 'luigibro@example.com',
        itineraries: [],
        friends: [],
    });

      // Create a test itinerary
      const testItinerary = await itineraryModel.create({
          name: 'Vacation at Peach\'s Castle',
          display_name: 'Vacation at Peach\'s Castle',
          events: [], // Events are added separately
          date_start: new Date('2025-02-12T12:30:00'),
          date_end: new Date('2025-02-22T12:30:00'),
          participants: [testUser._id, testUser2._id], // Add the test user as a participant
          desc: 'Mario & Luigi\'s Trip to Peach\'s Castle.',
      });

      // Create a test event
      const testEvent = await eventModel.create({
          name: 'Dinner with Peach',
          display_name: 'Dinner with Peach',
          time_start: new Date('2025-02-14T18:30:00'),
          time_end: new Date('2025-02-14T19:30:00'),
          location: 'Peach\'s Castle',
          link_to_site: '',
          participants: [testUser._id], // Add the test user as a participant
          desc: 'Dinner with Peach',
      });

      // Associate the test event with the test itinerary
      testItinerary.events.push(testEvent._id);
      await testItinerary.save();

      console.log('Test data created successfully');
  } catch (error) {
      console.error('Error creating test data:', error);
  }
}

async function friends() {
  try {
    await addFriend();
  } catch (error) {
    console.error('Error adding friend:', error);
  }
}

friends();

// Call the function to create test data
createTestData();
