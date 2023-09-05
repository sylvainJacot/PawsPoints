import { useContext } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
// Store
import UserContext from "../../context/user-context";


function CardScreen ({ navigation }) {

    // Context
    const userContext = useContext(UserContext);

    return (
        <View>
        <Text>CardScreen</Text>
        <Button
        title="Create a card"
        onPress={() => navigation.navigate('CardCreation')} 
        />
        </View>
    )
}

export default CardScreen;