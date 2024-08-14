import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, ScrollView, Animated} from 'react-native';
import {useEffect, useState} from "react";
import CollapsibleView from "./CollapsibleItem";
import Nullable = Animated.Nullable;

export type UserItem = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    score: number;
};

type UserResponse = {
    total_count: number;
    incomplete_results: boolean;
    items: UserItem[];
};

export const SearchGitUsers =  () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isShowLabel, setIsShowLabel] = useState<boolean>(false);
    const [responseState, setResponseState] = useState<UserResponse | Nullable>(null);

    useEffect(() => {
        setIsShowLabel(false);
    }, [inputValue]);

    const showAlert = () => {
        if (inputValue) {
            setIsShowLabel(true);
            getUsers(inputValue.trim())
        }
    }

    const getUsers = (username) => {
        fetch(`https://api.github.com/search/users?q=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setResponseState(data);
            })
            .catch(error => {
                console.error('Failed to fetch users:', error);
                setResponseState(null);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TextInput
                    style={styles.input}
                    onChangeText={setInputValue}
                    value={inputValue}
                    placeholder={'Enter username'}
                />

                <Pressable style={styles.button} onPress={showAlert}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                {isShowLabel ? <Text style={styles.label}>{`Showing users for "${inputValue}"`}</Text> : null}
                {isShowLabel && !!responseState?.items && responseState?.items.length && responseState.items.map((user, index)=>
                    <View key={user.login + index}>
                        <CollapsibleView username={user.login}/>
                    </View>
                )}
                <StatusBar style="auto" />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        backgroundColor: '#F2F2F2',
        padding: 10,
    },
    label: {
        margin: 12,
        fontSize: 16,
        color: '#5B5B5B',
    },
    button: {
        height: 55,
        margin: 12,
        marginBottom: 8,
        backgroundColor: '#359DD9',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'white',
    }
});
