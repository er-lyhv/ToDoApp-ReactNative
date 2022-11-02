import React, { useEffect } from "react"
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import * as Progress from 'react-native-progress';
import { useMutation } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'
import { ADD_TASK } from "./models/query";
import { useDispatch } from "react-redux";
import { addTask } from "./redux/taskSlice";
const AddTask = ({ navigation }) => {
    // Redux hook dispatch to sen event addTask after task added
    const dispatch = useDispatch();
    // GraphQL React Hook to add task
    const [AddTask, { data, loading, error }] = useMutation(ADD_TASK)
    // React Hook from to handle submit task
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            taskTitle: '',
            taskDescription: ''
        }
    });
    // User userEffect hook to listener new task added
    // 1. Using Redux to send addTask event 
    // 2. navigation.goBack() back to pervious screen.
    useEffect(() => {
        if (data != undefined) {
            dispatch(addTask(data.insert_task_one.id))
            navigation.goBack()
        }
    }, [data])
    // For custom Header 
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={handleSubmit(({ taskTitle, taskDescription }) => {
                    let timestamp = (new Date().getTime()).toString()
                    let newTask = {
                        title: taskTitle,
                        description: taskDescription,
                        created_at: timestamp,
                        email: "lyhv@tech.est-rouge.com"
                    }

                    AddTask({
                        variables: {
                            task: newTask
                        }
                    });
                })} >
                    <Text style={styles.title}>Add</Text>
                </Pressable>
            ),
        });
    }, [])

    return (
        <SafeAreaView >
            {loading ? (<Progress.Bar width={null} borderRadius={0} height={3} color={'red'} indeterminate={true} useNativeDriver={true} />
            ) : null}
            <Text style={styles.title}>Title</Text>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder='Input the task title'
                    />
                )}
                name='taskTitle'
            />
            {errors.taskTitle && <Text style={{ color: 'red', marginStart: 10, marginEnd: 10 }}>Task title is required.</Text>}

            <Text style={styles.title}>Description</Text>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        onChangeText={onChange}
                        value={value}
                        placeholder='Input the task description'
                    />
                )}
                name='taskDescription'
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 100,
        margin: 10,
        padding: 10,
        borderWidth: 1
    },
    title: {
        margin: 10,
        fontWeight: 'bold',
        color: 'black'
    }

});
export default AddTask


