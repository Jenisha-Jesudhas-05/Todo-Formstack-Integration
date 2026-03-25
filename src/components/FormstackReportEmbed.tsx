import { useEffect, useState } from "react";
import { FORMSTACK_REPORT_PROXY } from "@/lib/formstack";

type Item = {
  date: string;
  title: string;
  description: string;
  deadline: string;
  assignee: string;
};

const dateLineRegex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+(.*)$/;

function splitDetails(rest: string) {
  // Heuristic: Title = first token, Assignee = last token, Deadline = last 4 tokens if they look like a date, Description = middle
  const tokens = rest.split(" ").filter(Boolean);
  if (tokens.length === 0) {
    return { title: "(no title)", description: "", deadline: "", assignee: "" };
  }
  const title = tokens.shift() || "(no title)";

  let assignee = "";
  if (tokens.length > 0) {
    assignee = tokens.pop() || "";
  }

  let deadline = "";
  if (tokens.length >= 4) {
    const maybeDeadline = tokens.slice(-4).join(" ");
    deadline = maybeDeadline;
    tokens.splice(-4, 4);
  }

  const description = tokens.join(" ").trim();
  return { title, description, deadline, assignee };
}

function parseLines(text: string): Item[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const m = line.match(dateLineRegex);
      if (!m) return null;
      const { title, description, deadline, assignee } = splitDetails(m[2]);
      return {
        date: m[1],
        title,
        description,
        deadline,
        assignee,
      };
    })
    .filter((x): x is Item => Boolean(x));
}

export default function FormstackReportEmbed() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!FORMSTACK_REPORT_PROXY) {
      setError("No public proxy link configured.");
      return;
    }

    const fetchFeed = async () => {
      try {
        const url = `${FORMSTACK_REPORT_PROXY}${FORMSTACK_REPORT_PROXY.includes("?") ? "&" : "?"}t=${Date.now()}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        console.log("[Formstack proxy] sample:", text.slice(0, 800));
        const parsed = parseLines(text);
        setItems(parsed);
      } catch (err: any) {
        setError(err.message || "Failed to load feed");
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg space-y-4 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Formstack Submissions</h2>
          <p className="text-sm text-gray-500">Read-only list from your shared report</p>
        </div>
        <div className="text-xs text-gray-400">Auto-refreshed</div>
      </div>

      {error ? (
        <p className="text-sm text-red-600">Error: {error}</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl p-4 bg-white hover:shadow-md transition"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-base font-semibold text-gray-900">{item.date}</div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {item.date ? new Date(item.date.replace(" ", "T") + "Z").toLocaleString() : ""}
                  </span>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm text-gray-800">
                  <span className="font-semibold text-gray-700">Title:</span>
                  <span>{item.title || "—"}</span>
                  <span className="font-semibold text-gray-700">Description:</span>
                  <span>{item.description || "—"}</span>
                  <span className="font-semibold text-gray-700">Deadline:</span>
                  <span>{item.deadline || "—"}</span>
                  <span className="font-semibold text-gray-700">Assignee:</span>
                  <span>{item.assignee || "—"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-400">
        Loaded via public proxy (jina.ai). For production, fetch server-side.
      </p>
    </div>
  );
}
