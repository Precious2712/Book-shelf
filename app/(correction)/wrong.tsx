import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useProduct } from '@/context/useContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { db } from "@/lib/firebase"
import { doc, setDoc } from 'firebase/firestore';

export default function Wrong() {
    const { wrongAnswers, userId } = useProduct();

    if (wrongAnswers.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No wrong answers 🎉</Text>
            </View>
        );
    }

    const total = async () => {
        if (!userId) return;

        await setDoc(
            doc(db, 'total-wrong-answer', userId),
            {
                userId,
                wrongAnswers,
                createdAt: new Date(),
            }
        );
    };

    useEffect(() => {
        if (!userId || wrongAnswers.length === 0) return;
        total();
    }, [userId, wrongAnswers]);

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                
                <View style={[styles.row, styles.header]}>
                    <Text style={[styles.cell, styles.no]}>No</Text>
                    <Text style={[styles.cell, styles.question]}>Question</Text>
                    <Text style={[styles.cell, styles.option]}>Correct</Text>
                    <Text style={[styles.cell, styles.icon]}></Text>
                </View>

                
                <FlatList
                    data={wrongAnswers}
                    keyExtractor={(item) => item.id.toString()}
                    nestedScrollEnabled
                    renderItem={({ item, index }) => (
                        <View style={styles.row}>
                            <Text style={[styles.cell, styles.no]}>
                                {index + 1}
                            </Text>

                            <Text style={[styles.cell, styles.question]}>
                                {item.question}
                            </Text>

                            <Text style={[styles.cell, styles.option]}>
                                {item.options[item.correctAnswer]}
                            </Text>

                            <View style={[styles.cell, styles.icon]}>
                                <IconSymbol
                                    name="xmark.circle.fill"
                                    size={20}
                                    color="red"
                                />
                            </View>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        padding: 16,
        minWidth: 700, 
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        paddingVertical: 10,
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#f5f5f5',
    },
    cell: {
        paddingHorizontal: 8,
    },
    no: {
        width: 60,
        fontWeight: 'bold',
    },
    question: {
        width: 400, 
    },
    option: {
        width: 180,
        color: 'red',
        fontWeight: '500',
    },
    icon: {
        width: 60,
        alignItems: 'center',
    },
});
