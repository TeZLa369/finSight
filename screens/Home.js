import { EvilIcons, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { height, width } = Dimensions.get("window");

const Home = () => {
    const insets = useSafeAreaInsets();


    const mockSplitsData = [
        {
            id: '1',
            title: 'Dinner with Friends',
            totalAmount: 3500,
            userShare: 1150,
            status: 'Pending',
        },
        {
            id: '2',
            title: 'Weekend Trip',
            totalAmount: 12000,
            userShare: 4000,
            status: 'Settled',
        },
        {
            id: '3',
            title: 'Movie Night',
            totalAmount: 800,
            userShare: 400,
            status: 'Pending',
        },
        {
            id: '4',
            title: 'Birthday Gift',
            totalAmount: 1500,
            userShare: 500,
            status: 'Settled',
        },
        {
            id: '5',
            title: 'Cab Fare',
            totalAmount: 600,
            userShare: 200,
            status: 'Pending',
        },
        {
            id: '6',
            title: 'Faltu Fare',
            totalAmount: 900,
            userShare: 250,
            status: 'Pending',
        },
    ];


    let owe = 1720;
    let receive = 4200;

    return (

        < LinearGradient
            colors={owe > receive ? ['#000000', '#2B1212', '#4A1C1C'] : ['#000000', '#0f2027', '#203a43']}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.9, y: 0.9 }}
            style={{ flex: 1 }}
        >


            <View style={{ paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right }}>

                {/* //! HEADING */}
                <View style={styles.headingContainer}>
                    <View>
                        <Text style={styles.headingTxt}>Your Splits </Text>
                        <Text style={styles.headingsubTxt}>Track and settle shared expenses</Text>
                    </View>
                    <View style={styles.glowContainer}>
                        <View style={styles.imgBorder}>
                            <Image source={require("../assets/profile.png")} style={styles.img} /></View>
                    </View></View>


                {/* //! MONEY DATA */}
                <BlurView intensity={40} tint='dark' style={[styles.glass, { marginBottom: 12, marginTop: 12 }]}>
                    <LinearGradient colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.0)"]}

                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.moneydataContainer}>
                        < View style={styles.infoSubContainer} >
                            <Ionicons style={[styles.icons, { backgroundColor: "#FF868650", }]} name='arrow-down' size={28} color={"#FF8686"} />
                            <Text style={styles.labelText}>You Owe</Text>
                            <Text style={styles.amountTextOwe}>₹1000</Text>
                        </View>
                        <View style={styles.infoSubContainer}>
                            <Ionicons style={[styles.icons, { backgroundColor: "rgba(134,255,144,0.31)", }]} name='arrow-up' size={28} color={"#86FF90C4"} />
                            <Text style={styles.labelText}>You'll Receive</Text>
                            <Text style={styles.amountTextReceive}>₹400</Text>
                        </View>
                        <View style={styles.infoSubContainer}>
                            <MaterialCommunityIcons style={[styles.icons, { backgroundColor: "rgba(202,186,42,0.28)", }]} name="clock-outline" size={28} color={"#F1DD2A"} />
                            <Text style={styles.labelText}>Unsettled</Text>
                            <Text style={styles.amountTextPending}>₹1400</Text>
                        </View>
                    </LinearGradient>
                </BlurView>


                {/* //! FLATLIST */}
                <FlatList
                    contentContainerStyle={{ paddingBottom: insets.bottom * insets.bottom + 80, }}
                    data={mockSplitsData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (

                        <BlurView intensity={20} tint='dark' style={[styles.glass, styles.listItemGlass]}>
                            <LinearGradient colors={["rgba(255,255,255,0.01)", "rgba(255,255,255,0.05)"]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.moneydataContainer}>
                                <View style={styles.listContainer}>
                                    <View style={styles.listSubContainer}>
                                        <Text style={styles.listTitle}>{item.title}</Text>
                                        <Text style={styles.listAmt}>₹{item.totalAmount}</Text>
                                        <Text style={styles.listOwe}>User's share: ₹{item.userShare}</Text>
                                    </View>
                                    <Text style={[styles.listStatus,
                                    {
                                        backgroundColor: item.status === "Pending" ? "rgba(202,186,42,0.28)" : "rgba(134,255,144,0.31)",
                                        color: item.status === "Pending" ? "#F1DD2A" : "#86FF90C4"
                                    }]}>{item.status}</Text>
                                </View>
                            </LinearGradient>
                        </BlurView >
                    )} />



                {/* //! NEW SPLIT BTN */}
                <TouchableOpacity style={styles.btn} >
                    <LinearGradient
                        colors={owe > receive
                            ? ['#FF416C', '#FF4B2B']
                            : ['#4AC29A', '#46B8A3']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.btnGradient}>
                        <Text style={styles.btnTxt}>+ CREATE SPLIT</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View >
        </LinearGradient >
    )
}

export default Home

const styles = StyleSheet.create({
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 8,
        alignContent: "center",
    },
    headingTxt: {
        color: "#ffffff",
        fontSize: 30,
        fontWeight: 800
    },
    headingsubTxt: {
        color: "#FFFFFF7D",
        fontSize: 16,
        fontWeight: 400
    },
    glowContainer: {
        height: 74,
        width: 74,
        borderRadius: 37,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#6366f1",
        shadowOpacity: 0.9,
        shadowRadius: 25,
        shadowOffset: { width: 0, height: 0 },
        elevation: 12,
    },

    imgBorder: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#ffffff",
        height: 66,
        width: 66,
    },
    img: {
        height: 65,
        width: 65,
        tintColor: "#ffffff",
    },
    glass: {
        borderRadius: 24,
        marginHorizontal: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.15)",
    },
    listItemGlass: {
        marginTop: 12,
        borderRadius: 20,
        borderColor: "rgba(255,255,255,0.1)",
    },
    moneydataContainer: {
        paddingVertical: 25,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    infoSubContainer: {
        flexDirection: "column",
        gap: 8,
        alignItems: "center"
    },
    icons: {
        padding: 10,
        borderRadius: 50,
        alignSelf: "center",
    },
    labelText: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 13,
        fontWeight: '500',
    },
    amountTextOwe: {
        color: "#FE968F",
        fontWeight: "700",
        fontSize: 16,
    },
    amountTextReceive: {
        color: "#86FF90E3",
        fontWeight: "700",
        fontSize: 16,
    },
    amountTextPending: {
        color: "#CABA2A",
        fontWeight: "700",
        fontSize: 16,
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginLeft: 14,
        marginRight: 14,
    },
    listSubContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 8
    },
    listTitle: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: 600,
    },
    listAmt: {
        color: "#FFFFFFBD",
        fontSize: 16,
        fontWeight: 400,
    },
    listOwe: {
        color: "#FFFFFF9D",
        fontSize: 14,
        fontWeight: 400,
    },
    listStatus: {
        padding: 8,
        borderRadius: 12,

    },
    btn: {
        position: "absolute",
        top: height * .92,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
    },
    btnGradient: {
        elevation: 8,
        paddingVertical: 15,
        borderRadius: 18,
        paddingHorizontal: 90,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 4.65,
    },
    btnTxt: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})