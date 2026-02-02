import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useProduct } from '@/context/useContext';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { db } from "@/lib/firebase"
import { doc, setDoc } from 'firebase/firestore';
import { ThemedView } from '@/components/themed-view';

export default function Right() {
    const { rightAnswers, userId } = useProduct();

    if (rightAnswers.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No correct answers yet</Text>
            </View>
        );
    }

    const total = async () => {
        if (!userId) return;

        await setDoc(
            doc(db, 'total-right-answer', userId),
            {
                userId,
                rightAnswers,
                createdAt: new Date(),
            }
        );
    };

    useEffect(() => {
        if (!userId || rightAnswers.length === 0) return;
        total();
    }, [userId, rightAnswers]);



    return (
        <ThemedView  style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.container}>
                   
                    <View style={[styles.row, styles.header]}>
                        <Text style={[styles.cell, styles.no]}>No</Text>
                        <Text style={[styles.cell, styles.question]}>Question</Text>
                        <Text style={[styles.cell, styles.option]}>Selected</Text>
                        <Text style={[styles.cell, styles.icon]}></Text>
                    </View>

                    
                    <FlatList
                        data={rightAnswers}
                        keyExtractor={(item) => item.id.toString()}
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
                                        name="checkmark.circle.fill"
                                        size={20}
                                        color="green"
                                    />
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </ThemedView>
    );
}



const styles = StyleSheet.create({
    wrapper: {
        width: '85%',        
        alignSelf: 'center', 
    },

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
        color: 'green',
        fontWeight: '500',
    },

    icon: {
        width: 60,
        alignItems: 'center',
    },
});

