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
	>Submit</button>
	)
}

export function AddToItinerary() {
	const router = useRouter();
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push("/home/itinerary")}
	>Add to itinerary</button>
	)
}