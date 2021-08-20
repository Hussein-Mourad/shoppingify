import { themes } from "@storybook/theming";
import * as NextImage from "next/image";
import "../src/styles/globals.css";
import { Provider } from "react-redux";
import store from "app/store";

// import * as nextImage from 'next/image';

// Object.defineProperty(nextImage, 'default', {
//   configurable: true,
//   value: props => <img {...props} />
// });

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    dark: { ...themes.dark, appBg: "#121212" },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];