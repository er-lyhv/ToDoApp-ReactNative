import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AnalyticsParamList = {
    Analytics: { name: string }
    Tasks: { name: string }
};
export type HomeParamList = {
    Home: { isAdded: boolean }
};
export type AnalyticsProp = NativeStackScreenProps<AnalyticsParamList, 'Analytics'>
export type HomeProp = NativeStackScreenProps<HomeParamList, 'Home'>