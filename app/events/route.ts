import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import testModel from '../api/db';
import eventModel from '../api/eventModel';

// Gets all language data from the DB
export async function GET(request: Request) {
  try {
    console.log('Before query');

    // Query the database
    const testData = await testModel.find({});
    
    // Log the result to the console for debugging
    console.log('API Route: After query, result:', testData);

    const eventData = await eventModel.find({});
    console.log('Data from events collection:', eventData);

    // const combinedData = {
    //     testData: testData,
    //     eventData: eventData,
    // };

    // Creates a HTTP response object using userData OR {} as the json
    return NextResponse.json(eventData || {});
  } catch (error) {
    console.error('Error querying the database:', error); // Log the specific error
    return NextResponse.error();
  }
}