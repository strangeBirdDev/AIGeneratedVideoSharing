import { View, Text, SafeAreaView, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";

import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import { getUserSavedPosts } from "../../lib/appwrite";

const Bookmark = () => {
    const { user } = useGlobalContext();
    const { data: posts, refetch } = useAppwrite(() => getUserSavedPosts(user?.$id));

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        console.log("Refetching data...");
        await refetch();
        console.log(posts);
        setRefreshing(false);
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={() => (
                    <View className="my-6 px-4 space-y-6">
                        <Text className="text-2xl font-psemibold text-white">Saved Videos</Text>
                        <View className="mt-6 mb-8">
                            <SearchInput placeholder={"Search your saved videos"} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </SafeAreaView>
    );
};

export default Bookmark;
