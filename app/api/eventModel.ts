import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
    // Unique identifier formed by concatenating the itinerary name with the underscore-ified
    // version of the display name
  },
  display_name: {
    type: String,
    required: true
    // What the user types in as the event’s name at creation or during edits
    // Should be unique among other events within the same itinerary
  },
  time_start: {
    type: Date,
    required: true
    // Start time of the event
  },
  time_end: {
    type: Date,
    required: true
    // End time of the event
  },
  location: {
    type: String
    // Address of the event
  },
  link_to_site: {
    type: String
    // Address of the web page that they can actually access this event at
  },
  participants: [{
    type: String,
    // Array of usernames that are permitted to access the event
    // Would be separated out into further lists if we make roles
  }],
  desc: {
    type: String
    // User inputted miscellaneous notes about the event
    // Can be empty
  }
});

// const eventModel = mongoose.model('Event', eventSchema);
// module.exports = eventModel;

const eventModel = mongoose.models.events || mongoose.model('events', eventSchema);

// Export the model
export default eventModel;
