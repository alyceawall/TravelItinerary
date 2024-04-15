'use client'
import '../style.css';
import {FormEvent} from 'react'
import SubmitButton from './editEventClient'

export default function NewEventScreen(){
    return(
        <div>
			<h1>Add new event</h1>
			<form onSubmit = {onSubmit}>
				<p>Title:</p>
				<input name = "name"></input>
				<p>Start date and time:</p>
				<input type="datetime-local" name = "time_start"></input>
				<p>End date and time:</p>
				<input type="datetime-local" name = "time_end"></input>
				<p>Address/location:</p>
				<input name = "location"></input>
				<p>Website for managing event:</p>
				<input name = "link_to_site"></input>
				<p>Other notes (optional):</p>
				<textarea name = "desc"></textarea>
			</form>
			<SubmitButton/>
		</div>
    )
}

function onSubmit(e: FormEvent<HTMLFormElement>) {
    console.log("REACHED ONSBUMIT")
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
	return(formData)

}