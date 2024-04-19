'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';


export function AddNewEvent({itinerary_id}) {
	const router = useRouter();
	var fullURL= "/home/itinerary/" + itinerary_id + "/new";
	return (
	<button 
		className = "new-event-button" 
		style={{bottom:"75px"}}
		onClick = {() => router.push(fullURL)}
	>Add new event</button>
	)
}

export function SearchForEvent({itinerary_id}) {
	const router = useRouter();
	var fullURL= "/home/itinerary/" + itinerary_id + "/search";
	return (
	<button 
		className = "new-event-button" 
		style={{bottom:"25px"}}
		onClick = {() => router.push(fullURL)}
	>Find an event</button>
	)
}

export function BackToHome({itinerary_id}) {
	const router = useRouter();
	var fullURL = "/home/itinerary/" + itinerary_id;
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push(fullURL)}
	>Back</button>
	)
}

export function EditEvent({itinerary_id}) {
	const router = useRouter();
	var fullURL = "/home/itinerary/" + itinerary_id + "/edit"
	
	return (
		
	<button 
		className = "button" 
		style = {{position:"absolute", top:"20px", right:"20px"}}
		onClick = {() => router.push(fullURL)}
	>Edit</button>
	)
}