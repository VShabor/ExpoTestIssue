import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const EvaluationStar = ({ evaluationNumber }) => {
    return (
        <View style={styles.evaluationStar}>
            <Text style={styles.evaluationNumber}>{evaluationNumber}</Text>
            <Entypo name="star" size={20} color={'black'} />
        </View>
    );
};

const styles = StyleSheet.create({
    evaluationStar: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        right: 20,
        top: 20,
    },
    evaluationNumber: {
        marginRight: 6,
    }
});

export default EvaluationStar;