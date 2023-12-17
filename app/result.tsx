import { Stack } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useAtomValue } from "jotai";
import { pictureURIAtom } from "../atoms/pictureURI";

export default function Result() {
    const pictureURI = useAtomValue(pictureURIAtom);

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
        const response = await fetch("https://api.ocr.space/parse/image", {
            headers: {
                apiKey: process.env.EXPO_PUBLIC_API_KEY as string
            }, body, method: "POST"
        });

        const responseData = await response.json();
        console.log(responseData);
    }

    return (
        <View>
            <Stack.Screen options={{ title: "Resultat" }} />
            {pictureURI && <Image style={styles.camera} source={{ uri: pictureURI, height: styles.camera.height, width: styles.camera.width }} onError={(err) => console.error(err)} />}
            <Button title="Hande OCR" onPress={handleOCR} />
        </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        height: 500,
        width: 500
    }
})