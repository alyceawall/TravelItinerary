//'use client';

import './style.css';
import EventParticipantsManager from './client/eventParticipantsManager'
import ParticipantsBox from './client/participantsBox'
import {AddNameBubble, NameBubble} from './client/participantHelpers'

//import {useState} from 'react';


var participantsArray = [];


export default async function Page() {
	return (	
		<ItineraryScreen itineraryName={"Joe's BBQ Bash"}/>
  );
	
	//<HomeScreen/>    <SearchScreen/>		<ItineraryScreen itineraryName={"Joe's BBQ Bash"}/>  <NewEventScreen/>

}


/* --------
HOME SCREEN
----------- */

/*
	Shows all itineraries.
*/

function HomeScreen() {

  return (
		<div>

			{/** The header banner, containing just a title.*/}

			<div className="header-banner">
				<h1>My Itineraries</h1>
			</div>

			{/** The body of the page, containing all Itineraries.*/}

			<div className="body-scroll">
				<ItinerarySummaryBlock
					tripTitle={"Trip to Bahamas"}
					startDate={"March 6th"}
					
					endDate={"March 16th"}
				/>

			</div>

			{/** The "add new" button */}
			<button className="button" style={{position:"fixed",left:"50%",bottom:"50px"}}>Add new itinerary</button>
			

		</div>
  );
}


/*
	The block that shows immediately salient information about a single 
	itinerary to the user on the home page.
*/
function ItinerarySummaryBlock({tripTitle, startDate, endDate}) {
	return (
		<div className="itinerary-box">
			<h2 style={{display: "inline-block", marginRight:"30px"}}>{tripTitle}</h2>
				<NameBubbleNoedit name={"User1"}></NameBubbleNoedit>
				<AddNameBubble onButtonClick={null}/> {/** TODO: Pass the function for when you click on the Add User button*/}
			<p>{startDate} to {endDate}</p>
			
			<button className="button" >View Itinerary</button>

		</div>
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
	//note: right now, more than one getData() will cause an error
	const users = await getUserData();
	const events = await getEventData();
	let participantsArray = users.map(user => user.name);

	return (
		<div>
			<div>

				{/** The header -- contains a back to home screen button, plus the name */}
				<div className="header-banner">
					<button className="button">Back</button>
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
				<button className="new-event-button">Add new event</button>
			</div>

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

/*
	Displays a single event, containing salient information and a link to the rest of the data. 
	The client can also manage participants. 
*/
function TripEvent({eventName, eventDate, eventTime, eventText, eventParticipants, eventLink}) {

	return (
		<div className="itinerary-box">
				<button className="button" style={{position:"absolute", top:"20px", right:"20px"}}>Edit</button>

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


// Search Screen

function SearchScreen() {
	return (
		<div>
			{/** Header code */}
			<div className="header-banner">
				<h1>Search results</h1>
				<input style={{display:"inline-block", width:"90%", margin:"25px"}}></input>
				<p style={{display:"inline-block", marginRight:"10px"}}>Searching for: </p>
				{/** Allow user to select desired event type */}
				<select style={{width:"50%"}}>
					<option value="accomodation">Hotel or other accomodation</option>
					<option value="travel">Plane, train, or automobile</option>
					<option value="event">Other event</option>
				</select>
				<p>Filters: </p>
				{/** Filters TBD */}
				<NameBubble name="Placeholder for filter1"/>
				<NameBubble name="Placeholder for filter2"/>
				<AddNameBubble onButtonClick={null}/>
				<hr/>
			</div>

			{/** Search results */}

			<div className="body-scroll" style={{marginTop:"225px"}}>
				<SearchResult title="Hotel X" cost="139" site="https://bobby-tables.com/" filters="filter2"/>
				<SearchResult title="Hotel Y" cost="139" site="https://bobby-tables.com/" filters="filter2"/>
				<SearchResult title="Hotel Z" cost="139" site="https://bobby-tables.com/" filters="filter1"/>
				<SearchResult title="Hotel X" cost="139" site="https://bobby-tables.com/" filters="filter2"/>
				<SearchResult title="Hotel Y" cost="139" site="https://bobby-tables.com/" filters="filter2"/>
				<SearchResult title="Hotel Z" cost="139" site="https://bobby-tables.com/" filters="filter1"/>

			</div>

		</div>
	);
}

/*
	Shows a single search result.
*/
function SearchResult({title, cost, site, filters}) {
	return (

	<div className="search-box">
		<h3 style={{display:"inline-block", marginRight:"30px"}}>{title}</h3>
		<NameBubbleNoedit name={filters}/>
		<h4>${cost}+ per night</h4>
		<p><a href={site} target="_blank">Visit site</a></p>
	</div>

	);
}

	// New event screen

function NewEventScreen() {
	return (

		<div>
			<h1>Add new event</h1>

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

			<button>Submit</button>
		</div>
	);
	}

function EditEventScreen() {
	return (

		<div>
			<h1>Add new event</h1>

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

			<button>Submit</button>
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

