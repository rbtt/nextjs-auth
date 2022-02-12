import { useState, useRef } from 'react';
import classes from './auth-form.module.css';
import { signIn } from "next-auth/react"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const createUser = async (email, password) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Something went WRONG!')
  }
  return data
}

function AuthForm() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true);
  const { data, status } = useSession()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    // ?Validation

    if (isLogin) {
      const result = await signIn(
        'credentials',
        {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword
        }
      )

      if (result.error === null) {
        console.log('Successfully logged in')
        router.replace('/')
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword)
        router.replace('/auth')
      } catch (err) {
        console.log(err)
      }

    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
