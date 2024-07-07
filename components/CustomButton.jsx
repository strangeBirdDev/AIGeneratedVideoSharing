import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ title, containerStyles, textStyles, isLoading, handlePress }) => {
    return (
        <TouchableOpacity
            className={`min-h-[62px] rounded-xl justify-center items-center bg-secondary ${containerStyles} ${
                isLoading ? "opacity-50" : ""
            }`}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <Text className={`text-lg text-primary font-psemibold ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
