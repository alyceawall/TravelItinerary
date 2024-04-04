'use client';
import {useRouter} from 'next/navigation';


export function SubmitButton() {
	const router = useRouter();
	
	return (
	<button 
		className = "button" 
		onClick = {() => router.push("/home/itinerary")}
	>Submit</button>
	)
}