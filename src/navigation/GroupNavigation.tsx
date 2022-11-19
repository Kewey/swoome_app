import { White } from '@constants/Colors'
import { NavigationContainer, useTheme } from '@react-navigation/native'
import GroupIndexScreen from '@screens/group'
import GroupCreateScreen from '@screens/group/CreateGroupScreen'
import JoinGroupScreen from '@screens/group/JoinGroupScreen'
import { theme } from '@styles/theme'
import CircleButton from '@ui/CircleButton'
import { NavArrowLeft } from 'iconoir-react-native'
import React, { ReactElement } from 'react'
import { View } from 'react-native'
import { GroupScreens, GroupStack } from './Routes'

const GroupNavigation = (): ReactElement => {
  const { colors } = useTheme()

  return (
    <GroupStack.Navigator
      initialRouteName={GroupScreens.Index}
      screenOptions={({ navigation }) => ({
        headerTitle: '',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerLeft: () => {
          return (
            <View style={{ marginLeft: 30 }}>
              <CircleButton
                backgroundColor={colors.card}
                onPress={() => navigation.goBack()}
              >
                <NavArrowLeft height={25} width={25} color={colors.text} />
              </CircleButton>
            </View>
          )
        },
      })}
    >
      <GroupStack.Screen
        name={GroupScreens.Index}
        component={GroupIndexScreen}
        options={{ headerLeft: () => null }}
      />
      <GroupStack.Screen
        name={GroupScreens.Create}
        component={GroupCreateScreen}
      />
      <GroupStack.Screen
        name={GroupScreens.JoinGroup}
        component={JoinGroupScreen}
      />
    </GroupStack.Navigator>
  )
}

export default GroupNavigation
