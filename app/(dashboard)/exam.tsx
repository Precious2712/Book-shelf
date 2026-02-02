import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ActivityIndicator,
} from "react-native"
import { db } from "@/lib/firebase"
import { ThemedView } from "@/components/themed-view"
import { useProduct } from "@/context/useContext"

type Question = {
    id: number
    question: string
    options: Record<string, string>
    correctAnswer: string
}

type Exam = {
    title: string
    totalTime: number
    perQuestionTime: number
    questions: Question[]
}

export default function ExamPage() {
    const { setRightAnswers, setWrongAnswers } = useProduct();

    const [exam, setExam] = useState<Exam | null>(null)
    const [loading, setLoading] = useState(true)

    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})

    const [examTime, setExamTime] = useState(0)
    const [questionTime, setQuestionTime] = useState(0)

    const [finished, setFinished] = useState(false)
    const [score, setScore] = useState(0)

    const restartExam = () => {
        if (!exam) return

        setFinished(false)
        setScore(0)
        setCurrentIndex(0)
        setAnswers({})
        setExamTime(exam.totalTime)
        setQuestionTime(exam.perQuestionTime)
    }



    useEffect(() => {
        const fetchExam = async () => {
            const ref = doc(db, "Book", "frontend_exam_v1")
            const snap = await getDoc(ref)

            if (snap.exists()) {
                const data = snap.data() as Exam
                setExam(data)
                setExamTime(data.totalTime)
                setQuestionTime(data.perQuestionTime)
            }
            setLoading(false)
        }

        fetchExam()
    }, [])


    useEffect(() => {
        if (!exam || finished) return
        if (examTime <= 0) {
            finishExam()
            return
        }

        const timer = setInterval(() => {
            setExamTime((t) => t - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [examTime, exam, finished])


    useEffect(() => {
        if (!exam || finished) return
        if (questionTime <= 0) {
            nextQuestion()
            return
        }

        const timer = setInterval(() => {
            setQuestionTime((t) => t - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [questionTime, exam, finished])


    const selectAnswer = (option: string) => {
        setAnswers((prev) => ({
            ...prev,
            [currentIndex]: option,
        }))
    }

    const nextQuestion = () => {
        if (!exam) return
        if (currentIndex < exam.questions.length - 1) {
            setCurrentIndex((i) => i + 1)
            setQuestionTime(exam.perQuestionTime)
        } else {
            finishExam()
        }
    }

    const prevQuestion = () => {
        if (!exam) return
        if (currentIndex > 0) {
            setCurrentIndex((i) => i - 1)
            setQuestionTime(exam.perQuestionTime)
        }
    }

    const finishExam = () => {
        if (!exam) return

        let total = 0
        exam.questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) total++
        })

        const right = exam.questions.filter((q, index) => {
            return answers[index] === q.correctAnswer;
        });

        const wrong = exam.questions.filter((q, index) => {
            return answers[index] && answers[index] !== q.correctAnswer;
        });

        setRightAnswers(right);
        setWrongAnswers(wrong);

        setScore(total)
        setFinished(true)
    }

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60)
        const s = sec % 60
        return `${m}:${s.toString().padStart(2, "0")}`
    }


    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text style={styles.loadingText}>Loading exam...</Text>
            </View>
        )
    }

    if (!exam) {
        return (
            <View style={styles.center}>
                <Text>Exam not found</Text>
            </View>
        )
    }

    if (finished) {
        return (
            <ThemedView style={styles.center}>
                <View style={styles.resultCard}>
                    <Text style={styles.resultTitle}>Exam Finished</Text>
                    <Text style={styles.resultSub}>{exam.title}</Text>
                    <Text style={styles.resultScore}>
                        Score: {score} / {exam.questions.length}
                    </Text>
                </View>

                <Pressable onPress={restartExam} style={styles.restartBtn}>
                    <Text style={styles.restartText}>Restart Exam</Text>
                </Pressable>

            </ThemedView>
        )
    }

    const question = exam.questions[currentIndex]


    return (
        <ThemedView  style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>{exam.title}</Text>
                <View style={styles.timerBox}>
                    <Text style={styles.timerLabel}>Total Time</Text>
                    <Text style={styles.timerValue}>{formatTime(examTime)}</Text>
                </View>
            </View>


            <View style={styles.meta}>
                <Text style={styles.metaText}>
                    Question {currentIndex + 1} / {exam.questions.length}
                </Text>
                <Text style={styles.questionTimer}>{questionTime}s</Text>
            </View>


            <Text style={styles.questionText}>{question.question}</Text>


            {Object.entries(question.options).map(([key, value]) => {
                const selected = answers[currentIndex] === key
                return (
                    <Pressable
                        key={key}
                        onPress={() => selectAnswer(key)}
                        style={[
                            styles.option,
                            selected && styles.optionSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selected && styles.optionTextSelected,
                            ]}
                        >
                            {key}. {value}
                        </Text>
                    </Pressable>
                )
            })}


            <View style={styles.nav}>
                <Pressable
                    onPress={prevQuestion}
                    disabled={currentIndex === 0}
                    style={[
                        styles.navBtn,
                        styles.prevBtn,
                        currentIndex === 0 && styles.disabledBtn,
                    ]}
                >
                    <Text style={styles.navText}>Previous</Text>
                </Pressable>

                <Pressable
                    onPress={nextQuestion}
                    style={[styles.navBtn, styles.nextBtn]}
                >
                    <Text style={[styles.navText, styles.nextText]}>
                        {currentIndex === exam.questions.length - 1 ? "Submit" : "Next"}
                    </Text>
                </Pressable>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F3F4F6",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -10
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        flex: 1,
        marginRight: 10,
    },
    timerBox: {
        alignItems: "flex-end",
    },
    timerLabel: {
        fontSize: 12,
        color: "#555",
    },
    timerValue: {
        fontSize: 18,
        fontWeight: "700",
    },
    meta: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    metaText: {
        fontSize: 14,
    },
    questionTimer: {
        fontSize: 16,
        fontWeight: "700",
        color: "#DC2626",
    },
    questionText: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
    },
    option: {
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        backgroundColor: "#FFF",
        marginBottom: 12,
    },
    optionSelected: {
        backgroundColor: "#2563EB",
        borderColor: "#2563EB",
    },
    optionText: {
        fontSize: 16,
    },
    optionTextSelected: {
        color: "#FFF",
        fontWeight: "600",
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    navBtn: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    prevBtn: {
        backgroundColor: "#E5E7EB",
    },
    nextBtn: {
        backgroundColor: "#2563EB",
    },
    navText: {
        fontSize: 16,
        fontWeight: "600",
    },
    nextText: {
        color: "#FFF",
    },
    disabledBtn: {
        opacity: 0.5,
    },
    resultCard: {
        backgroundColor: "#FFF",
        padding: 30,
        borderRadius: 16,
        width: "85%",
        alignItems: "center",
        elevation: 4,
    },
    resultTitle: {
        fontSize: 26,
        fontWeight: "800",
        marginBottom: 10,
    },
    resultSub: {
        fontSize: 16,
        marginBottom: 10,
    },
    resultScore: {
        fontSize: 22,
        fontWeight: "700",
    },
    restartBtn: {
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: "#16A34A",
        borderRadius: 10,
    },
    restartText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

})
