// import * as ImagePicker from 'expo-image-picker';
import UserContext from 'context/user-context';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TextInput } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useAuthentication } from 'utils/hooks/useAuthentication';
import { updateCard } from 'utils/services/firebase-services';


export default function CardCreation() {

  const { user } = useAuthentication();
  const { userData } = useContext(UserContext)
  const { proMode } = userData;
  const { loyaltyCard } = proMode;

  // State
  const [cardId, setCardId] = useState<String>('');
  const [activityName, setactivityName] = useState<String>(loyaltyCard?.name);
  const [slotsCount, setSlotsCount] = useState<Number>(loyaltyCard?.slotsCount);
  const [cardColor, setCardColor] = useState<String>(loyaltyCard?.color);

  // Function
  function handleUpdateCard () {
    updateCard(cardId, activityName, cardColor, slotsCount, user?.uid)
  }

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 0.2,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setCardLogo(result.assets[0].uri);
  //   }
  // };


  const handleTextChange = (text) => {
    // Use a regular expression to remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    // Convert the numeric value to a number
    const numericInput = parseFloat(numericValue);

    // Check if the numeric input is within the desired range (1 to 10)
    if (!isNaN(numericInput) && numericInput >= 1 && numericInput <= 10) {
      setSlotsCount(numericInput); // Set the valid value
    } else {
      setSlotsCount(0); // Clear the input if it's not within the range
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



  return (
    <SafeAreaView>
      <Input 
          value={activityName} 
          onChangeText={setactivityName} 
          placeholder="Name of card" 
       />
       <TextInput 
           keyboardType="numeric"
          value={slotsCount} 
          onChangeText={(v) => handleTextChange(v)} 
          maxLength={10}
       />
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
        {cardLogo && <Image source={{ uri: cardLogo }} style={{ width: 200, height: 200 }} />} */}
        <Input 
          value={cardColor} 
          onChangeText={setCardColor} 
          placeholder="Color" 
       />
        <Button title="Save" onPress={() => handleUpdateCard()} />
    </SafeAreaView>
  );
}
