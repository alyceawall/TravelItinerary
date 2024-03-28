'use client'

/*
	Renders a selection box containing all participants in the unselected pool, 
	as well as an OK button to add a selected participant to the pool for that event.
*/
export function ParticipantSelection({pool, onButtonClick}) {
	// Maps the pool of unselected users to selection boxes.
	const selectionValues = pool.map(
		(element, i) =>
		<option  className="name-bubble-not-interactive" key={i} value={element}>{element}</option> 
	)
	return (
		<div style={{display: "inline-block"}}>

			<select>
				<option value="none"></option>
				{selectionValues}
			</select>

			<button className="name-bubble-interactive" onClick={onButtonClick}>
				<p style={{display: "inline-block"}}>OK</p>
			</button>
			
		</div>
	)
}

/**
 * Creates a bubble with a little plus, implying that the user can click on it to add
 * a new participant. 
 */
export function AddNameBubble({onButtonClick}) {
	return (
		<button className="name-bubble-interactive" onClick={onButtonClick}>
			<p style={{display: "inline-block"}}>+</p>
		</button>
	);
}

/**
 * Creates a bubble containing the name, as well as an X to delete it presumably.
 */
export function NameBubble({name}) {
	return (
		<div className="name-bubble-not-interactive">
			<p style={{display: "inline-block"}}>{name}</p>
			<button className="x-button">X</button>
		</div>
	);
}

