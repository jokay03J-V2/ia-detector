import { Button, StyleSheet, Text, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSetAtom } from "jotai"
import { manipulateAsync } from "expo-image-manipulator";
import { pictureURIAtom } from "../atoms/pictureURI";

export default function Home() {
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [cameraGranted, setCameraGranted] = useState<boolean>(false);
    const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
    const [cameraReady, setCameraReady] = useState<boolean>(false);
    // Camera must have ref for take capture
    const cameraRef = useRef<Camera | null>(null);
    const router = useRouter();
    const isFocused = useIsFocused();
    const setPictureURI = useSetAtom(pictureURIAtom);

    // Check if user has already granted camera permission
    useFocusEffect(useCallback(() => {
        if (permission && permission.granted) {
            setCameraGranted(true);
        }
    }, [permission]))

    async function handleRequestPermission() {
        // request permission, focus effect should update granted camera var
        await requestPermission();
    }

    async function handleCapture() {
        if (!cameraReady || !cameraRef.current) return;
        // take picture
        const picture = await cameraRef.current.takePictureAsync({ quality: 1 });
        const compressedPicture = await manipulateAsync(picture.uri, [], { compress: 0, base64: true })
        setPictureURI("data:image/jpeg;base64," + compressedPicture.base64!);
        router.push("/result");
    }

    function handleFlip() {
        setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back);
    }

    if (!cameraGranted) return (<View><Button onPress={handleRequestPermission} title="Request Permission" /></View>)

    return (
        <View style={styles.view}>
            {/* Unmount camera when route is not focused */}
            {isFocused && <Camera ref={cameraRef} type={cameraType} onCameraReady={() => setCameraReady(true)} style={styles.camera} />}
            <Button title="Flip" onPress={handleFlip} />
            <Button title="Take capture" onPress={handleCapture} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        display: "flex"
    },
    camera: {
        width: 500,
        height: 500
    }
});