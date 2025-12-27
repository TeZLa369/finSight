import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import ExpoCheckbox from 'expo-checkbox/build/ExpoCheckbox';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Animated } from 'react-native'
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
const { height, width } = Dimensions.get("window");


const SignIn = () => {

    const isAnimating = useRef(false);
    const [isSignUp, setIsSignup] = useState(false);
    const insets = useSafeAreaInsets();
    const [checked, setchecked] = useState(false)

    const rotation = useRef(new Animated.Value(0)).current;
    const fade = useRef(new Animated.Value(1)).current;


    const rotateForm = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;

        Animated.sequence([
            Animated.parallel([
                Animated.timing(rotation, {
                    toValue: 1,
                    duration: 350,
                    useNativeDriver: true,
                }),
                Animated.timing(fade, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            setIsSignup(prev => !prev);

            rotation.setValue(0);
            Animated.timing(fade, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                isAnimating.current = false;
            });
        });
    };

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });


    return (
        <LinearGradient colors={["#0C1222", "#05080F"]} style={[styles.container,]}>
            <BlurView intensity={50} tint='dark' style={[styles.glass, { paddingTop: insets.top }]}>
                //! HEADING TXT
                <Animated.View style={{ opacity: fade, }}>
                    {isSignUp ? (
                        <Text style={styles.headingTxt}>CREATE{"\n"} AN ACCOUNT</Text>
                    ) : (
                        <Text style={styles.headingTxt}>LOGIN TO {"\n"}YOUR ACCOUNT</Text>
                    )}
                </Animated.View>

                //! BLOBS
                {/* <View style={styles.sideIconContainer}> */}
                <Image source={require("../assets/icons/side_icons.png")}
                    style={[styles.sideIcon, { left: -150, top: 50 }]} />
                <Image source={require("../assets/icons/side_icons.png")}
                    style={[styles.sideIcon, { right: -150, top: 500 }]} />
                {/* </View> */}


                 //! FORM
                <Animated.View style={{ opacity: fade, transform: [{ rotateY: rotateInterpolate }] }}>
                    {isSignUp ?
                        (<SignUpForm onSwitch={rotateForm} />) :
                        (<SignInForm onSwitch={rotateForm} />)
                    }

                </Animated.View>
            </BlurView>
        </LinearGradient >
    )
}

export default SignIn
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headingTxt: {
        color: "#ffffff",
        fontWeight: 800,
        fontSize: 30,
        textAlign: "center",
    },

    glass: {
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
        flex: 1,

    },
    sideIcon: {
        height: 300,
        width: 300,
        position: "absolute",
    },


})