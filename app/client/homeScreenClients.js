'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';


export function ViewItineraryButton() {
	const router = useRouter();
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push("/home/itinerary")}
	>View Itinerary</button>
	)
}

export function AddNewItinerary() {
	const router = useRouter();
	
	return (
	<button 
		className = "button" 
		style = {{position:"fixed",left:"50%",bottom:"50px"}}
		onClick = {() => router.push("/home/create-itinerary")}
	>Add new itinerary</button>
	)
}