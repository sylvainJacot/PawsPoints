import React, { useContext, useEffect, useState} from 'react';
import { Text } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { updateCard } from '../../utils/services/firebase-services';
import * as ImagePicker from 'expo-image-picker';
import UserContext from '../../context/user-context';


export default function CardCreation() {

  const { user } = useAuthentication();
  const { userData } = useContext(UserContext)
  const { proMode } = userData;
  const { loyaltyCard } = proMode;

  // State
  const [cardId, setCardId] = useState<String>('');
  const [activityName, setactivityName] = useState<String>(loyaltyCard?.name);
  const [slotsCount, setSlotsCount] = useState<Number>(loyaltyCard?.slotsCount);
  const [cardLogo, setCardLogo] = useState<Object>(loyaltyCard?.logo);
  const [cardColor, setCardColor] = useState<String>(loyaltyCard?.color);

  // Function
  function handleUpdateCard () {
    updateCard(cardId, activityName, cardLogo, cardColor, slotsCount, user?.uid)
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    console.log(result);

    if (!result.canceled) {
      setCardLogo(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const date = Date.now();
    const userID = user?.uid;
    const uniqueCardId = `${date}-${userID}`;
    if(uniqueCardId){ 
      setCardId(uniqueCardId);
    }
  }, [user])

  console.group('%c STATE', 'color: white; background-color: #1B83A4; font-size: 15px');
  console.log('userData', userData);
  console.groupEnd();


  return (
    <React.Fragment>
      <Input 
          value={activityName} 
          onChangeText={setactivityName} 
          placeholder="Name of card" 
       />
       <Input 
          keyboardType="numeric"
          value={slotsCount} 
          onChangeText={setSlotsCount} 
          placeholder="Number of slots" 
       />
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {cardLogo && <Image source={{ uri: cardLogo }} style={{ width: 200, height: 200 }} />}
        <Input 
          value={cardColor} 
          onChangeText={setCardColor} 
          placeholder="Color" 
       />
        <Button title="Save" onPress={() => handleUpdateCard()} />
    </React.Fragment>
  );
}
