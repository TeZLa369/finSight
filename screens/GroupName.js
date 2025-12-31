import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const GroupName = () => {
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={["#0f172a", "#312e81", "#020617"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ paddingTop: insets.top + 40, paddingHorizontal: 16 }}>

                        {/* //! Header Text */}
                        <Text style={styles.screenTitle}>Create Group</Text>
                        <Text style={styles.screenSubtitle}>Start a new expense split</Text>

                        <BlurView intensity={30} tint='dark' style={styles.glassContainer}>
                            <LinearGradient
                                colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.02)"]}
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                style={styles.innerGradient}
                            >
                                <View style={styles.formContainer}>

                                    {/* //! Name */}
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.label}>GROUP NAME</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='e.g. Goa Trip 2025'
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                        />
                                    </View>

                                    {/* //! Description */}
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.label}>DESCRIPTION (OPTIONAL)</Text>
                                        <TextInput
                                            style={[styles.input, styles.textArea]}
                                            placeholder='What is this group for?'
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            multiline={true}
                                            numberOfLines={4}
                                            textAlignVertical="top"
                                        />
                                    </View>

                                    <View style={styles.btnMainContainer}>
                                        {/* //! Cancel BTN*/}
                                        <TouchableOpacity activeOpacity={0.8} style={styles.btnContainer}>
                                            <LinearGradient
                                                colors={['#F16363', '#E54646']}
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                style={styles.btnGradient}
                                            >
                                                <Text style={styles.btnTxt}>Cancel</Text>
                                                <Ionicons name="arrow-undo" size={20} color="#fff" />
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        
                                        {/* //! Continue BTN*/}
                                        <TouchableOpacity activeOpacity={0.8} style={styles.btnContainer}>
                                            <LinearGradient
                                                colors={['#6366f1', '#4f46e5']}
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                style={styles.btnGradient}
                                            >
                                                <Text style={styles.btnTxt}>Continue</Text>
                                                <Ionicons name="arrow-forward" size={20} color="#fff" />
                                            </LinearGradient>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                            </LinearGradient>
                        </BlurView>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}

export default GroupName;

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 32,
        color: "#ffffff",
        fontWeight: "800",
        marginBottom: 4,
        letterSpacing: 0.5,
    },
    screenSubtitle: {
        fontSize: 16,
        color: "rgba(255,255,255,0.6)",
        marginBottom: 30,
    },
    glassContainer: {
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    innerGradient: {
        padding: 24,
    },
    formContainer: {
        gap: 24,
    },
    inputWrapper: {
        gap: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: "rgba(255,255,255,0.5)",
        letterSpacing: 1,
        marginLeft: 4,
    },
    input: {
        fontSize: 16,
        padding: 16,
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "#ffffff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.1)",
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    btnMainContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        gap: 8
    },
    btnContainer: {
        marginTop: 10,
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    btnGradient: {
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 20
    },
    btnTxt: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    }
})