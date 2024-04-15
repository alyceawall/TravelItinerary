import '../../../style.css';
import {FormEvent} from 'react'
import eventModel from '../../../api/eventModel'
//import EventParticipantsManager from '../../../client/eventParticipantsManager'
//import ParticipantsBox from '../../../client/participantsBox'

import SubmitButton from '../../../client/editEventClient';

export default async function Page() {
	return (
		<AddEvent/>
  );
	
	//<HomeScreen/>    <SearchScreen/>		<ItineraryScreen itineraryName={"Joe's BBQ Bash"}/>  <NewEventScreen/>

}


	// New event screen

function AddEvent() {
	async function onSubmit(data: FormData) {
		"use server";

		let newEvent = await eventModel.create({
			name: data.get("name"),
			display_name: data.get("name"),
			time_start: data.get("time_start"),
			time_end: data.get("time_end"),
			location: data.get("location"),
			link_to_site: data.get("link_to_site"),
			participants: [], 
			desc: data.get("desc"),
		})
		const response = await fetch('http://localhost:31600/api/writeData', {
    	method: "POST",
    	body: newEvent,
  		});   
	
	}
	return (
		<div>
			<h1>Add new event</h1>
			<form action = {onSubmit}>
				<p>Title:</p>
				<input name = "name"></input>
				<p>Start date and time:</p>
				<input type="datetime-local" name = "time_start"></input>
				<p>End date and time:</p>
				<input type="datetime-local" name = "time_end"></input>
				<p>Address/location:</p>
				<input name = "location"></input>
				<p>Website for managing event:</p>
				<input name = "link_to_site"></input>
				<p>Other notes (optional):</p>
				<textarea name = "desc"></textarea>
				<SubmitButton/>
			</form>
		</div>
	);
}


	
// Avoid caching, so that hot updates work as expected
export const dynamic = 'force-dynamic'
// Get the language data from the database.
// Returns a json object.

async function getUserData() {
    try {
        const res = await fetch(
			//'http://cs-vm-02.cs.mtholyoke.edu:31600/api'
			'http://localhost:31600/users',
			);
        console.log('Frontend Fetch: Response status:', res.status);
        const data = await res.json();
        console.log('Frontend Fetch: Data from server:', data);
        return data;
    } catch (error) {
        console.error('Frontend Fetch: Error fetching data:', error);
        throw error;
    }
}

async function getEventData() {
    try {
        const res = await fetch(
			//'http://cs-vm-02.cs.mtholyoke.edu:31600/api'
			'http://localhost:31600/events',
			);
        console.log('Frontend Fetch: Response status:', res.status);
        const data = await res.json();
        console.log('Frontend Fetch: Data from server:', data);
        return data;
    } catch (error) {
        console.error('Frontend Fetch: Error fetching data:', error);
        throw error;
    }
}

