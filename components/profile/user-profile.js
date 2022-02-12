import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useSession } from 'next-auth/react'


function UserProfile() {
  const { data, status } = useSession()

  // if (status === 'unauthenticated') {
  //   window.location.href = '/auth'
  //   return <p className={classes.profile}><b>You need to Login First.</b></p>
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
