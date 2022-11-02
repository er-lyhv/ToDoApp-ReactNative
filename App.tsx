/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {
  Image,
} from 'react-native';

import tasks from './assets/tasks.png'
import analytics from './assets/analytics.png'
import TaskList from './src/TaskList';
import Analytics from './src/Analytics';
import AddTask from './src/AddTask';

const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: 'https://smooth-gecko-53.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': '5WRABn68TQflvPvfp91U5wvaWavprLAg20xYX32Zxjjocg8Uv2eEsliNiJaY3SRy',
    'content-type': 'content-type'
  },
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import { store } from './src/redux/store'
import { Provider } from 'react-redux'
const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: 'white',
        position: 'absolute',
        height: 60,
      },
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'gray',
    }
    }>
      <Tab.Screen
        name="Tasks"
        component={TaskList}
        options={{
          tabBarIcon: ({ focused }) => (
            TaskIcon(focused)
          )
        }}
      />
      <Tab.Screen name="Analytics" component={Analytics} options={{
        tabBarIcon: ({ focused }) => (
          AnalyticsIcon(focused)
        )
      }} />
    </Tab.Navigator >
  )
}
const AnalyticsIcon = (focused: boolean) => {
  return (
    <Image source={analytics} style={{
      width: 22,
      height: 22,
      tintColor: focused ? 'red' : 'gray',

    }}></Image>
  )
}

const TaskIcon = (focused: boolean) => {
  return (
    <Image source={tasks} style={{
      width: 22,
      height: 22,
      tintColor: focused ? 'red' : 'gray',

    }}></Image>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={MainTab} options={{
              headerShown: false
            }} />
            <Stack.Screen name="AddTask" component={AddTask} options={{
              headerTitleAlign: 'center',
              title: 'New Task',
            }} />
          </Stack.Navigator>
        </NavigationContainer >
      </ApolloProvider>
    </Provider>
  );
};


export default App;
