import AppLayout from "./components/layout/AppLayout";
import { BoardProvider } from "./context/BoardContext";

export default function App() {
  return (
    <BoardProvider>
      <AppLayout />
    </BoardProvider>
  );
}
