import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import Header from '../components/Header';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider as JotaiProvider, useAtomValue } from "jotai"
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Surface } from "react-native-paper";
import { ThemeMode, themeModeAtom } from '../atoms/themeMode';
import { StyleSheet } from 'react-native';
import { setBackgroundColorAsync } from "expo-system-ui";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...MaterialIcon.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function Router() {
  const themeModeSelected = useAtomValue(themeModeAtom);
  const theme = themeModeSelected === ThemeMode.Dark ? MD3DarkTheme : MD3LightTheme;

  useEffect(() => {
    (async () => {
      await setBackgroundColorAsync(theme.colors.primary);
    })
  }, [])

  return (
    <PaperProvider theme={theme}>
      <Surface style={styles.surface}>
        <Stack screenOptions={{ header: (props) => <Header title={props.options.title} /> }} />
      </Surface>
    </PaperProvider>
  )
}

function RootLayoutNav() {
  return (
    <JotaiProvider>
      <Router />
    </JotaiProvider>
  );
}

const styles = StyleSheet.create({
  surface: {
    flex: 1
  }
});