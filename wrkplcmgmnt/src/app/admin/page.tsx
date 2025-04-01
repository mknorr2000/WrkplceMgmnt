import React from "react";
import styles from './MasterPage.module.css';

export default function Admin() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Admin Page</h1>
      <p className={styles.description}>Hier Admins do their Stuff.</p>

      <div className={styles.textwrite}>
        <input className={styles.text} type="search" placeholder="Email" />
        <input className={styles.text} type="search" placeholder="Departement" />
        <input className={styles.text} type="search" placeholder="Password" />
        <div className={styles.button}>
          <h3>Create a User</h3>
        </div>
      </div>
    </main>
  );
}