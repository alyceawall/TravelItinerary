import '../../style.css';
import EventParticipantsManager from '../../client/eventParticipantsManager'
import ParticipantsBox from '../../client/participantsBox'
import {AddNameBubble, NameBubble} from '../../client/participantHelpers'

import SubmitButton from '../../client/createItineraryClient'

var itineraries;
var originItinerary;

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	itineraries = await getItineraryData();
	originItinerary = itineraries.find((itinerary) => itinerary._id == id)
	return (	
		<NewItineraryScreen/>
  );
	
}



function NewItineraryScreen() {
	return (

		<div>
			<h1>Create a new itinerary</h1>

			<p>Name:</p>
			<input></input>
			<p>Participants:</p>
			<EventParticipantsManager eventParticipants={["JohnDoe"]}/>

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
			'http://localhost:31600/itineraries',
		);
		console.log('Frontend Fetch: Response status:', res.status);
        const data = await res.json();
        //console.log('Frontend Fetch: Data from server:', data);
        return data;
    } catch (error) {
        console.error('Frontend Fetch: Error fetching data:', error);
        throw error;
    }
}

