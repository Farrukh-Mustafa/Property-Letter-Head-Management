import { useGetLetterHead } from "@/services/letterhead";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/verify/$letterheadId")({
  component: RouteComponent
});

function RouteComponent() {
  const { letterheadId } = useParams({ from: "/verify/$letterheadId" });
  const { data } = useGetLetterHead({
    id: letterheadId
  });
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Verifying Letterhead</h1>
      <p>Letterhead ID: {letterheadId}</p>
      <p>{data?.name}</p>
      <p>{data?.cnic}</p>
      <p>{data?.plotNumber}</p>
      <p>{data?.letterHeadId}</p>
    </div>
  );
}
