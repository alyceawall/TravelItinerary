'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';


export function AddNewEvent() {
	const router = useRouter();
	
	return (
	<button 
		className = "new-event-button" 
		onClick = {() => router.push("/home/itinerary/new")}
	>Add new event</button>
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