import { Link } from "expo-router";
import {  StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screen/HomeScreen";

export default function Page() {
  return (

    <View style={styles.container}>
         
   {/* <Home /> */}
 
      <View style={styles.main}>
      
       <HomeScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "black",
  },
});

