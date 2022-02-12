import Link from 'next/link';
import classes from './main-navigation.module.css';

import { useSession, signOut } from 'next-auth/react'


function MainNavigation() {
  const { data, status } = useSession()

  // console.log('Status: ', status)
  // console.log('Data: ', data)

  const logoutHandler = (e) => {
    signOut()
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {status === 'unauthenticated' &&
            <li>
              <Link href='/auth'>Login/Register</Link>
            </li>
          }
          {status === 'authenticated' &&
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          }
          {status === 'authenticated' &&
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
