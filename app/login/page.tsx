export default async function Page() {
	return (	
		<LoginScreen/>
  );

}

function LoginScreen() {
	return (
		<div>
			<form onSubmit={null}>
				<p>Username:</p>
				<input type="text"></input>
				<p>Password:</p>
				<input type="text"></input>
			</form>

			<button>Submit</button>
		</div>

	)
}

function ErrorScreenUsername() {
	return (
		<div>
			<p>Error: Username not found.</p>
			<button>Return to login</button>
		</div>
	)
}


function ErrorScreenPassword() {
	return (
		<div>
			<p>Error: Password is incorrect.</p>
			<button>Return to login</button>
		</div>
	)
}