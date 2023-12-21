import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text style={styles.text}>Votre page est introuvable.</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center"
  }
})