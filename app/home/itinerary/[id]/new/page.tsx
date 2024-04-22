import '../../../../style.css';
import {FormEvent} from 'react'
import eventModel from '../../../../api/eventModel'
import itineraryModel from '../../../../api/itineraryModel'
//import EventParticipantsManager from '../../../client/eventParticipantsManager'
//import ParticipantsBox from '../../../client/participantsBox'

import SubmitButton from '../../../../client/editEventClient';

var itineraries;
var originItinerary;

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	itineraries = await getItineraryData();
	originItinerary = itineraries.find((itinerary) => itinerary._id == id)
	return (
		<AddEvent/>
  );
	
	//<HomeScreen/>    <SearchScreen/>		<ItineraryScreen itineraryName={"Joe's BBQ Bash"}/>  <NewEventScreen/>
}


	// New event screen

function AddEvent() {
	var itinerary_id = originItinerary._id.valueOf();
	console.log(itinerary_id)

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

		const response = await fetch('http://localhost:31600/api/writeDataEvent', {
			method: "POST",
			body: newEvent,
  		}); 
		
		//store itinerary information, then delete the old itinerary to make a new updated one
		console.log(originItinerary);
		originItinerary.events.push(newEvent);

		var _id = originItinerary._id;
		var name = originItinerary.name;
		var events = originItinerary.events;
		var date_start = originItinerary.date_start;
		var date_end = originItinerary.date_end;
		var participants = originItinerary.participants;
		var desc = originItinerary.desc;

		//deletes old itinerary
		await itineraryModel.deleteOne({name: name})
		
		let updatedItinerary = await itineraryModel.create({
			_id: _id,
			name: name,
			display_name: name,
			events: events,
			date_start:date_start,
			date_end: date_end,
			participants: participants,
			desc: desc
		})

		await fetch('http://localhost:31600/api/writeDataItinerary', {
			method: "POST",
			body: updatedItinerary,
  		}); 
	
	}
	return (

		
		<div>
			<div className="header-banner">
				<h1>Create a new event</h1>
			</div>
			<form action = {onSubmit} style={{paddingTop:"100px", padding:"25px"}}>
				<label style={{display:"block"}}>
					Title: 
					<input name = "name" style={{marginLeft:"10px"}}></input>
				</label>
				
				<label style={{display:"block", paddingTop:"15px"}}>
					Start date and time: 
					<input type="datetime-local" name = "time_start" style={{marginLeft:"10px"}}></input>
				</label>
				
				<label style={{display:"block", paddingTop:"15px"}}>
					End date and time: 
					<input type="datetime-local" name = "time_end" style={{marginLeft:"10px"}}></input>
				</label>
				
				<label style={{display:"block", paddingTop:"15px"}}>
					Address/location: 
					<input name = "location" style={{marginLeft:"10px"}}></input>
				</label>
				
				<label style={{display:"block", paddingTop:"15px"}}>
					Website for managing event:
					<input name = "link_to_site" style={{marginLeft:"10px"}}></input>
				</label>
				
				<label style={{display:"block", paddingTop:"15px"}}>
					Other notes:
				</label>
				<textarea name = "desc" style={{display:"block", marginBottom:"15px"}}></textarea>
				
				<SubmitButton itinerary_id = {itinerary_id}/>
			</form>
		</div>
	);
}


	
// Avoid caching, so that hot updates work as expected
export const dynamic = 'force-dynamic'
// Get the language data from the database.
// Returns a json object.

async function getItineraryData() {
	try {
		const res = await fetch(
			'http://localhost:31600/itineraries',
		);
		console.log('Frontend Fetch: Response status:', res.status);
        const data = await res.json();
        //console.log('Frontend Fetch: Data from server:', data);
        return data;
    } catch (error) {
        console.error('Frontend Fetch: Error fetching data:', error);
        throw error;
    }
}
