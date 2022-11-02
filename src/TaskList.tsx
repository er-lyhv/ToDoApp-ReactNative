import React, { useEffect, useState } from "react"
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as Progress from 'react-native-progress';
import TaskItem from "./TaskItem";
import { useMutation, useQuery } from '@apollo/client'
import plus from '../assets/plus.png'
import { DELETE_TASK_QUERY, GET_TASKS as GET_TASKS_QUERY, UPDATE_TASK as UPDATE_TASK_QUERY } from "./models/query";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TaskList = (props) => {
    const { navigation, route } = props
    // User redux selector for listener new task added from screen add task.
    const newTaskIdAdded = useSelector((state: RootState) => state.task.task_id);
    // Graphql React Hook fetch tasks 
    const tasksFetchResult = useQuery(GET_TASKS_QUERY)
    // Graphql React Hook for set status task
    const [SET_COMPLETE_TASK, completeTaskResult] = useMutation(UPDATE_TASK_QUERY)
    // Graphql React Hook for delete task
    const [DELETE_TASK, deleteTaskResult] = useMutation(DELETE_TASK_QUERY)
    // When new task is added, will refetch task list
    useEffect(() => {
        if (newTaskIdAdded != 0) {
            tasksFetchResult.refetch()
        }
    }, [newTaskIdAdded])
    // When new task is deleted, will refetch task list
    useEffect(() => {
        tasksFetchResult.refetch()
    }, [deleteTaskResult.data])


    return (
        <GestureHandlerRootView style={styles.contentContainerStyle}>
            {LoadingBar(tasksFetchResult.loading || completeTaskResult.loading || deleteTaskResult.loading)}
            {tasksFetchResult.data ? <FlatList

                data={tasksFetchResult.data.task}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => <TaskItem
                    item={item}
                    checkedTask={(taskId, isChecked) => {
                        SET_COMPLETE_TASK({
                            variables: {
                                task_id: taskId,
                                is_completed: isChecked
                            }
                        })
                    }}
                    deleteTask={(taskId) => {
                        DELETE_TASK({
                            variables: {
                                task_id: taskId,
                            }
                        })
                    }} />}
                refreshControl={<RefreshControl refreshing={false} onRefresh={tasksFetchResult.refetch} />}
            /> : null}
            <AddButton navigation={navigation} />
        </GestureHandlerRootView>
    );
}
const LoadingBar = (loading: boolean) => {
    return loading ? (<Progress.Bar width={null} borderRadius={0} height={3} color={'red'} indeterminate={true} useNativeDriver={true} />
    ) : null
}
const AddButton = (props: any) => {
    return (
        <TouchableOpacity style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: 10,
            marginBottom: 70,
        }} onPress={() => {
            props.navigation.navigate('AddTask')
        }} >
            <View style={{
                width: 50,
                height: 50,
                backgroundColor: 'red',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',

            }}>
                <Image source={plus} style={{
                    width: 20,
                    height: 20,
                    tintColor: 'white',
                }}></Image>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
    },
    separator: {
        backgroundColor: 'rgb(200, 199, 204)',
        height: StyleSheet.hairlineWidth,
    },
});

export default TaskList