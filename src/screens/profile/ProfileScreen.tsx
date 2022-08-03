import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  disconectUser,
  getCurrentUser,
  getTheme,
  getIsNotificationActive,
  setNotification,
  setTheme,
  setUser,
} from '@redux/user.reducer'
import CardWithIcon from '@ui/CardWithIcon'
import FredokaText from '@ui/FredokaText'
import { removeGroup } from '@redux/group.reducer'
import Layout from '@ui/Layout'
import { Controller, useForm } from 'react-hook-form'
import BottomSheetModal from '@ui/BottomSheetModal'
import Input from '@ui/Input'
import Button from '@ui/Button'
import { editUser } from '@services/userService'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { addMedia, editAvatar } from '@services/mediaService'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { registerForPushNotificationsAsync } from '@services/notificationService'

const ProfileScreen = () => {
  const currentUser = useSelector(getCurrentUser)
  const isDarkTheme = useSelector(getTheme)
  // const isNotificationActive = useSelector(getIsNotificationActive)
  const dispatch = useDispatch()

  const [isPictureOpen, setIsPictureOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newAvatar, setNewAvatar] = useState(currentUser?.avatar?.url)
  const [status, requestPermission] = ImagePicker.useCameraPermissions()

  const { control, handleSubmit, reset } = useForm<{ username: string }>()

  const onSubmit = async ({ username }: { username: string }) => {
    setIsLoading(true)
    const newUser = await editUser(currentUser?.id || '', { username })
    dispatch(setUser(newUser))
    setIsLoading(false)
    setIsOpen(false)
    reset()
  }

  const havePermission = async () => {
    if (status?.status !== ImagePicker.PermissionStatus.GRANTED) {
      const { status: currentStatus } = await requestPermission()

      if (currentStatus !== ImagePicker.PermissionStatus.GRANTED) {
        alert('Vous devez accepter la permission pour éditer votre photo')
        return false
      }
    }

    return true
  }

  const onPressOpenMedia = async () => {
    if (!(await havePermission())) {
      return
    }

    if (status?.status !== ImagePicker.PermissionStatus.GRANTED) {
      const test = await requestPermission()
    }

    let selectedAvatar = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (selectedAvatar.cancelled) {
      return
    }

    try {
      await editAvatar(selectedAvatar)
      setNewAvatar(selectedAvatar.uri)
      setIsPictureOpen(false)
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: "Oups une erreur s'est produite",
        text2: error?.['hydra:description'],
      })
    }
  }

  const onPressOpenCamera = async () => {
    if (!(await havePermission())) {
      return
    }

    let selectedAvatar = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (selectedAvatar.cancelled) {
      return
    }

    try {
      await editAvatar(selectedAvatar)
      setNewAvatar(selectedAvatar.uri)
      setIsPictureOpen(false)
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: "Oups une erreur s'est produite",
        text2: error?.['hydra:description'],
      })
    }
  }

  return (
    <Layout>
      <TouchableOpacity
        style={{ marginBottom: 10, marginHorizontal: 20 }}
        onPress={() => setIsOpen(true)}
      >
        <CardWithIcon
          icon="🙄"
          sublabel="Surnom"
          label={currentUser?.username || 'oups'}
        />
      </TouchableOpacity>
      <BottomSheetModal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={{ marginBottom: 20 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Surnom"
              placeholder={currentUser?.username}
              autoFocus
              enablesReturnKeyAutomatically
            />
          )}
          name="username"
        />
        <Button onPress={handleSubmit(onSubmit)}>
          {isLoading ? 'Chargement' : 'Modifier'}
        </Button>
      </BottomSheetModal>
      <TouchableOpacity
        onPress={() => setIsPictureOpen(true)}
        style={{ marginBottom: 10, marginHorizontal: 20 }}
      >
        <CardWithIcon
          icon="📷"
          picture={newAvatar}
          sublabel="Photo de profil"
          label={currentUser?.avatar ? 'Editer la photo' : 'À définir'}
        />
      </TouchableOpacity>
      <BottomSheetModal
        isOpen={isPictureOpen}
        closeModal={() => setIsPictureOpen(false)}
      >
        <FredokaText style={{ marginBottom: 10 }}>
          Ajouter une photo
        </FredokaText>
        <Button variant="transparent" onPress={onPressOpenCamera}>
          Prendre une photo
        </Button>
        <Button variant="transparent" onPress={onPressOpenMedia}>
          Choisir une photo existante
        </Button>
      </BottomSheetModal>

      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <FredokaText>Modifier les paramètres</FredokaText>
      </View>
      <TouchableOpacity
        style={{ marginBottom: 10, marginHorizontal: 20 }}
        onPress={() => dispatch(setTheme(!isDarkTheme))}
      >
        <CardWithIcon
          icon={isDarkTheme ? '🌙' : '🌞'}
          sublabel="Thème"
          label={isDarkTheme ? 'Sombre' : 'Clair'}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity style={{ marginBottom: 10, marginHorizontal: 20 }}>
        <CardWithIcon icon="🏁" sublabel="Langue" label="Français" />
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={{ marginBottom: 10, marginHorizontal: 20 }}
        onPress={async () => {
          console.log(isNotificationActive)

          isNotificationActive
            ? dispatch(setNotification(''))
            : await registerForPushNotificationsAsync()
        }}
      >
        <CardWithIcon
          icon="🔔"
          sublabel="Notifications"
          label={isNotificationActive ? 'Activées' : 'Désactivées'}
        />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={{ marginTop: 20, marginHorizontal: 20 }}
        onPress={() => {
          dispatch(disconectUser())
          dispatch(removeGroup())
        }}
      >
        <CardWithIcon icon="🚪" label="Déconnexion" />
      </TouchableOpacity>
    </Layout>
  )
}

export default ProfileScreen
