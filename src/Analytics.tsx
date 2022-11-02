import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { Button, Text, View } from "react-native"
import { Screen } from "react-native-screens";
import { AnalyticsProp } from "./Types";
function Analytics({ navigation }: AnalyticsProp) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Go to Task" onPress={() => navigation.navigate("Tasks", { name: "Hello" })} />
        </View>
    );
}
export default Analytics