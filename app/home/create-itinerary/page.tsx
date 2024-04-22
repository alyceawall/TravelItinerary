import '../../style.css';
import EventParticipantsManager from '../../client/eventParticipantsManager'
import ParticipantsBox from '../../client/participantsBox'
import {AddNameBubble, NameBubble} from '../../client/participantHelpers'

import SubmitButton from '../../client/createItineraryClient'

export default async function Page() {
	return (	
		<NewItineraryScreen/>
  );
	
}



function NewItineraryScreen() {
	return (

		<div>
			<div className="header-banner">
				<h1>Create a new itinerary</h1>
			</div>
			<div style={{paddingTop:"100px", padding:"25px"}}>
				
				<label style={{display:"block", marginBottom:"15px"}}>
					Name: 
					<input name = "name" style={{marginLeft:"10px"}}></input>
				</label>

				<label>Participants:</label>
				<div style={{backgroundColor:"var(--white)", marginBottom:"15px"}}>
					<EventParticipantsManager eventParticipants={["JohnDoe"]}/>
				
				</div>
				<SubmitButton/>

			</div>
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

