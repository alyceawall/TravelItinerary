import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import '../api/db';
import itineraryModel from '../api/itineraryModel';

// Gets all language data from the DB
export async function GET(request: Request) {
  try {
    console.log('Before query');

    // Query the database
    //Log the result to the console for debugging
    const itineraryData = await itineraryModel.find({});
    //console.log('Data from Itineraries collection:', itineraryData);

    // Creates a HTTP response object using itineraries Data OR {} as the json
    return NextResponse.json(itineraryData || {});
  } catch (error) {
    console.error('Error querying the database:', error); // Log the specific error
    return NextResponse.error();
  }
}