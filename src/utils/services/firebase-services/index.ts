import { get, getDatabase, ref, set } from 'firebase/database';

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

