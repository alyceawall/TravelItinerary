'use client';
import {useState} from 'react';
import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';

/*
	Creates the side box on the Itinerary screen that shows all participants and allows you to add new
	ones to the itinerary. 
*/
export default function ParticipantsBox({participants}) {
	// Turns an array of strings into a displayable group of NameBubbles
	const [isAddingParticipants, setIsAddingParticipants] = useState(false);
	let addButton = <AddNameBubble onButtonClick={() => setIsAddingParticipants(true)}/>;
	let selectionBox = <ParticipantSelection pool={participants} onButtonClick={() => setIsAddingParticipants(false)}/>;


	const participantBubbles = participants.map((element, i) =>
	<NameBubble key={i} name={element}></NameBubble> 
	)

	// Display those
return (
	<div className="users-box">
		<h3 style={{padding:"10px"}}>Participants</h3>
		{participantBubbles}
		
		<div>
		{isAddingParticipants ?  selectionBox : addButton}
		</div>

	</div>
	
	
);
}