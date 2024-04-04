'use client';
import {useRouter} from 'next/navigation';


export function AddNewEvent() {
	const router = useRouter();
	
	return (
	<button 
		className = "new-event-button" 
		onClick = {() => router.push("/")}
	>Find more events</button>
	)
}

export function BackToHome() {
	const router = useRouter();
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push("/home")}
	>View all itineraries</button>
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

export function SubmitEditEvent() {
	const router = useRouter();
	
	return (
		
	<button 
		className = "button" 
		style = {{position:"absolute", top:"20px", right:"20px"}}
		onClick = {() => router.push("/home/itinerary")}
	>Submit</button>
	)
}