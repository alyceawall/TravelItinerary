//import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import '../api/db';
//import eventModel from '../api/eventModel';
import eventModel from '../api/eventModel';


// Gets all language data from the DB
export async function GET(request: Request) {
  try {
    console.log('Before query');

    // Query the database
    // Log the result to the console for debugging
    
    const eventData = await eventModel.find({});
    console.log('Data from events collection:', eventData);

    const eventsWithoutUser = await eventModel.find({ participants: { $exists: true, $not: { $elemMatch: { $exists: true } } } });
    console.log('Events with no associated user:', eventsWithoutUser);

    // Creates a HTTP response object using eventData and eventsWithoutUser as the json
    return NextResponse.json({ eventData, eventsWithoutUser });
  } catch (error) {
    console.error('Error querying the database:', error); // Log the specific error
    return NextResponse.error();
  }
}
