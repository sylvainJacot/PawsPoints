import React, { useState, useEffect } from 'react';
import UserContext from '../user-context/index';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { getDatabase, ref, onValue } from 'firebase/database'; // Import Firebase database functions

function UserProvider({ children }) {
    const { user } = useAuthentication();
    const [userData, setUserData] = useState(null);

    const watchUserData = () => {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
        });
        return () => unsubscribe();
    }

    useEffect(() => {
        if (user) {
            watchUserData()
        }
    }, [user]);



    return (
        <UserContext.Provider value={{
            userData: userData,
            watchUserData: watchUserData
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;