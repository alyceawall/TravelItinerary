import '../style.css';
//import EventParticipantsManager from '../client/eventParticipantsManager'
//import ParticipantsBox from '../client/participantsBox'
import {AddNameBubble, /* NameBubble */} from '../client/participantHelpers'

import {ViewItineraryButton, AddNewItinerary} from '../client/homeScreenClients'


var participantsArray = [];
var users;
var events;
var itineraries;
var logged_in_user;

export default async function Page() {
	users = await getUserData();
	events = await getEventData();
	itineraries = await getItineraryData();
	logged_in_user = users.find((user) => user._id == '660c4ee4fbcd9cd53de4bade');
	participantsArray = users.filter((user) => logged_in_user.friends.includes(user._id))
	participantsArray.push(logged_in_user)
	console.log(participantsArray)
	return (	
		<HomeScreen/>
  );
}


/* --------
HOME SCREEN
----------- */

/*
	Shows all itineraries.
*/

function HomeScreen() {
	//TODO: actually get this to reference appropriate itinerary
	var summaryBlocks = []
	var user_itineraries = itineraries.filter((itinerary) => logged_in_user.itineraries.includes(itinerary._id))
	for (const itinerary of user_itineraries){
		summaryBlocks.push(
			<ItinerarySummaryBlock
			id = {itinerary._id}
			tripTitle={itinerary.name}
			// TODO: we should probably convert these to nicer looking strings
			startDate={itinerary.date_start}
			endDate={itinerary.date_end}
			participants= {participantsArray}
			/>
		)
	}
	
	summaryBlocks.sort((itin1, itin2) =>
			(itin1.date_start < itin2.date_start) ? 1 : (itin1.date_start < itin2.date_start) ? -1 : 0)
  return (
		<div>


			{/** The body of the page, containing all Itineraries.*/}

			<div className="body-scroll">
				{summaryBlocks}

			</div>
			{/** The header banner, containing just a title.*/}

			<div className="header-banner">
				<h1>My Itineraries</h1>
			</div>

			{/** The "add new" button */}
			<AddNewItinerary/>
			

		</div>
  );
}


/*
	The block that shows immediately salient information about a single 
	itinerary to the user on the home page.
*/
function ItinerarySummaryBlock({id, tripTitle, startDate, endDate, participants}) {
	//this relies of there being ONE unique title
	var nameBubbles = [];
	for (const participant of participants){
		nameBubbles.push(
			//TODO: eventually participant should be participant.name
			<NameBubbleNoedit name={participant.name}></NameBubbleNoedit>)
	}

	return (
		<div className="itinerary-box">
			<h2 style={{display: "inline-block", marginRight:"30px"}}>{tripTitle}</h2>
				{nameBubbles}
				<AddNameBubble onButtonClick={null}/> {/** TODO: Pass the function for when you click on the Add User button*/}
			<p>{startDate} to {endDate}</p>
			
			<ViewItineraryButton itinerary_id = {id}/>

		</div>
	);
}


/**
 * Creates a bubble containing the name, but is a display element only. 
 */

function NameBubbleNoedit({name}) {
	return (
		<div className="name-bubble-not-interactive">
			<p style={{display: "inline-block"}}>{name}</p>
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


