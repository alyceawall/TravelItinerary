import {FormEvent} from 'react'
import '../../../style.css';
//import EventParticipantsManager from '../../../client/eventParticipantsManager'
//import ParticipantsBox from '../../../client/participantsBox'
import NewEventScreen from '../../../client/newEventScreenClient'



export default async function Page() { 
	return (	
		<AddEvent/>
  );
	
	//<HomeScreen/>    <SearchScreen/>		<ItineraryScreen itineraryName={"Joe's BBQ Bash"}/>  <NewEventScreen/>

}
	// New event screen


function AddEvent() {
	
	async function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const formData = new FormData(e.currentTarget) 
		const response = await fetch('../../../api/addEvent', {
			method: 'POST',
			body: formData
		})
	
	}
	return (
		<NewEventScreen/>
	);
	}



	
// Avoid caching, so that hot updates work as expected
export const dynamic = 'force-dynamic'
// Get the language data from the database.
// Returns a json object.

async function getUserData() {
    try {
        const res = await fetch(
			//'http://cs-vm-02.cs.mtholyoke.edu:31600/api'
			'http://localhost:31600/users',
			);
        console.log('Frontend Fetch: Response status:', res.status);
        const data = await res.json();
        console.log('Frontend Fetch: Data from server:', data);
        return data;
    } catch (error) {
        console.error('Frontend Fetch: Error fetching data:', error);
        throw error;
    }
}

async function getEventData() {
    try {
        const res = await fetch(
			//'http://cs-vm-02.cs.mtholyoke.edu:31600/api'
			'http://localhost:31600/events',
			);
        console.log('Frontend Fetch: Response status:', res.status);
        const data = await res.json();
        console.log('Frontend Fetch: Data from server:', data);
        return data;
    } catch (error) {
        console.error('Frontend Fetch: Error fetching data:', error);
        throw error;
    }
}

