'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';


export function ViewItineraryButton({itinerary_id}) {
	const router = useRouter();
	var fullURL = "/home/itinerary/" + itinerary_id;
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push(fullURL)}
	>View Itinerary</button>
	)
}

export function AddNewItinerary({user_id}) {
	const router = useRouter();
	var fullURL = "/home/create-itinerary/" + user_id
	
	return (
	<button 
		className = "new-event-button" 
		style = {{position:"fixed",left:"50%",bottom:"50px"}}
		onClick = {() => router.push(fullURL)}
	>Add new itinerary</button>
	)
}