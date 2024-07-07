import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({ title, value, placeholder, otherStyles, handleChange, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

            <View className="w-full h-16 px-4 rounded-2xl bg-black-100 border-2 border-black-200 focus:border-secondary items-center flex-row">
                <TextInput
                    className="flex-1 text-base text-white font-psemibold"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={"#7B7B8B"}
                    onChangeText={handleChange}
                    secureTextEntry={title === "Password" && !showPassword}
                />

                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                        <Image
                            source={showPassword ? icons.eyeHide : icons.eye}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
