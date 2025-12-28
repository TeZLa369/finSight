import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ExpoCheckbox from 'expo-checkbox/build/ExpoCheckbox';
import { auth } from './firebaseConfig';
import { GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from 'react-native-toast-notifications';
const { height, width } = Dimensions.get("window");
import { GoogleSignin, isSuccessResponse, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import { FacebookAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';



const SignInForm = ({ onSwitch }) => {
    const [checked, setchecked] = useState(false);
    const [passShown, setpassShown] = useState(false);
    const [loading, setloading] = useState(false);
    const [userEmail, setuserEmail] = useState("");
    const [userPass, setuserPass] = useState("");
    const [googleSignin, setGoogleSignin] = useState(false)


    const toast = useToast();

    //! SIGN IN
    async function signInEmail(email, password) {
        if (userPass === "" && userEmail === "") {
            toast.show("Enter credentials", {
                type: "warning",
            });
            return;
        }
        else if (userPass === "") {
            toast.show("Enter password!", {
                type: "warning"
            });
            return;
        }
        else if (userEmail == "") {
            toast.show("Enter email!", {
                type: "warning"
            });
            return;
        }

        setloading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.show("Login Successful", {
                type: "success",
                placement: "bottom"
            })
        } catch (error) {
            let message = "Login failed";

            console.log(error.code)
            if (error.code === "auth/user-not-found") {
                message = "User not found";
            } else if (error.code === "auth/wrong-password") {
                message = "Wrong password";
            } else if (error.code === "auth/invalid-email") {
                message = "Invalid email";
            }

            toast.show(message, {
                type: "warning",
            });
        }
        finally {
            setloading(false);
        }
    }



    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "448319592790-ccojs2qe0fn2ie9rm6815enls2l2jqdg.apps.googleusercontent.com",
            offlineAccess: true,
        });
    }, []);



    //! GOOGLE SIGN IN
    async function handleGoogleSignIn() {

        try {
            setGoogleSignin(true);
            console.log("STEP 1: starting");
            await GoogleSignin.hasPlayServices();
            console.log("STEP 2: play services OK");
            const response = await GoogleSignin.signIn();
            console.log("STEP 3: response", response);

            // const credential = GoogleAuthProvider.credential(response.idToken);
            // await signInWithCredential(auth, credential);

            if (isSuccessResponse(response)) {
                toast.show("Login Successful", {
                    type: "success",
                    placement: "bottom"
                })
            }
            else {
                toast.show("User Cancelled the Login", {
                    type: "warning",
                    placement: "bottom"
                })
            }

            setGoogleSignin(false);
        } catch (error) {
            console.log("ERROR CAUGHT:", error, error.code)
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        toast.show("Sign in already in progress", {
                            type: "warning",
                            placement: "bottom"
                        })
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        toast.show("Play services not available", {
                            type: "warning",
                            placement: "bottom"
                        })

                        break;
                    default:
                        toast.show("Error: " + error.code, {
                            type: "warning",
                            placement: "bottom"
                        })
                }
            }
            else {
                toast.show("An error occurred", {
                    type: "warning",
                    placement: "bottom"
                })
            }

            setGoogleSignin(false);

        }
    }


    // ! FACEBOOK
    async function onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return signInWithCredential(getAuth(), facebookCredential);
    }



    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTxt}>Enter your login information</Text>
            <View style={styles.formInputMainContainer}>

                {/* //! INPUTS*/}
                <View style={styles.formInputContainer}>
                    <Ionicons color={"#E5E7EB"} style={{ marginRight: 8 }} name='mail-outline' size={25} />
                    <TextInput value={userEmail} onChangeText={(email) => { setuserEmail(email) }}
                        textContentType='emailAddress'
                        placeholderTextColor={"#E5E7EB"}
                        style={styles.formInput} placeholder='Email' />
                </View>


                <View style={[styles.formInputContainer, { justifyContent: "space-between" }]}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <Ionicons color={"#E5E7EB"} name='lock-closed-outline' size={25} />
                        <TextInput value={userPass}
                            onChangeText={(pass) => { setuserPass(pass) }}
                            textContentType='password'
                            secureTextEntry={!passShown}
                            placeholderTextColor={"#E5E7EB"} style={styles.formInput}
                            placeholder='Password' />
                    </View>
                    <TouchableOpacity onPress={() => { setpassShown(!passShown) }}>
                        <Ionicons color={"#E5E7EB"} name={passShown ? "eye" : 'eye-off-outline'} size={25} />
                    </TouchableOpacity>
                </View>
            </View>




            {/*  //! REMEMBER and FORGET PASS */}
            <View style={styles.rememberForgotContainer}>
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <ExpoCheckbox color={"#4F46E5"} value={checked} onValueChange={() => setchecked(!checked)} />
                    <Text style={{ color: "#B4B4B4FF" }}>Remember me</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: "#B4B4B4FF" }}>Forgot Password?</Text></TouchableOpacity>
            </View>



            {/* //!LOGIN BTN */}
            <TouchableOpacity onPress={() => { signInEmail(userEmail, userPass) }}>
                <LinearGradient style={styles.btn} colors={["#4F46E5", "#6366F1"]}>
                    <Text style={styles.btnTxt}>{loading ? "LOGGING IN..." : "LOGIN"}</Text></LinearGradient>
            </TouchableOpacity>

            {/* //! OR DIVIDER   */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
                <View style={styles.hrLine} />
                <Text style={{ marginHorizontal: 10, fontSize: 20, color: "#A2A2A2FF" }}>
                    Or
                </Text>
                <View style={styles.hrLine} />
            </View>



            {/* //! GOOGLE or FACEBOOK  */}
            <View style={styles.googleFacebook}>
                <TouchableOpacity style={styles.socialBtnContainer} onPress={() => { handleGoogleSignIn() }} >
                    <Image source={require("../assets/icons/google.png")} style={[styles.icon, { height: 30, width: 30 }]} />
                    <Text style={styles.socialTxt}>GOOGLE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.socialBtnContainer, {
                    paddingLeft: 28,
                    paddingRight: 28,
                }]}>
                    <Image source={require("../assets/icons/facebook.png")} style={styles.icon} />
                    <Text style={styles.socialTxt}>FACEBOOK</Text>
                </TouchableOpacity>
            </View>

            {/* //! SIGN UP */}
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpTxt}>Don't have an account?</Text>
                <TouchableOpacity onPress={onSwitch}>
                    <Text style={[styles.signUpTxt, { color: "#4F46E5" }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default SignInForm;

const styles = StyleSheet.create({
    formContainer: {
        marginTop: height * .05,
        backgroundColor: "#0C122259",
        height: height,
        borderRadius: 20,

    },
    formTxt: {
        fontSize: 18,
        color: "#E5E7EB",
        textAlign: "center",
        marginTop: 18
    },
    formInputMainContainer: {
        marginTop: 20,
        padding: 18,
        gap: 12
    },

    formInputContainer: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderRadius: 18,
        alignItems: "center",
        padding: 8,
    },

    formInput: {
        color: "#ffffff",
        maxWidth: width,
        width: width * 0.6
    },

    rememberForgotContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 12
    },
    btn: {
        padding: 23,
        alignItems: "center",
        marginRight: 30,
        marginLeft: 30,
        marginTop: 28,
        borderRadius: 12
    },
    btnTxt: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 700
    },
    hrLine: {
        flex: height,
        height: 1,
        backgroundColor: "#A2A2A2FF",
    },
    googleFacebook: {
        flexDirection: "row",
        marginTop: 30,
        justifyContent: "center",
        gap: 8,

    },
    socialBtnContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        padding: 12,
        borderRadius: 12,
        paddingLeft: 30,
        paddingRight: 30,
        gap: 8,

    },
    socialTxt: {
        color: "#ffffff"
    },
    icon: {
        height: 35,
        width: 35
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 50,
        gap: 8
    },
    signUpTxt: {
        color: "#ffffff"
    }
})