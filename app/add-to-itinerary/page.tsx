import '../style.css';


import {AddToItinerary} from '../client/addToItineraryClient'




export default async function Page() {
	return (	
		<AddEvent eventId={123456}/>
  );
	
	//<HomeScreen/>    <SearchScreen/>		<ItineraryScreen itineraryName={"Joe's BBQ Bash"}/>  <NewEventScreen/>

}


	// New event screen

function AddEvent({eventId}) {
	// Event ID = this is the event in the database. Use it to pull down the event from DB
	const eventName = "test";
	const eventLocation = "location";
	const eventUrl = "www.google.com";
	return (

		<div>
			<h1>Add to Itinerary</h1>
			<p>{eventName}</p>

			<select style={{width:"50%"}}>
					<option value="1">Itinerary 1</option>
					<option value="2">Itinerary 2</option>
					<option value="3">Itinerary 3</option>
				</select>
			<p>Date:</p>
			<input type="date"></input>
			<p>End date (optional):</p>
			<input type="date"></input>
			<p>Start time (optional):</p>
			<input type="time"></input>
			<p>End time (optional):</p>
			<input type="time"></input>
			<p>Other notes (optional):</p>
			<textarea></textarea>

			<AddToItinerary/>
			{/** This will add the inputted info to that gotten from the DB, update the event entry with inputted info, and add it all to the selected itinerary */}
		</div>
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

