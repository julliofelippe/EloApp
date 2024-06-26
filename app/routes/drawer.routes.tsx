import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScreensArray, constant } from '../constants/constants';
import Colors from '../constants/Colors';
import CustomDrawer from '../components/CustomDrawer';
import { Feather } from '@expo/vector-icons';
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerStyle: styles.drawerStyle,
        drawerActiveBackgroundColor: Colors.primary,
        drawerItemStyle: styles.drawerItemStyles,
        drawerActiveTintColor: Colors.black,
        drawerLabelStyle: styles.drawerLabelStyles,
        title: ''
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {ScreensArray.map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              drawerIcon: ({ color, size, focused }) => (
                <Feather name={item.icon} size={size} color={color} />
              ),
              drawerItemStyle: { display: item.display },
              drawerLabel: item.label,
              title: item.title,
              headerTitleStyle: {
                color: '#e7781c'
              }
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({
  drawerStyle: {
    width: 300
  },
  drawerItemStyles: {
    borderRadius: constant.borderRadius
  },
  drawerLabelStyles: {
    fontSize: constant.textFontSize,
    marginHorizontal: -constant.SPACING
  }
});
