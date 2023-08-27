import { child, get, getDatabase, push, ref, set, update } from 'firebase/database';

const database = getDatabase();

export const updateUserData = (userId: string, newData: any) => {
    const userRef = ref(database, `users/${userId}`);
    return set(userRef, newData);
};

export const getUserData = (userId: string) => {
    const userRef = ref(database, `users/${userId}`);
    return get(userRef).then((snapshot) => snapshot.val());
  };

  export const updateCard = async (id, name, color, slotsCount, userId) => {
    try {
        const userRef = ref(database, `users/${userId}`);
        
        const snapshot = await get(userRef); // Use async/await here
        
        const userData = snapshot.val() || {};
        userData.proMode.loyaltyCard = {
            id,
            name,
            color,
            slotsCount,
            clients: []
        }

        await set(userRef, userData); // Use async/await here
    } catch (error) {
        console.error('Error updating card:', error);
    }
}

export const fetchClientData = async (uid, setClientData) => {
  try {
    const cleanUid = uid.replace(/"/g, '');
    const userRef = ref(database, `users/${cleanUid}`);

    const snapshot = await get(userRef); // Use async/await here

    if (snapshot.exists()) {
      const userData = snapshot.val();
      setClientData(userData);
    } else {
      // Handle the case where the client does not exist
      console.log('Client does not exist');
      setClientData(null); // Set client data to null or handle as needed
    }
  } catch (error) {
    console.error('Error fetching client data:', error);
  }
};


export const addClientToCard = async (clientUniqueId, name, firstName, proUid, cardId) => {
  try {
      const database = getDatabase();
      const loyaltyCardRef = ref(database, `users/${proUid}/proMode/loyaltyCard`);

      // Fetch the current loyalty card data
      const snapshot = await get(loyaltyCardRef);
      const loyaltyCardData = snapshot.val();

      // Check if loyaltyCardData exists and has a clients property that is an array
      if (loyaltyCardData && Array.isArray(loyaltyCardData.clients)) {
          const clientExists = loyaltyCardData.clients.some(client => client === clientUniqueId);
          if (clientExists) {
              console.log('Client already exists in loyalty card');
              return; // Client already exists, don't add them again
          }
      } else {
          // If clients doesn't exist or is not an array, initialize it as an empty array
          loyaltyCardData.clients = [];
      }

      // If the client doesn't exist, add them to the loyalty card
      const newPostKey = clientUniqueId;
      const clientCardData = {
          name,
          firstName,
      };

      const updates = {};
      updates[`users/${proUid}/proMode/loyaltyCard/clients/` + newPostKey] = clientCardData;

      await update(ref(database), updates);

       // Now, update the client's user data to include the active loyalty card
       const clientUserRef = ref(database, `users/${clientUniqueId}`);
       const clientUserData = {
        id: cardId
      };

       await update(ref(database), {
           [`users/${clientUniqueId}/profile/activeLoyaltyCards`]: clientUserData,
       });

  } catch (error) {
      console.error('Error adding client to loyalty card:', error);
  }
}


export const fectchLoyaltyCardId = async (uid, setLoyaltyCardId) => {

  try {
  const database = getDatabase();
  const cleanUid = uid.replace(/"/g, '');
  const userRef = ref(database, `users/${cleanUid}/proMode/loyaltyCard/id`);
 
  await get(userRef)
    .then((snapshot) => {
      const loyaltyCardId = snapshot.val() || {};
      if(loyaltyCardId) {
        setLoyaltyCardId(loyaltyCardId)
      }
    })
  }
  catch(error) {
    console.error('Error getting loyaltyCard id:', error);
};
 };

  