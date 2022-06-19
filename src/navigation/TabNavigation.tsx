import { Blue, White } from '@constants/Colors';
import { sideMargin } from '@constants/Layout';
import { useNavigation, useTheme } from '@react-navigation/native';
import { removeGroup } from '@redux/group.reducer';
import { getCurrentUser } from '@redux/user.reducer';
import Expenses from '@screens/expenses';
import GroupParamsScreen from '@screens/tabs/GroupParamsScreen';
import HomeScreen from '@screens/tabs/HomeScreen';
import RefundsScreen from '@screens/tabs/RefundsScreen';
import ReportScreen from '@screens/tabs/ReportScreen';
import { borderRadius } from '@styles/layout';
import Avatar from '@ui/Avatar';
import CircleButton from '@ui/CircleButton';
import {
  DataTransferBoth,
  HomeSimple,
  Plus,
  Reports,
  Settings,
  ViewGrid,
} from 'iconoir-react-native';
import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { TabStack, TabScreens, MainScreens } from './Routes';

const TabNavigation = (): ReactElement => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const { bottom } = useSafeAreaInsets();

  return (
    <TabStack.Navigator
      initialRouteName={TabScreens.Home}
      screenOptions={{
        headerShadowVisible: false,
        headerTransparent: true,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: colors.text,
        tabBarActiveTintColor: colors.primary,
        tabBarIconStyle: {},
        tabBarStyle: {
          position: 'absolute',
          bottom: bottom + 20,
          left: sideMargin,
          paddingBottom: 0,
          right: sideMargin,
          paddingHorizontal: sideMargin,
          backgroundColor: colors.card,
          borderRadius: borderRadius * 2,
          borderTopWidth: 0,
          elevation: 0,
          height: 65,
          shadowOpacity: 0,
          zIndex: 500,
        },
        headerTitle: '',
        headerRight: () => {
          const navigation = useNavigation();
          return (
            <View style={{ marginRight: 20, flexDirection: 'row' }}>
              <CircleButton
                backgroundColor={colors.card}
                style={{ marginRight: 10 }}
                onPress={() => dispatch(removeGroup())}
              >
                <ViewGrid height={20} width={20} color={colors.text} />
              </CircleButton>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.getParent()?.navigate(MainScreens.Profile)
                }
              >
                <Avatar
                  source={currentUser?.avatar?.url}
                  username={currentUser?.username}
                  size={26}
                />
              </TouchableWithoutFeedback>
            </View>
          );
        },
      }}
    >
      <TabStack.Screen
        name={TabScreens.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <HomeSimple height={size} width={size} color={color} />;
          },
        }}
      />

      <TabStack.Screen
        name={TabScreens.Report}
        component={ReportScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Toast.show({
              type: 'info',
              text1: 'Ça arrive foooort 💪',
              text2: 'On a encore des suprises pour toi très bientôt',
            });
          },
        }}
        options={{
          tabBarIcon: ({ size }) => (
            <Reports height={size} width={size} color={colors.muted} />
          ),
        }}
      />

      <TabStack.Screen
        name={TabScreens.AddExpense}
        component={Expenses}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate(MainScreens.AddExpense);
          },
        })}
        options={{
          tabBarIcon: ({ size }) => (
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: Blue,
                borderRadius,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Plus height={size * 1.2} width={size * 1.2} color={White} />
            </View>
          ),
        }}
      />

      <TabStack.Screen
        name={TabScreens.Refunds}
        component={RefundsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <DataTransferBoth
              height={size}
              width={size}
              color={color}
              rotation={90}
            />
          ),
        }}
      />

      <TabStack.Screen
        name={TabScreens.GroupParams}
        component={GroupParamsScreen}
        options={{
          tabBarAccessibilityLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Settings height={size} width={size} color={color} />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

export default TabNavigation;
