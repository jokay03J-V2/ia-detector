import { useRouter } from "expo-router";
import { Appbar, Icon } from "react-native-paper";
import { } from "expo-router";
import { useAtom } from "jotai";
import { ThemeMode, themeModeAtom } from "../atoms/themeMode";

export default function Header({ title }: { title?: string }) {
    const [themeMode, setThemeMode] = useAtom(themeModeAtom);
    const router = useRouter();

    function backAction() {
        if (!router.canGoBack()) return;
        router.back();
    }

    return (
        <Appbar.Header>
            {router.canGoBack() && <Appbar.BackAction onPress={backAction} />}
            <Appbar.Content title={title} />
            <Appbar.Action icon={themeMode === ThemeMode.Light ? 'brightness-4' : 'brightness-6'} onPress={() => setThemeMode((t) => t === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark)} />
        </Appbar.Header>
    )
}