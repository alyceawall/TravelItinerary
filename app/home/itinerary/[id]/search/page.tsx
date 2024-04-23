import '../../../../style.css';
import {BackToHome} from "../../../../client/searchScreenClient"
import eventModel from '../../../../api/eventModel'
import itineraryModel from '../../../../api/itineraryModel'
import {SubmitButton, CancelButton} from '../../../../client/editEventClient';

var itineraries;
var originItinerary;
var eventsWithNoUser;

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	try {
		eventsWithNoUser = await getNoUsersEventData();
		itineraries = await getItineraryData();
		originItinerary = itineraries.find((itinerary) => itinerary._id === id);
	
		console.log("events", eventsWithNoUser, "events");
	
		return <SearchScreen />;
	  } catch (error) {
		console.error('Error fetching data:', error);
		// Handle error appropriately (e.g., display error message)
		return <div>Error fetching data. Please try again.</div>;
	  }
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
// Search Screen
function SearchScreen() {
	const searchResults = [];
    for (const event of eventsWithNoUser) {
      searchResults.push(
        <SearchResult
		key={event._id}
		eventName={event.name}
		eventTime={event.time_start}
		eventLocation={event.location}
		eventLink={event.link_to_site}
		eventParticipants={event.participants}
		eventText={event.desc}
        />
      );
    }
	return (
		<div>
			{/** Header code */}
			<div className="header-banner" style={{height:"150px"}}>
			<BackToHome itinerary_id = {originItinerary._id}/>
				<h1>Search results</h1>
				<input style={{display:"inline-block", width:"90%", margin:"25px"}}></input>
				{/**
				<p style={{display:"inline-block", marginRight:"10px"}}>Searching for: </p>
				 Allow user to select desired event type
				<select style={{width:"50%"}}>
					<option value="accomodation">Hotel or other accomodation</option>
					<option value="travel">Plane, train, or automobile</option>
					<option value="event">Other event</option>
				</select>
				<p>Filters: </p>
				{/** Filters TBD 
				<NameBubble name="Placeholder for filter1"/>
				<NameBubble name="Placeholder for filter2"/>
				<AddNameBubble onButtonClick={null}/>
				*/}
				<hr/>
			</div>

		{/* Display search results */}
		<div className="body-scroll" style={{ marginTop: "175px" }}>
        {searchResults}
      </div>
    </div>
  );
}
/*
	Shows a single search result.
*/
function SearchResult({eventName, eventTime, eventText, eventLocation, eventParticipants, eventLink}) {
	const handleAddToItinerary = async () => {
		try {
		  // Call the function to add the event to the itinerary
		  const result = await AddNewEvent({
			eventName,
			eventTime,
			eventLocation,
			eventLink,
			eventText,
			eventParticipants
		});
		} catch (error) {
		  console.error('Error adding event to itinerary:', error);
		  // Handle error appropriately (e.g., display error message)
		}
	  };
	return (
		<div className="itinerary-box" style={{paddingRight:"75px"}}>
				{/* <EditEvent itinerary_id = {currentItinerary._id}/> */}

				<h2 style={{display: "inline-block", marginRight:"10px"}}>{eventName}</h2>

				<p>Starts on {new Date(eventTime).toLocaleString()}</p>
				<p>Address: {eventLocation}</p>
				<p><i>{eventText}</i></p>
				{/** Opens the link to the reservation, in a new tab */}
				<p><a href={eventLink} target="_blank">Manage reservation on external website</a></p>
				<button className="button" style={{marginTop:"10px"}}onClick={handleAddToItinerary}>Add to Itinerary</button>
				
		</div>
	);
}

async function AddNewEvent({eventName, eventTime, eventText, eventLocation, eventParticipants, eventLink}) {
	var itinerary_id = originItinerary._id.valueOf();
	console.log(itinerary_id)

		// Create a new event object with the provided details
		let newEvent = await eventModel.create({
		  name: eventName,
		  time_start: eventTime,
		  location: eventLocation,
		  desc: eventText,
		  participants: [originItinerary.participants], // Clone participants array
		  link_to_site: eventLink,
		})

		const response = await fetch('http://localhost:31600/api/writeDataEvent', {
			method: "POST",
			body: newEvent,
  		}); 
		
		//store itinerary information, then delete the old itinerary to make a new updated one
		console.log(originItinerary);
		originItinerary.events.push(newEvent);

		var _id = originItinerary._id;
		var name = originItinerary.name;
		var events = originItinerary.events;
		var date_start = originItinerary.date_start;
		var date_end = originItinerary.date_end;
		var participants = originItinerary.participants;
		var desc = originItinerary.desc;

		//deletes old itinerary
		await itineraryModel.deleteOne({name: name})
		
		let updatedItinerary = await itineraryModel.create({
			_id: _id,
			name: name,
			display_name: name,
			events: events,
			date_start:date_start,
			date_end: date_end,
			participants: participants,
			desc: desc
		})

		await fetch('http://localhost:31600/api/writeDataItinerary', {
			method: "POST",
			body: updatedItinerary,
  		}); 
	
	};

	
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

async function getNoUsersEventData() {
  try {
    const res = await fetch('http://localhost:31600/events/withoutUsers');
    console.log('Frontend Fetch: Response status:', res.status);
        const data = await res.json();
        //console.log('Frontend Fetch: Data from server:', data);
        return data;
    } catch (error) {
        console.error('Frontend Fetch: Error fetching data:', error);
        throw error;
    }
}