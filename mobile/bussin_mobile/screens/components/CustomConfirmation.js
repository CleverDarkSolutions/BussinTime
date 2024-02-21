import { Alert } from "react-native"

export const showConfirmation = (
    title="Default", 
    reason, 
    optionOne = "YES", 
    onPressOptionOne = () => {},
    optionTwo = "NO", 
    onPressOptionTwo = () => {}
    ) => {
    Alert.alert(
        title,
        reason,
        [
            {text: optionOne, 
                onPress: () => {
                onPressOptionOne()
            }
        },
            {text: optionTwo,
                onPress: () => {
                onPressOptionTwo()
            },
        },
        ],
        {cancelable: false}
    )
}