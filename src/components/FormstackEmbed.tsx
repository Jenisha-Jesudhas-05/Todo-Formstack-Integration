import { FORMSTACK_EMBED_URL } from "@/lib/formstack";

export default function FormstackEmbed() {
  return (
    <div className="h-full w-full bg-white">
      <iframe
        title="Formstack Form"
        src={FORMSTACK_EMBED_URL}
        style={{ width: "100%", height: "100%", border: "none" }}
        onLoad={() => console.log("Formstack form loaded")}
      />
    </div>
  );
}
