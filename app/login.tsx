import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { Link } from 'expo-router';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);

        console.log({ email, password });

        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    const isDisabled = !email || !password || loading;

    return (
        <ThemedView safe={false} style={styles.container}>
            <Text style={styles.welcome}>Welcome back 👋</Text>
            <Text style={styles.title}>Log in to your account</Text>

            {/* Email */}
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    secureTextEntry
                    style={styles.input}
                />
            </View>

            {/* Button */}
            <TouchableOpacity
                activeOpacity={0.85}
                disabled={isDisabled}
                onPress={handleLogin}
                style={[
                    styles.button,
                    isDisabled && styles.buttonDisabled,
                ]}
            >
                {loading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>Log In</Text>
                )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Footer */}
            <Text style={styles.footerText}>
                Don’t have an account?{' '}
                <Link href="/" style={styles.footerLink}>
                    Sign up
                </Link>
            </Text>
        </ThemedView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 28,
    },

    welcome: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },

    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 24,
    },

    inputWrapper: {
        marginBottom: 16,
    },

    label: {
        fontSize: 13,
        marginBottom: 6,
        color: '#374151',
    },

    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 13,
        fontSize: 16,
        backgroundColor: '#ffffff',
    },

    button: {
        backgroundColor: '#1e40af',
        paddingVertical: 15,
        borderRadius: 14,
        marginTop: 8,
        alignItems: 'center',
        shadowColor: '#1e40af',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },

    buttonDisabled: {
        backgroundColor: '#9ca3af',
        shadowOpacity: 0,
        elevation: 0,
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },

    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 22,
    },

    footerText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },

    footerLink: {
        color: '#1e40af',
        fontWeight: '600',
    },
});
