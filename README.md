## Getting Started

[Online Documentation](https://reactnative.dev/docs/getting-started)

## Usage

Install React Native Cli

- [Tutorial](https://www.npmjs.com/package/react-native-cli)

Setup environment in React Native

- [Install react-native-config](https://github.com/luggit/react-native-config)

- [Tutorial](https://itzone.com.vn/en/article/working-with-environment-variables-in-react-native/)

## Developement

Build Android

```sh
# default debug
npm run android
```

Build iOS

```sh
# default debug
npm run ios
```

For more environments build, please refer script in `package.json`

## Publishing

### Android

1.  In root project generate `index.android.bundle`
    ```sh
    # For debug build
    npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
    ```
2.  Go to android folder

    ```sh
    cd android
    # Debug
    # Generate the .AAB file:
    ./gradlew bundleDevelopmentDebug
    # or Generate the .APK file:
    ./gradlew assembleDevelopmentDebug

    # Release
    # Generate the .AAB file:
    ./gradlew bundleDevelopmentRelease
    # or Generate the .APK file:
    ./gradlew assembleDevelopmentRelease
    ```

    Output apk, aab files in path: `/android/app/build/outputs`

3.  Reference

    [Publishing Android](https://reactnative.dev/docs/signed-apk-android)

### iOS

1.  In root project generate `main.jsbundle`

    ```sh
    npx react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
    ```

2.  Publish .iap file [publishing](https://reactnative.dev/docs/publishing-to-app-store)
