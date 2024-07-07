import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({ color, icon, name, focused }) => (
    <View className="items-center justify-center gap-2">
        <Image source={icon} tintColor={color} resizeMode="contain" className="w-6 h-6" />
        <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color }}>
            {name}
        </Text>
    </View>
);

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#FFA001",
                    tabBarInactiveTintColor: "#CDCDE0",
                    tabBarStyle: {
                        height: 84,
                        backgroundColor: "#161622",
                        borderTopWidth: 1,
                        borderTopColor: "#232533",
                        paddingTop: 20,
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.home} color={color} focused={focused} name="Home" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: "Bookmark",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.bookmark} color={color} focused={focused} name="Bookmark" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.plus} color={color} focused={focused} name="Create" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icons.profile} color={color} focused={focused} name="Profile" />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
