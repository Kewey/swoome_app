import { View, Image } from 'react-native';
import React from 'react';
import Text from './Text';
import { useTheme } from '@react-navigation/native';
import { Check } from 'iconoir-react-native';

interface AvatarProps {
  source: string | undefined;
  username: string | undefined;
  size?: number;
  border?: boolean;
  selected?: boolean;
}

const Avatar = ({
  source,
  username,
  size = 20,
  border = false,
  selected = false,
}: AvatarProps) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        padding: 3,
        borderWidth: 2,
        borderColor: selected ? colors.primary : 'transparent',
        borderRadius: size + 3 / 2,
      }}
    >
      {source ? (
        <Image
          width={size}
          height={size}
          source={{ uri: source }}
          style={{
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        <View
          style={{
            height: size,
            width: size,
            borderRadius: size / 2,
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text weight="bold" style={{ fontSize: size / 2 }}>
            {username?.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      {border && (
        <View
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            height: size + 2,
            width: size + 2,
            borderRadius: (size + 2) / 2,
            borderColor: colors.background,
            borderWidth: border ? size / 10 : 0,
          }}
        />
      )}
      {selected && (
        <View
          style={{
            position: 'absolute',
            bottom: size / 20,
            right: size / 20,
            height: size / 5,
            width: size / 5,
            borderRadius: size / 10,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Check
            color={colors.background}
            height={size / 8}
            width={size / 8}
            strokeWidth={size / 30}
          />
        </View>
      )}
    </View>
  );
};

export default Avatar;
