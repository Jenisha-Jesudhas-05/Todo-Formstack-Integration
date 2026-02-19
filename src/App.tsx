import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import AppLayout from "./components/layout/AppLayout";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <AppLayout />
      </PersistGate>
    </Provider>
  );
}
