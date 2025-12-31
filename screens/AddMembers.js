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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const AddMembers = () => {
    const insets = useSafeAreaInsets();

    const mockData = [
        { id: 1, name: "Rohan", phone: "9876543210" },
        { id: 2, name: "Abhijit", phone: "8527419630" },
        { id: 3, name: "Rahul", phone: "8975462310" },
        { id: 4, name: "Suresh", phone: "8975462310" },
        { id: 5, name: "Amit", phone: "8975462310" },
        { id: 6, name: "Priya", phone: "8975462310" },
    ]

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
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ paddingTop: insets.top + 40, paddingHorizontal: 16 }}>

                        {/*//! Header Text */}
                        <Text style={styles.screenTitle}>Add Members</Text>
                        <Text style={styles.screenSubtitle}>Add members using their phone numbers</Text>

                        <BlurView intensity={30} tint='dark' style={styles.glassContainer}>
                            <LinearGradient
                                colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.02)"]}
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                style={styles.innerGradient}
                            >
                                <View style={styles.formContainer}>

                                    {/*//! Name Input */}
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.label}>CONTACT NAME</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='e.g. Rahul'
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                        />
                                    </View>

                                    {/* //! Number Input */}
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.label}>PHONE NUMBER</Text>
                                        <TextInput
                                            textContentType='telephoneNumber'
                                            keyboardType='number-pad'
                                            style={styles.input}
                                            placeholder='+91 98765 43210'
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                        />
                                    </View>

                                    {/* //! ADD BUTTON */}
                                    <TouchableOpacity style={styles.addBtnInline}>
                                        <Text style={styles.addBtnText}>+ Add to list</Text>
                                    </TouchableOpacity>

                                    {/*//! SEPARATOR */}
                                    <View style={styles.separator} />

                                    {/*//! MEMBERS LIST */}
                                    <View style={styles.listHeader}>
                                        <Text style={styles.label}>ADDED MEMBERS ({mockData.length})</Text>
                                    </View>

                                    <View style={styles.membersListContainer}>
                                        {mockData.map((item) => (
                                            <View key={item.id} style={styles.memberRow}>
                                                <View style={styles.memberAvatar}>
                                                    <Text style={styles.avatarText}>{item.name[0]}</Text>
                                                </View>
                                                <View style={{ flex: 1, gap: 2 }}>
                                                    <Text style={styles.memberName}>{item.name}</Text>
                                                    <Text style={styles.memberPhone}>{item.phone}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.removeBtn}>
                                                    <MaterialCommunityIcons name='close' size={20} color="#FF8686" />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>

                                    {/*//! ACTION BUTTONS */}
                                    <View style={styles.btnMainContainer}>
                                        <TouchableOpacity activeOpacity={0.8} style={styles.btnContainer}>
                                            <LinearGradient
                                                colors={['#6366f1', '#4f46e5']}
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                                style={styles.btnGradient}
                                            >
                                                <Text style={styles.btnTxt}>CONTINUE</Text>
                                                <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
                                            </LinearGradient>
                                        </TouchableOpacity>

                                        <TouchableOpacity activeOpacity={0.8} style={styles.btnContainer}>
                                            <View style={styles.cancelBtn}>
                                                <Text style={[styles.btnTxt, { color: '#ff8686', fontSize: 16 }]}>Cancel</Text>
                                            </View>
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

export default AddMembers;

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
        marginBottom: 40,
    },
    innerGradient: {
        padding: 24,
    },
    formContainer: {
        gap: 16,
    },
    inputWrapper: {
        gap: 8,
    },
    label: {
        fontSize: 11,
        fontWeight: '700',
        color: "rgba(255,255,255,0.5)",
        letterSpacing: 1,
        marginLeft: 4,
        textTransform: 'uppercase'
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
    addBtnInline: {
        alignSelf: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(99, 102, 241, 0.5)"
    },
    addBtnText: {
        color: "#818cf8",
        fontWeight: "600",
        fontSize: 13
    },
    separator: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.1)",
        marginVertical: 8
    },


    membersListContainer: {
        gap: 10,
        marginBottom: 20
    },
    memberRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)"
    },
    memberAvatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    avatarText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18
    },
    memberName: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: "600"
    },
    memberPhone: {
        fontSize: 13,
        color: "rgba(255,255,255,0.5)",
    },
    removeBtn: {
        padding: 8,
        backgroundColor: "rgba(255, 134, 134, 0.1)",
        borderRadius: 10,
    },

    // Buttons
    btnMainContainer: {
        gap: 12,
        marginTop: 10
    },
    btnContainer: {
        shadowColor: "#6366f1",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    btnGradient: {
        paddingVertical: 16,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    cancelBtn: {
        paddingVertical: 14,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 134, 134, 0.3)",
        backgroundColor: "rgba(255, 134, 134, 0.05)"
    },
    btnTxt: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
})