'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';


export default function ViewItineraryButton() {
	const router = useRouter();
	var fullURL = "/home" 
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push(fullURL)}
	>Submit</button>
	)
}