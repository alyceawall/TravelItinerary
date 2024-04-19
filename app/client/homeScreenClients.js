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

export function AddNewItinerary() {
	const router = useRouter();
	
	return (
	<button 
		className = "new-event-button" 
		style = {{position:"fixed",left:"50%",transform:"translateX(-50%)",margin:"auto",bottom:"50px"}}
		onClick = {() => router.push("/home/create-itinerary")}
	>Add new itinerary</button>
	)
}