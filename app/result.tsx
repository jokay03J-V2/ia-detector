import { Stack } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useAtomValue } from "jotai";
import { pictureURIAtom } from "../atoms/pictureURI";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { useState } from "react";

export default function Result() {
    const pictureURI = useAtomValue(pictureURIAtom);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    async function handleOCR() {
        if (!pictureURI) return;
        // Fetch image and get blob
        const body = new FormData();
        body.append("base64image", pictureURI);
        body.append("language", "fre");
        body.append("scale", "true");
        body.append("detectOrientation", "true");
        body.append("OCREngine", "2");
        console.log("loading");
        setLoading(true);
        const response = await fetch("https://api.ocr.space/parse/image", {
            headers: {
                apiKey: process.env.EXPO_PUBLIC_API_KEY as string
            }, body, method: "POST"
        });

        const responseData = await response.json();
        setLoading(false);
        if (response.ok && responseData.ParsedResults[0].ParsedText) {
            setResult(responseData.ParsedResults[0].ParsedText);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.container}>
                <Stack.Screen options={{ title: "Resultat" }} />
                {/* {pictureURI && <Image style={styles.camera} source={{ uri: pictureURI, height: styles.camera.height, width: styles.camera.width }} onError={(err) => console.error(err)} />} */}
                <Button onPress={handleOCR}>Hande OCR</Button>
                {loading && <ActivityIndicator />}
                {result && <TextInput value={result} label={"Resultat"} />}</View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    camera: {
        height: 500,
        width: 500
    },
    container: {
        flex: 1
    }
})