'use client';
import {useState} from 'react';
import {ParticipantSelection, AddNameBubble, NameBubble} from './participantHelpers';

/*

Manages and displays the participants for a particular event.
Controls the addition of new participants, the deletion of old participants.
TODO: Currently displayed participants should probably be a state.

*/
export default function EventParticipantsManager({eventParticipants}) {
	const [isAddingParticipants, setIsAddingParticipants] = useState(false);
	let addButton = <AddNameBubble onButtonClick={() => setIsAddingParticipants(true)}/>;
	let selectionBox = <ParticipantSelection pool={eventParticipants} onButtonClick={() => setIsAddingParticipants(false)}/>;

	
	// isActive={activeIndex === 0}
	// onButtonClick={() => setIsAddingParticipants(true)}

	// {cond ? <A /> : <B />}

	return (
		<span>
			<NamesToBubbles participants={eventParticipants}/> 
			{isAddingParticipants ?  selectionBox : addButton}
		</span>

	);

}

/*
	Creates a simpler array of name bubbles (with X'es), ideal for attaching to an
	event or itinerary to indicate who's already there. 
*/
function NamesToBubbles({participants}) {
	// potential: using style = {{background-color: SOMETHING}} to give each participant a unique color
	return (
		participants.map((element, i) =>
		<NameBubble key={i} name={element}></NameBubble> )
	);
}



