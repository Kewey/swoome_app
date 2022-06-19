import { StyleSheet, View, ViewProps } from 'react-native';
import React from 'react';
import CircleButton from './CircleButton';
import Text from './Text';
import { layout } from '@styles/layout';
import { useTheme } from '@react-navigation/native';
import Layout, { sideMargin } from '@constants/Layout';
import Avatar from './Avatar';

interface CardWithIconProps extends ViewProps {
  label: string;
  icon?: string;
  sublabel?: string;
  picture?: string | undefined;
}

const CardWithIcon = ({
  icon,
  label,
  sublabel,
  picture,
  ...props
}: CardWithIconProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        layout.rowSBCenter,
        {
          padding: 15,
          backgroundColor: colors.card,
          borderRadius: 12,
        },
        props.style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {picture ? (
          <View
            style={{
              backgroundColor: colors.background,
              borderRadius: 25,
            }}
          >
            <Avatar source={picture} username={icon} size={34} />
          </View>
        ) : (
          <CircleButton size={40} backgroundColor={colors.background}>
            <Text>{icon}</Text>
          </CircleButton>
        )}
        <View style={{ marginLeft: 10 }}>
          {sublabel && <Text style={{ fontSize: 12 }}>{sublabel}</Text>}
          <Text
            weight="bold"
            numberOfLines={1}
            style={{ width: Layout.window.width - sideMargin * 2 - 90 }}
          >
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardWithIcon;

const styles = StyleSheet.create({});
