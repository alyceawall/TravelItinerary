import '../../../style.css';
import EventParticipantsManager from '../../../client/eventParticipantsManager'
import ParticipantsBox from '../../../client/participantsBox'
import connectFriends from '../../../api/addFriends'

import {AddNewEvent, BackToHome, EditEvent, SearchForEvent} from '../../../client/itineraryScreenClients'


var participantsArray = [];
var users;
var events;
var itineraries; 
var currentItinerary

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	users = await getUserData();
	events = await getEventData();
	itineraries = await getItineraryData();
	currentItinerary = itineraries.find((itinerary) => itinerary._id == id);
	participantsArray = users.filter((user) => currentItinerary.participants.includes(user._id));
	
	//TODO: make this only the users associated with the itinerary
	return (	
		//<HomeScreen/>
		<ItineraryScreen currentItinerary={currentItinerary}/>
  );
}



/* ------------
ITINERARY FOCUS
--------------- */

/*
	Shows detail about a single itinerary, allowing the user to add events and manage
	participants. 

*/

async function ItineraryScreen({currentItinerary}) {
	var eventsList = []
	var currentEvents = events.filter((event) => currentItinerary.events.includes(event._id));
	//there may be a better way to get this than a for loop, but this gets all events with the unique matching itinerary id
	//TODO: edit so that this gets the associated events from the itinerary's array
	for (const event of currentEvents){
		eventsList.push(
			<TripEvent
				eventName = {event.name}
				eventDate = {event.time_start}
				eventText = {event.desc}
				eventLocation = {event.location}
				eventParticipants = {event.participants}
				eventLink = {event.link_to_site}
			/>
		)
	}
	eventsList.sort((event1, event2) =>
		(event1.startDate < event2.startDate) ? 1 : (event1.startDate < event2.startDate) ? -1 : 0)

	var itinerary_id = currentItinerary._id.valueOf();
	return (
		<div>

			{/** the part which contains all the events */}

			<div className="body-scroll" style={{width:"65%"}}>  
				{eventsList}
				{/** a spacer that lets the scroll look right. make sure the height of this matches the height of the footer.*/}
				<div style={{height:"150px"}}></div>

			</div>

			{/** the footer, containing a button to add new, and a background to make it a little more visible */}
			<div className="footer-banner">
				<div style={{paddingLeft:"20%", paddingRight:"55%", position:"relative"}}>
					<AddNewEvent itinerary_id = {itinerary_id}/>
					<SearchForEvent itinerary_id = {itinerary_id}/>
				</div>
			</div>

			<div>

				{/** The header -- contains a back to home screen button, plus the name */}
				<div className="header-banner">
					<BackToHome itinerary_id = {currentItinerary._id}/>
					<h1>{currentItinerary.name}</h1>
				</div>
				<ParticipantsBox participants={participantsArray.map((user) => user.name)} />
				
			</div>
		</div>

	);
}

/*
	Displays a single event, containing salient information and a link to the rest of the data. 
	The client can also manage participants. 
*/
function TripEvent({eventName, eventDate, eventText, eventLocation, eventParticipants, eventLink}) {

	const dt = eventDate;
	const eventDateNew = new Date(dt.slice(0,4), dt.slice(5,7), dt.slice(8,10),
		); //"2024-03-13T21:44:11.113+00:00"
	const eventTimeStr = dt.slice(11,13)+":"+dt.slice(14,16);

	return (
		<div className="itinerary-box" style={{paddingRight:"75px"}}>

				<h2 style={{display: "inline-block", marginRight:"10px"}}>{eventName}</h2>
				
				{/** Displays the participants, and allows the client to manage users */}
				<EventParticipantsManager eventParticipants={participantsArray.map((user) => user.name)}/>

				<p>Starts on {eventDateNew.toDateString()} at {eventTimeStr}</p>
				<p>Address: {eventLocation}</p>
				<p><i>{eventText}</i></p>
				{/** Opens the link to the reservation, in a new tab */}
				<p><a href={"https://"+eventLink} target="_blank">Manage reservation on external website</a></p>

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
        //console.log('Frontend Fetch: Data from server:', data);
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
       //console.log('Frontend Fetch: Data from server:', data);
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
        //console.log('Frontend Fetch: Data from server:', data);
        return data;
    } catch (error) {
        console.error('Frontend Fetch: Error fetching data:', error);
        throw error;
    }
}

