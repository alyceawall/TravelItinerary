import mongoose from 'mongoose';


const itinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
    // Unique identifier formed by replacing all spaces in the display_name with underscores
    // and concatenating it with the itinerary creator’s username
  },
  display_name: {
    type: String,
    required: true
    // What the user types in as the itineraries name at creation or during edits
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
    // Array of unique event identifiers associated with the itinerary
  }],
  date_start: {
    type: Date,
    required: true
    // Start date of the itinerary’s events
  },
  date_end: {
    type: Date,
    required: true
    // End date of the itinerary’s events
  },
  participants: [{
    type: String,
    // Array of usernames that are permitted to access the itinerary
    // Would be separated out into further lists if we make roles
  }],
  desc: {
    type: String,
    // User-input description of the itinerary
    // Can be empty
  }
});

const itineraryModel = mongoose.models.itineraries || mongoose.model('itineraries', itinerarySchema);

// Export the model
export default itineraryModel;