import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.lazydev.aora",
    projectId: "66891e8c002d8800d489",
    databaseId: "66892ac3002f39d4ac3a",
    userCollectionId: "66892afb00011cd2b32e",
    videoCollectionId: "66892b1b0013318c4a88",
    storageId: "66892d1d0006f3941577",
};

// Init your React Native SDK
const client = new Client();
client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform); // Your application ID or bundle ID.

const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);

export const createUser = async (email, password, username) => {
    // Register User
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw Error(error);

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    } catch (error) {
        throw new Error(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
            Query.equal("accountId", currentAccount.$id),
        ]);

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
};

export const signOut = async () => {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
            Query.orderDesc("$createdAt"),
        ]);

        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
            Query.orderDesc("$createdAt"),
            Query.limit(7),
        ]);

        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
            Query.search("title", query),
        ]);

        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
            Query.equal("creator", userId),
            Query.orderDesc("$createdAt"),
        ]);

        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getUserSavedPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [
            Query.contains("liked", [userId]),
            Query.orderDesc("$createdAt"),
        ]);

        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const savePost = async (userId, postId, liked) => {
    try {
        const updatedPost = await databases.updateDocument(config.databaseId, config.videoCollectionId, postId, {
            liked: [...liked, userId],
        });

        return updatedPost;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const unsavePost = async (userId, postId, liked) => {
    try {
        const newLiked = liked.filter((item) => item?.$id !== userId);
        const updatedPost = await databases.updateDocument(config.databaseId, config.videoCollectionId, postId, {
            liked: [...newLiked],
        });

        return updatedPost;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(config.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, "top", 100);
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const uploadFile = async (file, type) => {
    if (!file) return;

    // const { mimeType, ...rest } = file;
    // const asset = { type: mimeType, ...rest };

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    };

    try {
        const uploadedFile = await storage.createFile(config.storageId, ID.unique(), asset);

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);

        const newPost = await databases.createDocument(config.databaseId, config.videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            creator: form.userId,
        });

        return newPost;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
