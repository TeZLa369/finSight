import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './screens/SignIn';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import Home from './screens/Home';
import MoneyDetails from './screens/GroupName';
import SplitScreens from './screens/SplitScreens';
import AddExpenses from './screens/AddExpenses';


export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider
        animationType="slide-in"
        duration={2000}
        offset={50}>
        <StatusBar style='light' />
        <AddExpenses />
        {/* <MoneyDetails /> */}
      </ToastProvider>
    </SafeAreaProvider>

  );
}




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
