import { Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import tw from 'twrnc'

export default function TermsOfUse({navigation}) {
    return(
        <SafeAreaView style={tw`flex-1 ml-7 mr-7 `}>
            <ScrollView style={tw`flex-1`}>
                <Text style={tw`text-3xl`}> 1. Acceptance of Terms </Text>
                <Text style={tw`text-xl ml-6`}>Effective Date: 30.11.2023 </Text>
                <Text style={tw`text-xl`}>These Terms of Use ("Terms") govern your use of the Business Time application 
                ("the Application") provided by Patryk Januszewski ("we," "us," or "our"). 
                By accessing or using the Application, you agree to these Terms.</Text>
                <Text style={tw`text-3xl`}> 2. Use of the Application </Text>
                <Text style={tw`text-3xl`}> 2.1 Eligibility </Text>
                <Text style={tw`text-xl`}>You must be at least 16 years old to use the Application. 
                By using the Application, you represent and warrant that you are at least 16 years old.</Text>
                <Text style={tw`text-3xl`}> 2.2 User Account </Text>
                <Text style={tw`text-xl`}>You may be required to create a user account to access certain features of the Application. 
                You are responsible for maintaining the confidentiality of your account credentials and are fully responsible for all activities that occur under your account.</Text>
                <Text style={tw`text-3xl`}> 2.3 Prohibited Activities </Text>
                <Text style={tw`text-xl`}>You agree not to engage in any of the following prohibited activities:</Text>

                <Text style={tw`text-xl ml-6`}>+ Violating any applicable laws or regulations.</Text>
                <Text style={tw`text-xl ml-6`}>+ Using the Application for any unlawful purpose or in any way that may harm the Application or its users.</Text>
                <Text style={tw`text-xl ml-6`}>+ Attempting to interfere with the proper functioning of the Application.</Text>
                <Text style={tw`text-3xl`}> 3. Intellectual Property </Text>
                <Text style={tw`text-xl`}>The Application and its original content, features, and functionality are owned by BussinTime and are protected by international copyright, 
                trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</Text>
                <Text style={tw`text-3xl`}> 4. Privacy </Text>
                <Text style={tw`text-xl`}>Your use of the Application is also governed by our Privacy Policy, which can be found at policy@bussintime.com.</Text>
                <Text style={tw`text-3xl`}> 5. Termination </Text>
                <Text style={tw`text-xl`}>We reserve the right to terminate or suspend your account and access to the Application at our sole discretion, without notice, 
                for any reason, including without limitation, a breach of these Terms.</Text>
                <Text style={tw`text-3xl`}> 6. Disclaimer of Warranties </Text>
                <Text style={tw`text-xl`}>The Application is provided "as is" and "as available" without any warranties, expressed or implied. 
                We do not warrant that the Application will be error-free or uninterrupted.</Text>
                <Text style={tw`text-3xl`}> 7. Limitation of Liability </Text>
                <Text style={tw`text-xl`}>To the fullest extent permitted by applicable law, BussinTime shall not be liable for any indirect, incidental, special, consequential,
                 or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from (a) 
                 your use or inability to use the Application; (b) 
                 any unauthorized access to or use of our servers and/or any personal information stored therein.</Text>
                <Text style={tw`text-3xl`}> 8. Changes to Terms </Text>
                <Text style={tw`text-xl`}>We reserve the right to modify or replace these Terms at any time. 
                The most current version of these Terms will be posted on the Application.</Text>
                <Text style={tw`text-3xl`}> 9. Contact Information </Text>
                <Text style={tw`text-xl`}>If you have any questions about these Terms, please contact us at ask@bussintime.com. </Text>
            </ScrollView>
        </SafeAreaView>
    );
}