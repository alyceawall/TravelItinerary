import '../../../style.css';

import SubmitButton from '../../../../client/editEventClient'

var originItinerary;
var itineraries;

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	itineraries = getItineraryData();
	originItinerary = itineraries.find((itinerary) => itinerary._id == id)
	return (	
		<EditEventScreen/>
  );

}



function EditEventScreen() {
	return (

		<div>
			<h1>Edit event</h1>

			<p>Title:</p>
			<input></input>
			<p>Date:</p>
			<input type="date"></input>
			<p>End date (optional):</p>
			<input type="date"></input>
			<p>Start time (optional):</p>
			<input type="time"></input>
			<p>End time (optional):</p>
			<input type="time"></input>
			<p>Address/location (optional):</p>
			<input></input>
			<p>Website for managing event (optional):</p>
			<input></input>
			<p>Other notes (optional):</p>
			<textarea></textarea>

			<SubmitButton itinerary_id = {originItinerary._id}/>
		</div>
	);
}


	
// Avoid caching, so that hot updates work as expected
export const dynamic = 'force-dynamic'
// Get the language data from the database.
// Returns a json object.

async function getItineraryData() {
    try {
        const res = await fetch(
			//'http://cs-vm-02.cs.mtholyoke.edu:31600/api'
			'http://localhost:31600/itineraries',
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



