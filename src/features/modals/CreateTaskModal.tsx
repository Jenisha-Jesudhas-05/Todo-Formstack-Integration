import FormstackEmbed from "@/components/FormstackEmbed";

interface CreateTaskModalProps {
  onClose: () => void;
}

export default function CreateTaskModal({ onClose }: CreateTaskModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="relative w-full h-full">
        <button
          aria-label="Close"
          className="absolute top-4 right-4 z-10 rounded-full bg-white text-black px-3 py-1 shadow hover:bg-gray-100"
          onClick={onClose}
        >
          Close
        </button>
        <div className="h-full">
          <FormstackEmbed />
        </div>
      </div>
    </div>
  );
}
