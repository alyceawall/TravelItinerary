'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';


export function AddNewEvent({itinerary_id}) {
	const router = useRouter();
	var fullURL= "/home/itinerary/new/" + itinerary_id;
	return (
	<button 
		className = "new-event-button" 
		style={{bottom:"75px"}}
		onClick = {() => router.push(fullURL)}
	>Add new event</button>
	)
}

export function SearchForEvent(itinerary_id) {
	const router = useRouter();
	var fullURL= "/home/itinerary/search/" + itinerary_id;
	return (
	<button 
		className = "new-event-button" 
		style={{bottom:"25px"}}
		onClick = {() => router.push(fullURL)}
	>Find an event</button>
	)
}

export function BackToHome() {
	const router = useRouter();
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push("/home")}
	>Back</button>
	)
}

export function EditEvent() {
	const router = useRouter();
	
	return (
		
	<button 
		className = "button" 
		style = {{position:"absolute", top:"20px", right:"20px"}}
		onClick = {() => router.push("/home/itinerary/edit")}
	>Edit</button>
	)
}