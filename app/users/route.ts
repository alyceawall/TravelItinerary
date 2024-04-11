import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import '../api/db';
import userModel from '../api/userModel';


// Gets all language data from the DB
export async function GET(request: Request) {
  try {
    console.log('Before query');

    // Query the database
    //Log the result to the console for debugging
    const userData = await userModel.find({});
    console.log('Data from Users collection:', userData);

    // Creates a HTTP response object using userData OR {} as the json
    return NextResponse.json(userData || {});
  } catch (error) {
    console.error('Error querying the database:', error); // Log the specific error
    return NextResponse.error();
  }
}

