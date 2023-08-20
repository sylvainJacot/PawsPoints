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

            const unsubscribe = onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setUserData(data);
            });

            // Return a cleanup function to unsubscribe when the component unmounts
            return () => unsubscribe();
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;