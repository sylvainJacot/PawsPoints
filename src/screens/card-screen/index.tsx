import { useContext } from "react";
import { Text } from "react-native";

// Store
import UserContext from "../../context/user-context";

function CardScreen () {

    // Context
    const userContext = useContext(UserContext);

    return (
        <Text>userData.proMode</Text>
    )
}

export default CardScreen;