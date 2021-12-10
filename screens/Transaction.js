import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from "react-native";
import * as Permissions from "expo-permissions"
import { BarCodeScanner } from "expo-barcode-scanner"


const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");

export default class TransactionScreen extends Component {
  constructor() {
    super();
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      bookId: "",
      studentId: ""
    }
  }

  getCameraPermissions = async (domState) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    /*
    status === granted is true when user has granted permission
    status === granted is false when user has not granted permission
    */
    this.setState({
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    })
  }

  handleBarCodeScanned = async ({ type, data }) => {
    if (domState === "bookId") {
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true,
      })
    }else if (domState === "studentId") {
      this.setState({
        studentId: data,
        domState: "normal",
        scanned: true,
      })
    }
  }

  render() {
    //destructuring assignment
    const { domState, hasCameraPermissions, scanned, scannedData, bookId, studentId } = this.state
    if (domState !== "normal") {
      return (
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      )
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={bgImage}
          style={styles.bgImage}>
          <View style={styles.upperContainer}>
            <Image source={appIcon} style={styles.appIcon}></Image>
            <Image source={appName} style={styles.appName}></Image>
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.textinputContainer}>
              <TextInput style={styles.textInput} placeholder={"Book ID"} placeholderTextColor={"white"} value = {bookId}/>
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("bookId")} >
                <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.textinputContainer, { marginTop: 25 }]} >
              <TextInput style={styles.textInput} placeholder={"Student ID"} placeholderTextColor={"white"} value = {studentId}/>
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("studentId")} >
                <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground >




        {/*  <Text style = {styles.buttonText}> 
      //     {hasCameraPermissions ? scannedData : "request for camera permission"}
      //   </Text>
      //   <Text style={styles.text}>Transaction Screen</Text>
      //   <TouchableOpacity onPress={() => {
      //     this.getCameraPermissions("scanner")
      //   }} style = {styles.button}>
      //     <Text style = {styles.buttonText}>
      //       Scan QR Code
      //     </Text>
      //   </TouchableOpacity>*/}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  appName: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },

});
