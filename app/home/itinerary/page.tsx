import '../../style.css';
import EventParticipantsManager from '../../client/eventParticipantsManager'
import ParticipantsBox from '../../client/participantsBox'

import {AddNewEvent, BackToHome, EditEvent} from '../../client/itineraryScreenClients'


export default async function Page() {
	return (	
		<ItineraryScreen itineraryName={"Joe's BBQ Bash"}/>
  );
	
	//<HomeScreen/>    <SearchScreen/>		<ItineraryScreen itineraryName={"Joe's BBQ Bash"}/>  <NewEventScreen/>

}




/* ------------
ITINERARY FOCUS
--------------- */

/*
	Shows detail about a single itinerary, allowing the user to add events and manage
	participants. 

*/

async function ItineraryScreen({itineraryName}) {
	//note: right now, more than one getData() will cause an error
	const users = await getUserData();
	const events = await getEventData();
	let participantsArray = users.map(user => user.name);

	return (
		<div>
			<div>

				{/** The header -- contains a back to home screen button, plus the name */}
				<div className="header-banner">
					<BackToHome/>
					<h1>{itineraryName}</h1>
				</div>
				<ParticipantsBox participants={participantsArray} />
				
			</div>

			{/** the part which contains all the events */}

			<div className="body-scroll" style={{width:"65%"}}>  
				<TripEvent
					eventName = {"Debby's flight"}
					eventDate = {"March 8th"}
					eventTime = {"15:35"}
					eventText = {"Flight number 1234567891234, seat 23C, landing approx 9pm (George will pickup)"}
					eventParticipants = {["Debby"]}
					eventLink = {"https://bobby-tables.com/"}
				/>
				<TripEvent
					eventName = {"Mark's flight"}
					eventDate = {"March 8th"}
					eventTime = {"18:35"}
					eventText = {"Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)"}
					eventParticipants = {["Mark"]}
					eventLink = {"https://bobby-tables.com/"}
				/>
				<TripEvent
					eventName = {"event 3"}
					eventDate = {"March 8th"}
					eventTime = {"18:35"}
					eventText = {"Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)"}
					eventParticipants = {["Mark"]}
					eventLink = {"https://bobby-tables.com/"}
				/>
				<TripEvent
					eventName = {"event 3"}
					eventDate = {"March 8th"}
					eventTime = {"18:35"}
					eventText = {"Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)Flight number 13257451234, seat 23C, landing approx 9pm (George will pickup)"}
					eventParticipants = {["Mark"]}
					eventLink = {"https://bobby-tables.com/"}
				/>

				{/** a spacer that lets the scroll look right. make sure the height of this matches the height of the footer.*/}
				<div style={{height:"150px"}}></div>

			</div>

			{/** the footer, containing a button to add new, and a background to make it a little more visible */}
			<div style={{position:"fixed", bottom:"0px", width:"100%", height:"150px", backgroundColor:"#111111aa"}}>
				<AddNewEvent/>
			</div>

		</div>

	);
}

/*
	Displays a single event, containing salient information and a link to the rest of the data. 
	The client can also manage participants. 
*/
function TripEvent({eventName, eventDate, eventTime, eventText, eventParticipants, eventLink}) {

	return (
		<div className="itinerary-box">
			<EditEvent/>

				<h2 style={{display: "inline-block", marginRight:"30px"}}>{eventName}</h2>
				
				{/** Displays the participants, and allows the client to manage users */}
				<EventParticipantsManager eventParticipants={eventParticipants}/>

				<p>Starts on {eventDate} at {eventTime}</p>
				<p><i>{eventText}</i></p>
				{/** Opens the link to the reservation, in a new tab */}
				<p><a href={eventLink} target="_blank">Manage reservation on external website</a></p>

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

