import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

import tw from 'twrnc'

export default function Popup({ visible, onClose, text }){
    return(
      <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={tw`flex-1 items-center justify-center bg-opacity-50 bg-black`}>
        <View style={tw`w-3/4 bg-white p-4 rounded`}>
          <Text>{text}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={tw`underline`}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    )
}