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
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


const AddExpenses = () => {
    const insets = useSafeAreaInsets();

    // mockData.js

    const paymentsData = [
        {
            id: '1',
            type: 'Hotel',
            amount: 4500,
            paidBy: 'Kuntal',
            date: '2025-12-20',
        },
        {
            id: '2',
            type: 'Petrol',
            amount: 1200,
            paidBy: 'Rohit',
            date: '2025-12-21',
        },
        {
            id: '3',
            type: 'Groceries',
            amount: 2300,
            paidBy: 'Anita',
            date: '2025-12-22',
        },
        {
            id: '4',
            type: 'Restaurant',
            amount: 1800,
            paidBy: 'Kuntal',
            date: '2025-12-23',
        },
        {
            id: '5',
            type: 'Electricity Bill',
            amount: 3200,
            paidBy: 'Suman',
            date: '2025-12-24',
        },
        {
            id: '6',
            type: 'Movie Tickets',
            amount: 900,
            paidBy: 'Rohit',
            date: '2025-12-25',
        },
    ];


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
                        <Text style={styles.screenTitle}>Add Expenses</Text>
                        <Text style={styles.screenSubtitle}>Add the individual expenses</Text>

                        <BlurView intensity={30} tint='dark' style={styles.glassContainer}>
                            <LinearGradient
                                colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.02)"]}
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
                                style={styles.innerGradient}
                            >
                                <View style={styles.formContainer}>

                                    {/*//! Expense Name */}
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.label}>EXPENSE NAME</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='e.g. Dinner, Hotel, etc.'
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                        />
                                    </View>


                                    {/* //!  Amount and Paid By */}
                                    <View>
                                        <Text style={[styles.label]}>AMOUNT</Text>
                                        <View style={[styles.inputWrapper, styles.amtPaidBy]}>
                                            <View style={{ gap: 8 }}>
                                                <TextInput
                                                    keyboardType='number-pad'
                                                    style={[styles.input, { width: 160, }]}
                                                    placeholder='₹500'
                                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                                /></View>
                                            <TouchableOpacity style={[styles.paidBy, styles.input]}>
                                                <Text style={styles.label}>Paid by</Text>
                                                <MaterialIcons name='arrow-drop-down' size={28} />
                                            </TouchableOpacity>
                                        </View></View>
                                    <TouchableOpacity style={[styles.paidBy, styles.input, { justifyContent: "space-between" }]}>
                                        <Text style={styles.label}>Split Equally</Text>
                                        <MaterialIcons name='arrow-drop-down' size={30} />
                                    </TouchableOpacity>
                                    {/* //! ADD BUTTON */}
                                    <TouchableOpacity style={styles.addBtnInline}>
                                        <Text style={[styles.addBtnText, styles.label]}>+ Add expense</Text>
                                    </TouchableOpacity>

                                    {/*//! SEPARATOR */}
                                    <View style={styles.separator} />

                                    {/*//! MEMBERS LIST */}
                                    <View style={styles.listHeader}>
                                        <Text style={styles.label}>ADDED EXPENSES ({paymentsData.length})</Text>
                                    </View>

                                    <View style={styles.membersListContainer}>
                                        {paymentsData.map((item) => (
                                            <View key={item.id} style={styles.memberRow}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <View style={styles.memberAvatar}>
                                                        <Text style={styles.avatarText}>{item.paidBy[0]}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "column" }}>
                                                        <View style={{ flex: 1, gap: 2, flexDirection: "row" }}>
                                                            <Text style={styles.memberName}>{item.type}</Text>
                                                            <Text style={styles.memberPhone}> - ₹{item.amount}/-</Text>
                                                        </View>
                                                        <Text style={styles.memberPhone}>Paid by {item.paidBy}</Text>
                                                    </View>
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

export default AddExpenses;
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
    amtPaidBy: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 70,
        alignItems: "center",
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
        marginBottom: 20,
    },
    memberRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.05)",
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
        justifyContent:"space-between"

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
    paidBy: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        height: 60,
    }
})