import React, { useState } from "react";
import { Text, StyleSheet, Animated, I18nManager, Pressable } from "react-native";
import Task from "./models/Task"
import Swipeable from 'react-native-gesture-handler/Swipeable';

import BouncyCheckbox from "react-native-bouncy-checkbox";


const TaskItem = (props: {
    item: Task,
    checkedTask: (taskId: number, isChecked: boolean) => void,
    deleteTask: (taskId: number) => void
}) => {
    let _swipeableRow: Swipeable | null;

    const { item, checkedTask, deleteTask } = props
    const setCheckedTask = (isChecked: boolean) => {
        checkedTask(item.id, isChecked)
    }

    let renderRightActions = () => {
        return (
            <Pressable style={styles.rightAction} onPress={() => {
                _swipeableRow?.close()
                deleteTask(item.id)
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    marginEnd: 10,
                    color: 'white'
                }}>Delete</Text>
            </Pressable>
        );
    };

    return (
        <Swipeable
            ref={(ref) => {
                _swipeableRow = ref
            }}
            friction={2}
            leftThreshold={80}
            rightThreshold={41}
            renderRightActions={renderRightActions}>
            <BouncyCheckbox
                style={{
                    padding: 20,
                }}
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                text={item.title}
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontFamily: "JosefinSans-Regular", fontWeight: '500' }}
                onPress={(isChecked: boolean) => {
                    setCheckedTask(isChecked)
                }}
                isChecked={item.is_completed}
            />
        </Swipeable>);

};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    checkboxContainer: {
        flexDirection: "row",
        margin: 10
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        marginStart: 20,
    },
    leftAction: {
        flex: 1,
        backgroundColor: '#388e3c',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
    },
    actionIcon: {
        width: 30,
        marginHorizontal: 10
    },
    rightAction: {
        alignItems: 'center',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        backgroundColor: '#dd2c00',
        flex: 1,
        justifyContent: 'flex-end'
    },
    rectButton: {
        flex: 1,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: 'white',
    },
    separator: {
        backgroundColor: 'rgb(200, 199, 204)',
        height: StyleSheet.hairlineWidth,
    },
    fromText: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    title: {
        marginStart: 20,
        backgroundColor: 'transparent',
        color: '#999',
        fontWeight: 'bold',
    },
});
export default TaskItem