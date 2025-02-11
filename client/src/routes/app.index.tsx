import { useDocumentTitle } from "@/hooks/document-title";
import { createFileRoute } from "@tanstack/react-router";
import Tiptap from "@/components/dashboard/Tiptap";

export const Route = createFileRoute("/app/")({
  component: HomePage
});

function HomePage() {
  useDocumentTitle("Dashboard");
  return (
    <div className="">
      <div className="mt-4">
        <Tiptap />
      </div>
    </div>
  );
}
