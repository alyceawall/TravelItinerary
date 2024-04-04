'use client';
import {useRouter} from 'next/navigation';


export default function ViewItineraryButton() {
	const router = useRouter();
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push("/home/itinerary")}
	>Submit</button>
	)
}