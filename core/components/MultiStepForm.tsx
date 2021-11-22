import { colorBlue, colorGrey, colorLight, colorWhite } from '@constants/Colors'
import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from './Button'
import { FredokaText, RegularText } from './StyledText'

const MultiStepForm = () => {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
          <Button>dzadazd</Button>
          <Button>Déjà un compte ?</Button>
        </View>
        
        <View style={{height: 5, width: 150, backgroundColor: colorLight, borderRadius: 3, marginBottom: 40, alignSelf: 'center'}}>
          <View style={{height: '100%', width: '50%', backgroundColor: colorBlue, borderRadius: 3}} />
        </View>

        <View style={{maxWidth: '90%', alignSelf: 'center'}}>
          <FredokaText style={{fontSize: 28, textAlign: 'center', marginBottom: 16}}>Comment tes amis t'appellent-ils ?</FredokaText>
          <RegularText style={{fontSize: 15, textAlign: 'center'}}>Connaitre ton prénom va nous permettre de personnaliser ton expérience.</RegularText>
        </View>
      </View>

      <View>
        <View style={{borderRadius: 10, borderColor: '#eaeaea', borderWidth: 1, marginBottom: 20}}>
          <TextInput style={{padding: 22}} placeholder={'Ex. Bob'} />
        </View>
        <Button block>Continuer</Button>
      </View>
    </SafeAreaView>
  </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignContent: 'space-between'
  },
})

export default MultiStepForm
