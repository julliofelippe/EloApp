import {
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import React, { useState } from 'react';
import {
  DrawerNavigationState,
  ParamListBase,
  useNavigation
} from '@react-navigation/native';
import { DrawerItemList } from '@react-navigation/drawer';
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers
} from '@react-navigation/drawer/lib/typescript/src/types';
import { Feather } from '@expo/vector-icons';
import { HStack } from 'native-base';

import { Container } from '../Container';
import { Row } from '../Row';
import { constant, drawerMenu } from '../../constants/constants';
import Colors from '../../constants/Colors';
import Styles from '../../common/styles';
import profilePic from '../../../assets/profile-pic.png';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

const CustomDrawer = (props: Props) => {
  const navigation = useNavigation();
  const [menuIndex, setMenuIndex] = useState(-1);
  return (
    <Container style={{ marginTop: 20 }}>
      {/* profile header */}
      <TouchableNativeFeedback onPress={() => navigation.navigate('Profile')}>
        <View style={styles.header}>
          <Image source={profilePic} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>Usuário</Text>
            <Text>Administrador</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      {/* DrawerList */}
      <DrawerItemList {...props} />
      <View style={styles.spacer} />
      {/* Menu */}
      {drawerMenu.map((item, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={[styles.menu, { backgroundColor: item.bg + '99' }]}
            onPress={() => {
              // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
              LayoutAnimation.configureNext(
                LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
              );
              setMenuIndex(menuIndex === index ? -1 : index);
            }}
          >
            <HStack justifyContent="flex-start" mx="3" my="1.5">
              <Feather name={item.icon} size={22} />
              <Text
                style={[
                  styles.text,
                  {
                    color: menuIndex === index ? Colors.black : Colors.gray
                  }
                ]}
              >
                {item.title}
              </Text>
            </HStack>
            {menuIndex === index && (
              <View
                style={{
                  marginLeft: 30,
                  borderRadius: constant.borderRadius,
                  backgroundColor: item.bg
                }}
              >
                {item.menuList.map((subMenu, index) => (
                  <TouchableNativeFeedback
                    key={index}
                    onPress={() => {
                      navigation.navigate(`${subMenu.routeTo}`, {
                        name: `${subMenu.routeTo}`
                      });
                    }}
                  >
                    <View style={styles.subMenu}>
                      <Text>{subMenu.title}</Text>
                    </View>
                  </TouchableNativeFeedback>
                ))}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </Container>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: constant.SPACING
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 200
  },
  header: {
    padding: constant.SPACING,
    ...Styles.rowView,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light
  },
  name: {
    fontSize: constant.titleFontSize
  },
  menu: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: constant.SPACING / 1.7,
    marginVertical: constant.SPACING / 2.5,
    borderRadius: constant.borderRadius
  },
  item: {
    paddingHorizontal: constant.SPACING / 1.5,
    paddingVertical: constant.SPACING / 1.2
  },
  text: {
    fontSize: constant.textFontSize,
    paddingHorizontal: constant.SPACING
  },
  subMenu: {
    paddingHorizontal: constant.SPACING,
    paddingVertical: constant.SPACING / 1.5
  },
  spacer: {
    marginVertical: constant.SPACING,
    width: '90%',
    height: 1,
    backgroundColor: Colors.light,
    alignSelf: 'center'
  }
});
