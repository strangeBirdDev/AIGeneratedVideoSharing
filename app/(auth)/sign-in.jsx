import { View, Text, SafeAreaView, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isSubmiting, setIsSubmiting] = useState(false);
    const { setUser, setIsLoggedIn } = useGlobalContext();

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert("Error", "Please fill in all the fields");
        }
        setIsSubmiting(true);

        try {
            await signIn(form.email, form.password);
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setIsLoggedIn(true);
            Alert.alert("Success", "User signed in successfullt!");

            // Set it to global state
            router.replace("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsSubmiting(false);
        }
    };

    return (
        <SafeAreaView className="h-full bg-primary">
            <ScrollView contentContainerStyle={{ height: "90%" }}>
                <View className="w-full h-full justify-center px-4 my-6">
                    <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode="contain" />
                    <Text className="text-2xl text-white text-semibold font-psemibold mt-10">Log in to Aora</Text>

                    <FormField
                        title={"Email"}
                        value={form.email}
                        handleChange={(text) => setForm({ ...form, email: text })}
                        otherStyles={"mt-7"}
                        keyboardType="email-address"
                    />
                    <FormField
                        title={"Password"}
                        value={form.password}
                        handleChange={(text) => setForm({ ...form, password: text })}
                        otherStyles={"mt-7"}
                    />
                    <CustomButton
                        title={"Sign In"}
                        handlePress={submit}
                        containerStyles={"mt-7"}
                        isLoading={isSubmiting}
                    />
                    <View className="flex-row justify-center gap-2 pt-5">
                        <Text className="text-lg text-gray-100 font-pregular">Don't have account?</Text>
                        <Link href={"/sign-up"} className="text-lg font-psemibold text-secondary">
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
