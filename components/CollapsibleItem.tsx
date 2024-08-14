import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import EvaluationStar from "./EvaluationStar";
import Entypo from '@expo/vector-icons/Entypo';
import { UserItem } from "./SearchGitUsers";

type RepositoryItem = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: UserItem;
    html_url: string;
    description: string | null;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: string | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: "public" | "private" | "internal";
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
};

const CollapsibleView = ({ username }: { username: string }) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [repos, setRepos] = useState<RepositoryItem[]>([]);
    const [isLoadedRepos, setIsLoadedRepos] = useState<boolean>(false);

    useEffect(() => {
        if (username && collapsed) {
            fetchRepos(username);
        }
    }, [username, collapsed]);

    const toggleCollapse = () => {
        setCollapsed(prevCollapsed => !prevCollapsed);
    };

    const fetchRepos = (username: string) => {
        setIsLoadedRepos(false);

        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                if (!response.ok) {
                    // Create and throw a new error if the response is not OK
                    return Promise.reject(new Error('Network response was not ok'));
                }
                return response.json();
            })
            .then(data => {
                setRepos(data);
            })
            .catch(error => {
                console.error('Failed to fetch repositories:', error);
                setRepos([]);
            })
            .finally(() => {
                setIsLoadedRepos(true);
            });
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleCollapse}>
                <View style={styles.collapsibleContainer}>
                    <Text style={styles.title}>{username}</Text>
                    <Entypo name={collapsed ? "chevron-down" : "chevron-up"} size={20} color="black" />
                </View>
            </TouchableOpacity>
            {collapsed && (
                <View>
                    {repos.length ? (
                        repos.map((repo) => (
                            <View style={styles.subPanel} key={repo.node_id}>
                                <EvaluationStar evaluationNumber={repo.stargazers_count} />
                                <Text style={styles.subPanelTitle}>{repo.name}</Text>
                                {repo.description && <Text>{repo.description}</Text>}
                            </View>
                        ))
                    ) : (
                        <View style={styles.subPanel}>
                            {isLoadedRepos ? (
                                <Text style={styles.subPanelTitle}>No repositories</Text>
                            ) : (
                                <View style={styles.subPanelLoader}>
                                    <ActivityIndicator />
                                </View>
                            )}
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    collapsibleContainer: {
        backgroundColor: '#F2F2F2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        height: 46,
        margin: 12,
    },
    title: {
        fontSize: 16,
    },
    subPanel: {
        marginLeft: 42,
        marginRight: 12,
        marginBottom: 6,
        marginTop: 6,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#E0E0E0',
        minHeight: 120,
    },
    subPanelTitle: {
        marginTop: 22,
        fontSize: 16,
        width: '80%',
        fontWeight: 'bold',
    },
    subPanelLoader: {
        marginTop: 50,
    }
});

export default CollapsibleView;
