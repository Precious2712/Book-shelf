import { Link } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Toast from 'react-native-toast-message';

export default function HomeScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password) return;

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // console.log('User created:', userCredential.user);

      Toast.show({
        type: 'success',
        text1: 'Correct!',
        text2: 'You selected the right answer 🎉',
      });

    } catch (error) {
      if (error instanceof Error) {
        console.error('Signup error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }

      Toast.show({
        type: 'error',
        text1: `${error}`,
        text2: 'An error has occur 🎉',
      });

    } finally {
      setLoading(false);
    }
  };


  const isDisabled = !fullName || !email || !password || loading;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView safe={true} style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="default" style={styles.welcome}>
            Welcome 👋
          </ThemedText>

          <ThemedText type="title">
            Create your account
          </ThemedText>
        </View>

        <View style={styles.inputWrapper}>
          <ThemedText type="default" style={styles.label}>
            Full Name
          </ThemedText>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="John Doe"
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <ThemedText type="default" style={styles.label}>
            Email
          </ThemedText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <ThemedText type="default" style={styles.label}>
            Password
          </ThemedText>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            style={styles.input}
          />
          <ThemedText type="default" style={styles.helperText}>
            Password must be at least 8 characters
          </ThemedText>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={isDisabled}
          onPress={handleSignup}
          style={[
            styles.button,
            isDisabled && styles.buttonDisabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Sign Up
            </ThemedText>
          )}
        </TouchableOpacity>

        <View style={styles.divider} />

        <ThemedText type="default" style={styles.footerText}>
          Already have an account?{' '}
          <Link href="/login">
            <ThemedText type="link">Log in</ThemedText>
          </Link>
        </ThemedText>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 68,
  },

  header: {
    marginBottom: 24,
  },

  welcome: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },

  inputWrapper: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
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

  helperText: {
    fontSize: 12,
    marginTop: 6,
    color: '#6b7280',
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
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 22,
  },

  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
  },
});
