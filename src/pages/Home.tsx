import BoardView from "../features/board/BroadView";
import FormstackReportEmbed from "@/components/FormstackReportEmbed";

export default function Home() {
  return (
    <div className="space-y-6 p-6">
      <BoardView />
      <FormstackReportEmbed />
    </div>
  );
}
