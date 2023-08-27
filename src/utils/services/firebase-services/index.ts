import { get, getDatabase, ref, set, onValue } from 'firebase/database';

export const updateUserData = (userId: string, newData: any) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${userId}`);
    return set(userRef, newData);
};

export const getUserData = (userId: string) => {
    const database = getDatabase();
    const userRef = ref(database, `users/${userId}`);
    return get(userRef).then((snapshot) => snapshot.val());
  };

export const updateCard = async (id, name, color, slotsCount, userId) => {
    try {
        const database = getDatabase();
        const userRef = ref(database, `users/${userId}`);
        return await get(userRef)
        .then((snapshot) => {
            const userData = snapshot.val() || {};
            userData.proMode.loyaltyCard = {
                id,
                name,
                color,
                slotsCount,
                client: {}
            }
            return set(userRef, userData);
        })
    }
    catch(error) {
        console.error('Error updating card:', error);
    };
}


// export const fetchClientData = async (uid, setClientData) => {
//  // Update the proModeEnabled state as before
//  const database = getDatabase();
//  const userRef = ref(database, `users/${uid}`);

//  get(userRef)
//    .then((snapshot) => {
//      const userData = snapshot.val() || {};
//       console.log('userData', userData);
//      setClientData(userData);
//    })
//    .catch((error) => {
//      console.error('Error updating Pro Mode:', error);
//    });

// };

  