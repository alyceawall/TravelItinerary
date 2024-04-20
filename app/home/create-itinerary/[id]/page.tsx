import '../../../style.css';
import EventParticipantsManager from '../../../client/eventParticipantsManager'
import ParticipantsBox from '../../../client/participantsBox'
import {AddNameBubble, NameBubble} from '../../../client/participantHelpers'
import itineraryModel from '../../../api/itineraryModel';
import userModel from '../../../api/userModel';

import SubmitButton from '../../../client/createItineraryClient'

var users;
var originUser;

export default async function Page({ params }: { params: { id: string } }) {
	const { id } = params;
	users = await getUserData();
	originUser = users.find((user) => user._id == id)
	return (	
		<NewItineraryScreen/>
  );
	
}



function NewItineraryScreen() {
	var user_id = originUser._id;
	var participants =  users.filter((user) => originUser.friends.includes(user._id))
	var participantNames = participants.map((participant) => participant.name)
	console.log(participants)

	async function onSubmit(data: FormData) {
		"use server";

		let newItinerary = await itineraryModel.create({
			name: data.get("name"),
			display_name: data.get("name"),
			events: [],
			date_start: data.get("date_start"),
			date_end: data.get("date_end"),
			participants: participants,
			desc: data.get("desc")
		})

		const response = await fetch('http://localhost:31600/api/writeDataItinerary', {
			method: "POST",
			body: newItinerary,
  		}); 

		console.log(originUser.itineraries)
		originUser.itineraries.push(newItinerary)

		var _id = originUser._id
		var name = originUser.name
		var username = originUser.username
		var password = originUser.password
		var email = originUser.email
		var itineraries = originUser.itineraries
		var friends = originUser.friends

		await userModel.deleteOne({username: username})

		let updatedUser = await userModel.create({
			_id: _id,
			name: name,
			username: username,
			password: password,
			email: email,
			itineraries: itineraries,
			friends: friends
		})

		await fetch('http://localhost:31600/api/writeDataUser', {
			method: "POST",
			body: updatedUser,
  		});  

	}


	return (

		<div>
			<h1>Create a new itinerary</h1>
			<form action = {onSubmit}>
				<p>Name:</p>
				<input name = "name"></input>
				<p>Start Date:</p>
				<input type = "datetime-local" name = "date_start"></input>
				<p>End Date:</p>
				<input type = "datetime-local" name = "date_end"></input>
				<p>Participants:</p>
				<EventParticipantsManager eventParticipants={participantNames}/>
				<p>Other notes:</p>
				<input name = "desc"></input>
				<SubmitButton/>
			</form>
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

