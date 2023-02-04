import { useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef=useRef('');
  const newPassword=newPasswordInputRef.current.value;
  const authCtx=useContext(AuthContext);
  const token=authCtx.token;
  const submitHandler=(event)=>{
    event.preventDefault();
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA7rO4EdjhHpAXsr7mgambxo-3AXaJ3zlY',{
      method:'POST',
      body:JSON.stringify({
       idToken:token,
       password:newPassword,
       returnSecureToken:false
      }),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{
        return res.json().then((data)=>{
          console.log(data)
        })
    })
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
