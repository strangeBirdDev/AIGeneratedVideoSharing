import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ResizeMode, Video } from "expo-av";

import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";
import { savePost, unsavePost } from "../lib/appwrite";

const VideoCard = ({ video: { $id, title, thumbnail, video, creator, liked } }) => {
    const { user } = useGlobalContext();
    const [play, setPlay] = useState(false);
    const [isLiked, setIsLiked] = useState(liked.some((item) => item?.$id === user?.$id));

    return (
        <View className=" items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary p-0.5 items-center justify-center">
                        <Image
                            source={{ uri: creator?.avatar }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {creator?.username}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    className="pt-2"
                    onPress={() => {
                        isLiked ? unsavePost(user?.$id, $id, liked) : savePost(user?.$id, $id, liked);
                        setIsLiked(!isLiked);
                    }}
                >
                    <Image
                        source={icons.bookmark}
                        className="w-5 h-5"
                        tintColor={isLiked && "#FFA001"}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {play ? (
                <Video
                    source={{ uri: video }}
                    className="w-full h-60 rounded-xl mt-3"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={(status) => {
                        if (status.didJustFinish) {
                            setPlay(false);
                        }
                    }}
                />
            ) : (
                <TouchableOpacity
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;
