'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';

export function BackToHome({itinerary_id}) {
	const router = useRouter();
	var fullURL = "/home/itinerary/" + itinerary_id
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push(fullURL)}
	>Back</button>
	)
}

export function AddNewEvent({itinerary_id}) {
	const router = useRouter();
	var fullURL= "/home/itinerary/" + itinerary_id + "/search/new";
	return (
	<button 
		className = "new-event-button" 
		style={{bottom:"75px",left:"25%"}}
		onClick = {() => router.push(fullURL)}
	>Add to itinerary</button>
	)
}
