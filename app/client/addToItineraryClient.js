'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';


export function AddToItinerary() {
	const router = useRouter();
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push("/home/itinerary")}
	>Add</button>
	)
}

export function OpenAddDialogue() {
	const router = useRouter();
	
	return (
	<button 
		className = "button" 
		style={{marginTop:"10px"}}
		onClick = {() => router.push("/add-to-itinerary")}
	>Add to itinerary</button>
	)
}