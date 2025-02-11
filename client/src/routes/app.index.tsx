import { useDocumentTitle } from "@/hooks/document-title";
import { createFileRoute } from "@tanstack/react-router";
import ShortLetterheadForm from "@/components/dashboard/ShortLetterheadForm";
import LetterheadForm from "@/components/dashboard/LetterheadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/")({
  component: HomePage
});

function HomePage() {
  useDocumentTitle("Dashboard");
  return (
    <Tabs defaultValue="short" className="w-full">
      <TabsList className="flex w-full flex-row">
        <TabsTrigger value="short" className="w-full">
          Type 1
        </TabsTrigger>
        <TabsTrigger value="long" className="w-full">
          Type 2
        </TabsTrigger>
      </TabsList>
      <TabsContent value="short">
        <ShortLetterheadForm />
      </TabsContent>
      <TabsContent value="long">
        <LetterheadForm />
      </TabsContent>
    </Tabs>
  );
}
