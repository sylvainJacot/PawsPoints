import React, { useState, useEffect } from 'react';
import UserContext from '../user-context/index';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getDatabase, ref, onValue } from 'firebase/database'; // Import Firebase database functions

function UserProvider({ children }) {
    const { user } = useAuthentication();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            const db = getDatabase(); // Initialize your Firebase database instance

            const userRef = ref(db, `users/${user.uid}`); // Use ref function to get a reference to the specific path

            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setUserData(data);
            });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ userData: userData }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;