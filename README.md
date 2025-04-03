# React Native Reels/Shorts Video Player

## Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (>= 16.0)
*   npm or yarn
*   React Native CLI
*   Android Studio (for Android development) or Xcode (for iOS development)

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/bhargav497/bhargavpractical.git
    cd bhargavpractical
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Install pods (iOS only):**

    ```bash
    cd ios
    pod install
    cd ..
    ```

4.  **Install following packages**
    - react-native-video
    - react-native-safe-area-context"
    - react-native-gesture-handler
    - react-native-reanimated
    - react-native-vector-icons
    
5.  **Configure `react-native-vector-icons` (Android):**

    * Edit android/app/build.gradle and add:
    ```project.ext.vectoricons = [
            iconFontNames: [ 'FontAwesome.ttf' ]
        ]

        apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")```

6.  **Configure `react-native-vector-icons` (iOS):**

    * Edit Info.plist and add a property called UIAppFonts then add FontAwesome.ttf.
    ```<key>UIAppFonts</key>
	<array>
  		<string>FontAwesome.ttf</string>
	</array>```

## Implementation Details

The core of the application is the `FeedPage` component, which renders a `FlatList` of `FeedRow` components.

*   **`FeedPage` Component:**
    *   Fetches screen dimensions using `useWindowDimensions`.
    *   Maintains the `visibleIndex` state to track the currently visible video.
    *   Uses the `onViewableItemsChanged` callback to update the `visibleIndex`.
    *   Renders the `FlatList` with `pagingEnabled`, `getItemLayout`, and other performance-related props.

*   **`FeedRow` Component:**
    *   Receives video data, visibility status, and screen dimensions as props.
    *   Uses `react-native-video` for video playback.
    *   Handles play/pause functionality and displays user information, description, likes, and comments.
    *   The `isDescriptionExpanded` state manages the "Read More" functionality for long descriptions.

*   **Key Performance Optimizations:**
    *   `getItemLayout` is used to improve scrolling performance by providing the `FlatList` with the layout of each item.
    *   `useCallback` is used extensively to memoize functions and prevent unnecessary re-renders.
    *   `initialNumToRender`, `maxToRenderPerBatch`, and `windowSize` are configured to optimize `FlatList` rendering.
    *   `removeClippedSubviews` is enabled to improve memory usage.

*   **Paging Implementation:**
    *   `pagingEnabled` is set to `true` on the `FlatList`.
    *   `decelerationRate` is set to `fast` for a smoother scrolling experience.

## Running the Application

### Android

1.  **Start the Metro bundler:**

    ```bash
    npx react-native start
    # or
    yarn start
    ```

2.  **Run the app on an Android device or emulator:**

    ```bash
    npx react-native run-android
    # or
    yarn android
    ```

### iOS

1.  **Start the Metro bundler:**

    ```bash
    npx react-native start
    # or
    yarn start
    ```

2.  **Run the app on an iOS device or simulator:**

    ```bash
    npx react-native run-ios
    # or
    yarn ios
    ```