import { Link } from 'react-router-dom';

export default function Profile(){

  const user = {
    rank: 'A1C',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890'
  };

  return(
    <>
    <div className="min-h-screen bg-base-200">

      <div className="navbar bg-base-100">

        <div className="navbar-start">
          <div className='flex gap-2'>
            <a href='/events' className="btn btn-ghost">Events</a>
            <a href='/reservations' className="btn btn-ghost">Reservations</a>
          </div>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2">
            <a href='/profile' className='btn btn-ghost'>Profile</a>
            <a href='/logout' className='btn btn-ghost'>Logout</a>
          </div>
        </div>
      </div>

<div className="card w-full max-w-md bg-base-100 shadow-md p-6 m-6">
  <div className="card-body gap-4">
      <h1 className='card-title'>User Profile</h1>
      <p className='text-sm text-base-content/70'>Manage your password and account information.</p>
     </div>
      <div className="bg-base-100 shadow-md p-2 m-6 space-y-2">
         <h1 className='font-bold text-lg'> {user.rank} {user.firstName} {user.lastName}</h1>
        <p><span className="font-semibold">Email</span>: {user.email}</p>
        <p><span className="font-semibold">Phone</span>: {user.phone}</p>
      </div>
      <div>
        <div className='card-actions jutify-end mt-2'>
        <button type='submit' className='btn btn-primary'>Edit </button>
      <button type='submit' className='btn btn-primary'>Update Password </button>
      

        </div>
        </div>
     
      
      </div></div>
      
    </>
  )
}