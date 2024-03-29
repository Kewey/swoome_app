import React, { useCallback, useRef, useState } from 'react'
import { getCurrentGroup, removeGroup, setGroup } from '@redux/group.reducer'
import FredokaText from '@ui/FredokaText'
import { Animated, Image, ImageBackground, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ExpenseItem from '@screens/expenses/components/ExpenseItem'
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native'
import {
  deleteExpense,
  displayPrice,
  getGroupExpenses,
} from '@services/expenseService'
import { Expense } from '@types/Expense'
import { sideMargin } from '@constants/Layout'
import Text from '@ui/Text'
import Button from '@ui/Button'
import { MainScreens } from '@navigation/Routes'
import AnimatedHeaderLayout from '@ui/AnimatedHeaderLayout'
import { getGroup } from '@services/groupService'
import { getCurrentUser } from '@redux/user.reducer'
import { borderRadius, layout } from '@styles/layout'
import { White } from '@constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CircleButton from '@ui/CircleButton'
import Toast from 'react-native-toast-message'

const HomeScreen = () => {
  // const groupId = route.params?.groupId

  const currentGroup = useSelector(getCurrentGroup)
  const currentUser = useSelector(getCurrentUser)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const { top, bottom } = useSafeAreaInsets()

  const updateExpenses = async () => {
    setIsLoading(true)
    try {
      const { expenses } = await getGroupExpenses(currentGroup!.id)
      const group = await getGroup(currentGroup!.id)
      dispatch(setGroup(group))
      setExpenses(expenses)
    } catch (error) {
      dispatch(removeGroup())
      Toast.show({
        type: 'error',
        text1: 'Oups ! Votre groupe est introuvable !',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const scrollPositionValue = useRef(new Animated.Value(0)).current

  const filterMyExpenses = currentGroup!.expenses.filter(
    (expense) => expense.madeBy?.id === currentUser?.id
  )
  const totalExpenses = filterMyExpenses.reduce((previousValue, expense) => {
    return previousValue + expense.price
  }, 0)

  useFocusEffect(
    useCallback(() => {
      updateExpenses()
    }, [])
  )

  const updateExpense = async (expense: Expense) => {
    try {
      navigation.navigate(MainScreens.AddExpense, { expense: expense })
    } catch (error) {}
  }

  const removeExpense = async (expenseId: string, positionIdx: number) => {
    try {
      await deleteExpense(expenseId)
      const currentExpenses = [...expenses]
      const newExpenses = currentExpenses.splice(positionIdx, 1)
      setExpenses(currentExpenses)
    } catch (error) {}
  }

  const currentBalance = currentGroup!.balances.find(
    (balance) => balance.balanceUser.id === currentUser?.id
  )

  const ListHeaderComponent = () =>
    currentGroup && (
      <View
        style={{
          paddingHorizontal: sideMargin,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: colors.primary,
            borderRadius: borderRadius * 2,
            overflow: 'hidden',
          }}
        >
          <ImageBackground
            source={require('@assets/motif.png')}
            style={{
              flex: 1,
              justifyContent: 'center',
              padding: 20,
            }}
            resizeMode="repeat"
            imageStyle={{ opacity: 0.05 }}
          >
            <View style={{ marginBottom: 20 }}>
              <Text style={{ color: White }}>Dépenses totales du groupe</Text>
              <FredokaText style={{ color: White, fontSize: 45 }}>
                {displayPrice(currentGroup.sumExpenses)} €
              </FredokaText>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: White }}>Mes dépenses</Text>
                <FredokaText style={{ color: White, fontSize: 20 }}>
                  {displayPrice(totalExpenses)} €
                </FredokaText>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: White }}>Ma balance</Text>
                <FredokaText style={{ color: White, fontSize: 20 }}>
                  {displayPrice(currentBalance?.value)} €
                </FredokaText>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    )

  const ListEmptyComponent = ({}) =>
    isLoading ? (
      <>
        {[0, 0, 0, 0, 0].map((item, index) => (
          <View
            key={index + 'skeleton'}
            style={{
              paddingHorizontal: sideMargin,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 15,
            }}
          >
            <CircleButton
              size={40}
              style={{ marginRight: 10 }}
              backgroundColor={colors.card}
            ></CircleButton>

            <View
              style={{
                flex: 1,
              }}
            >
              <View style={[layout.rowSBCenter, { marginBottom: 2 }]}>
                <View
                  style={{
                    height: 16,
                    width: 80,
                    backgroundColor: colors.text,
                    borderRadius,
                  }}
                />
                <View
                  style={{
                    height: 16,
                    width: 40,
                    backgroundColor: colors.text,
                    borderRadius,
                  }}
                />
              </View>
              <View style={layout.rowSBCenter}>
                <View
                  style={{
                    marginTop: 5,
                    height: 10,
                    width: 130,
                    backgroundColor: colors.border,
                    borderRadius,
                  }}
                />
                <View
                  style={{
                    marginTop: 5,
                    height: 10,
                    width: 60,
                    backgroundColor: colors.border,
                    borderRadius,
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </>
    ) : (
      <View
        style={{
          flex: 1,
          paddingHorizontal: sideMargin,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Image
            source={require('@assets/empty/empty-expenses.png')}
            style={{
              width: 320,
              height: 118,
            }}
            resizeMode="contain"
          />
        </View>
        <FredokaText
          style={{ textAlign: 'center', marginBottom: 10, fontSize: 18 }}
        >
          Ouh là c'est vide ici !
        </FredokaText>
        <Text style={{ textAlign: 'center', marginBottom: 10, opacity: 0.6 }}>
          C'est le moment d'ajouter ta toute premiere dépense !
        </Text>
        <Button onPress={() => navigation.navigate(MainScreens.AddExpense)}>
          C'est parti !
        </Button>
      </View>
    )

  return (
    <>
      <Animated.FlatList
        data={expenses}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{
          marginBottom: 60,
        }}
        contentContainerStyle={{
          paddingBottom: bottom + 90,
          paddingTop: top + 70,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollPositionValue },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(expense) => expense.id}
        renderItem={({ item: expense, index }) => (
          <ExpenseItem
            expense={expense}
            updateExpense={updateExpense}
            removeExpense={() => removeExpense(expense.id, index)}
          />
        )}
      />
      <AnimatedHeaderLayout
        title="Dernières activités"
        offset={205}
        // title={`Salut ${currentUser?.username} 👋`}
        scrollPositionValue={scrollPositionValue}
      />
    </>
  )
}

export default HomeScreen
