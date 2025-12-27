import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ExpoCheckbox from 'expo-checkbox/build/ExpoCheckbox';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from 'react-native-toast-notifications';
import { auth } from './firebaseConfig';
const { height, width } = Dimensions.get("window");



const SignUpForm = ({ onSwitch }) => {

  const [passShown, setpassShown] = useState(false);
  const [loading, setloading] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [userPass, setuserPass] = useState("");

  const toast = useToast();

  {/* // ! SIGN UP */ }
  async function signUpEmail(email, password) {
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
      await createUserWithEmailAndPassword(auth, email, password);
      toast.show("Signup Successful", {
        type: "success",
        placement: "bottom"
      })
    } catch (error) {
      let message = "Signup failed";

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



  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTxt}>Enter your sign up information</Text>
      <View style={styles.formInputMainContainer}>

         {/* //! INPUTS */}
        <View style={styles.formInputContainer}>
          <Ionicons color={"#E5E7EB"} style={{ marginRight: 8 }} name='mail-outline' size={25} />
          <TextInput value={userEmail} onChangeText={(email) => { setuserEmail(email) }} textContentType='emailAddress' placeholderTextColor={"#E5E7EB"} style={styles.formInput} placeholder='Email' />
        </View>


        <View style={[styles.formInputContainer, { justifyContent: "space-between" }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons color={"#E5E7EB"} name='lock-closed-outline' size={25} />
            <TextInput value={userPass} onChangeText={(pass) => { setuserPass(pass) }} textContentType='password' placeholderTextColor={"#E5E7EB"} style={styles.formInput} placeholder='Password' />
          </View> <TouchableOpacity onPress={() => { setpassShown(!passShown) }}>
            <Ionicons color={"#E5E7EB"} name={passShown ? "eye" : 'eye-off-outline'} size={25} />
          </TouchableOpacity> </View>
      </View>


       {/* //!SignUP BTN */}
      <TouchableOpacity onPress={() => { signUpEmail(userEmail, userPass) }}>
        <LinearGradient style={styles.btn} colors={["#4F46E5", "#6366F1"]}>
          <Text style={styles.btnTxt}>{loading ? "SIGNING UP..." : "SIGN UP"}</Text></LinearGradient>
      </TouchableOpacity>

       {/* //! OR DIVIDER */}
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
        <View style={styles.hrLine} />
        <Text style={{ marginHorizontal: 10, fontSize: 20, color: "#A2A2A2FF" }}>
          Or
        </Text>
        <View style={styles.hrLine} />
      </View>

      {/* //! GOOGLE or FACEBOOK */}
      <View style={styles.googleFacebook}>
        <TouchableOpacity style={styles.socialBtnContainer}>
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
        <Text style={styles.signUpTxt}>Already have an account?</Text>
        <TouchableOpacity onPress={onSwitch}>
          <Text style={[styles.signUpTxt, { color: "#4F46E5" }]}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

export default SignUpForm

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
    gap: 8


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