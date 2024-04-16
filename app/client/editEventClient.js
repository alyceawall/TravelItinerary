'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';


export default function ViewItineraryButton({itinerary_id}) {
	const router = useRouter();
	var fullURL = "/home/itinerary/" + itinerary_id
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push(fullURL)}
	>Submit</button>
	)
}