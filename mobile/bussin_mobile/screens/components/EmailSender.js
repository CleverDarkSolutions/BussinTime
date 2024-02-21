import { showAlert } from "./CustomAlert";
import * as MailComposer from 'expo-mail-composer';


export const EmailSend = async ({message}) => {
    try{
        const isAvaliable = await MailComposer.isAvailableAsync()
        if(!isAvaliable){
            showAlert("Email not avaliable!")
            return
        }
        await MailComposer.composeAsync({
            recipients: ['emil.twardzik.3@gmail.com'],
            subject: 'Feedback from mobile app SEND FEEDBACK',
            body: 'One user dend to us: ' + message,
            isHtml: false,
        });
    }catch (error) {
        console.log('Error sending email: ', error)
        showAlert("Cant send email", "it may be some problem with servers")
    }
}