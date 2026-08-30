"use client"
import Image from 'next/image'
import css from './EditProfilePage.module.css'
import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

export default function EditProfilePage(){
  const [userName, setUserName] = useState('');
  const user = useAuthStore((state)=> state.user);
  const router = useRouter();

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({username: userName});
    router.push('/profile');

  };
    return(
        <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

   {user?.avatar && (<Image src={user.avatar}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />)}

    <form className={css.profileInfo} onSubmit={handleSaveUser}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          value={userName}
          onChange={handleChange}
          className={css.input}
        />
      </div>

      <p>Email: {user?.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={()=> router.back()}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

    )
}