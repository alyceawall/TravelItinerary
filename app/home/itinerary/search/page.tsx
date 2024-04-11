import '../../../style.css';
//import EventParticipantsManager from '../../../client/eventParticipantsManager'
//import ParticipantsBox from '../../../client/participantsBox'
import {AddNameBubble, NameBubble} from '../../../client/participantHelpers'


export default async function Page() {
	return (	
		<SearchScreen/>
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

