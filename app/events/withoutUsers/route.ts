//import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import '../../api/db';
//import eventModel from '../api/eventModel';
import eventModel from '../../api/eventModel';


// Gets all language data from the DB
export async function GET(request: Request) {
  try {
    console.log('Before query');

    // Query the database
    // Log the result to the console for debugging

    const eventsWithoutUser = await eventModel.find({ participants: { $exists: true, $not: { $elemMatch: { $exists: true } } } });

    // Creates a HTTP response object including eventData and eventsWithoutUser
    return NextResponse.json(eventsWithoutUser || {});
  } catch (error) {
    console.error('Error querying the database:', error); // Log the specific error
    return NextResponse.error();
  }
}