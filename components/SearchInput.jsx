import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { router, usePathname } from "expo-router";

import { icons } from "../constants";

const SearchInput = ({ initialQuery, placeholder }) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    return (
        <View className="w-full h-16 px-4 rounded-2xl bg-black-100 border-2 border-black-200 focus:border-secondary items-center flex-row space-x-4">
            <TextInput
                className="flex-1 text-base text-white font-pregular mt-0.5"
                value={query}
                placeholder={placeholder}
                placeholderTextColor={"#CDCDE0"}
                onChangeText={(text) => setQuery(text)}
            />

            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        return Alert.alert("Missing Query", "Please input something to search results across database");
                    }
                    if (pathname.startsWith("/search")) {
                        router.setParams({ query });
                    } else {
                        router.push(`/search/${query}`);
                    }
                }}
            >
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
