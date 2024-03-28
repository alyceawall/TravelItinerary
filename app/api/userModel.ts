import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_.-]+$/
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      itineraries: [{
        type: Schema.Types.ObjectId,
        ref: 'Itinerary'
      }],
      friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }]
    });


// Create the userModel to be used by database
const userModel = mongoose.model ('Users', userSchema)
// Make the model and schema available
export default userModel;
