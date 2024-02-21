import { Alert } from "react-native"

export const showAlert = (title, reason, comfirm = "ok", onPress = () => {}) => {
    Alert.alert(
        title,
        reason,
        [
            {text: comfirm, onPress: () => {
                onPress()
            }},
        ],
        {cancelable: false}
    )
}