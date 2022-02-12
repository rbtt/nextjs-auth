import classes from './profile-form.module.css';
import { useRef } from 'react'
import { useRouter } from 'next/router'

function ProfileForm() {
  const router = useRouter()
  const newPasswordRef = useRef()
  const oldPasswordRef = useRef()

  const submitHandler = async (e) => {
    e.preventDefault()
    const result = await fetch('/api/auth/changepassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newPass: newPasswordRef.current.value,
        oldPass: oldPasswordRef.current.value
      })
    })
    const data = await result.json()
    alert(data.message)
    if (data.message === 'Successfully Changed Password') {
      router.replace('/')
    }

  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordRef} type='password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input ref={oldPasswordRef} type='password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
