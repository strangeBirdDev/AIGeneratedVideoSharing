import { View, Text, SafeAreaView, Image, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const { setUser, setIsLoggedIn } = useGlobalContext();
    const [isSubmiting, setIsSubmiting] = useState(false);

    const submit = async () => {
        if (!form.email || !form.username || !form.password) {
            Alert.alert("Error", "Please fill in all the fields");
        }
        setIsSubmiting(true);

        try {
            const result = await createUser(form.email, form.password, form.username);
            setUser(result);
            setIsLoggedIn(true);
            Alert.alert("Success", "Sign up successfully, redirect to home screen!");

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
                    <Text className="text-2xl text-white text-semibold font-psemibold mt-10">Sign up to Aora</Text>

                    <FormField
                        title={"Username"}
                        value={form.username}
                        handleChange={(text) => setForm({ ...form, username: text })}
                        otherStyles={"mt-10"}
                    />
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
                        title={"Sign Up"}
                        handlePress={submit}
                        containerStyles={"mt-7"}
                        isLoading={isSubmiting}
                    />
                    <View className="flex-row justify-center gap-2 pt-5">
                        <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
                        <Link href={"/sign-in"} className="text-lg font-psemibold text-secondary">
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
