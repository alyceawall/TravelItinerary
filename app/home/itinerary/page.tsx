import '../../style.css';
import EventParticipantsManager from '../../client/eventParticipantsManager'
import ParticipantsBox from '../../client/participantsBox'

import {AddNewEvent, BackToHome, EditEvent} from '../../client/itineraryScreenClients'


var participantsArray = [];
var users;
var events;
var itineraries;

export default async function Page() {
	users = await getUserData();
	events = await getEventData();
	itineraries = await getItineraryData();
	participantsArray = users.map(user => user.name);
	//TODO: make this only the users associated with the itinerary
	return (	
		//<HomeScreen/>
		<ItineraryScreen itineraryName={"Test Location"}/>
  );
}




/* ------------
ITINERARY FOCUS
--------------- */

/*
	Shows detail about a single itinerary, allowing the user to add events and manage
	participants. 

*/

async function ItineraryScreen({itineraryName}) {
	var eventsList = []
	//there may be a better way to get this than a for loop, but this gets all events with the unique matching itinerary id
	//TODO: edit so that this gets the associated events from the itinerary's array
	for (const event of events){
		if (event.location == itineraryName){
			eventsList.push(
				<TripEvent
					eventName = {event.name}
					eventDate = {event.startDate}
					eventTime = {"placeholder"}
					eventText = {event.desc}
					eventLocation = {event.location}
					eventParticipants = {event.participants}
					eventLink = {event.link_to_site}
				/>
			)
		}
	}
	eventsList.sort((event1, event2) =>
		(event1.startDate < event2.startDate) ? 1 : (event1.startDate < event2.startDate) ? -1 : 0)

	return (
		<div>

			{/** the part which contains all the events */}

			<div className="body-scroll" style={{width:"65%"}}>  
				{eventsList}
				{/** a spacer that lets the scroll look right. make sure the height of this matches the height of the footer.*/}
				<div style={{height:"150px"}}></div>

			</div>

			{/** the footer, containing a button to add new, and a background to make it a little more visible */}
			<div style={{position:"fixed", bottom:"0px", width:"100%", height:"150px", backgroundColor:"#111111aa"}}>
				<AddNewEvent/>
			</div>

			<div>

				{/** The header -- contains a back to home screen button, plus the name */}
				<div className="header-banner">
					<BackToHome/>
					<h1>{itineraryName}</h1>
				</div>
				<ParticipantsBox participants={participantsArray} />
				
			</div>
		</div>

	);
}

/*
	Displays a single event, containing salient information and a link to the rest of the data. 
	The client can also manage participants. 
*/
function TripEvent({eventName, eventDate, eventTime, eventText, eventLocation, eventParticipants, eventLink}) {
	return (
		<div className="itinerary-box">

				<h2 style={{display: "inline-block", marginRight:"30px"}}>{eventName}</h2>
				
				{/** Displays the participants, and allows the client to manage users */}
				<EventParticipantsManager eventParticipants={participantsArray}/>

				<p>Starts on {eventDate} at {eventTime}</p>
				<p>Address: {eventLocation}</p>
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

async function getItineraryData() {
	try {
		const res = await fetch(
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

