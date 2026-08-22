// import { useState } from "react";

export default function InvytePortal() {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");

	return (
		<>
			<div
				className="min-h-screen bg-base-200 flex items-center justify-center p-6"
				data-theme="dark"
			>
				<div className="card w-full max-w-4xl bg-base-100 shadow-xl">
					<div className="card-body">
						<div className="text-center mb-8">
							<h1 className="text-2xl font-semibold">Inyte Portal</h1>
							{/* Left - Sign In Form */}
							<div className="flex flex-col lg:flex-row items-center">
								<div className="flex-1 w-full space-y-3">
									<h2 className="text-lg font-medium">Sign in</h2>
									<p>Manage your events on your account</p>
									<label className="form-control w-full">
										<div className="label">
											<span className="label-text">EMAIL</span>
										</div>
										<input
											id="password"
											type="email"
											placeholder="email@example.com"
											className="input input-bordered w-full"
										/>
									</label>

									<label className="form-control w-full">
										<div className="label">
											<span className="label-text">PASSWORD</span>
										</div>
										<input
											id="password"
											type="text"
											placeholder="********"
											className="input input bordered w-full"
										/>
									</label>

									<button className="btn btn-primary w-full" type="submit">
										Sign In
									</button>
									<div className="text-sm text-base-content/70 space-y-1 pt-2">
										<p>
											Don't have an account?{" "}
											<a className="link link-hover">Create an account</a>
											{" | "}
											<a className="link link-hover">Forgot password?</a>
										</p>
									</div>
								</div>
								<div className="divider lg:divider-horizontal">OR</div>
								<div className="flex-1 w-full space-y-3">
									<h2 className="text-lg font-medium">Find your RSVP</h2>
									<p className="text-sm text-base-content/70">
										Have a confirmation already?
									</p>
									<label className="form-control w-full">
										<div className="label">
											<span className="label-text">Confirmation Number</span>
										</div>
										<input
											id="confirmation_number"
											type="text"
											placeholder="e.g. KD851XEA9"
											className="input input-bordered w-full"
										/>
									</label>
									<label className="form-control w-full">
										<div className="label">
											<span className="label-text">Event ID</span>
										</div>
										<input
											id="event_id"
											type="text"
											placeholder="e.g. EVT-53251"
											className="input input-bordered w-full"
										/>
									</label>
									<button className="btn btn-primary w-full" type="submit">
										Find My RSVP
									</button>
									<p className="text-base-content/70 mt-1">
										Both fields are printed on your confirmation email, just
										below the event name
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
