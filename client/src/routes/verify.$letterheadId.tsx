import { Card } from "@/components/ui/card";
import { useGetLetterHead } from "@/services/letterhead";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { FaBuilding, FaCalendarAlt, FaIdCard, FaMapMarkerAlt, FaPhone, FaRegAddressCard, FaUser } from "react-icons/fa";
import moment from "moment";
export const Route = createFileRoute("/verify/$letterheadId")({
  component: RouteComponent
});
function RouteComponent() {
  const { letterheadId } = useParams({ from: "/verify/$letterheadId" });
  const { data, error, isLoading } = useGetLetterHead({
    id: letterheadId
  });
  if (isLoading) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
          <Card className="relative w-full max-w-[600px] rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
            <div className="mb-6 flex flex-col items-center border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Loading...</h2>
            </div>
          </Card>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
          <Card className="relative w-full max-w-[600px] rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
            <div className="mb-6 flex flex-col items-center border-b pb-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/036/652/825/large_2x/incorrect-sign-diamond-free-vector.png"
                alt="Company Logo"
                className="mb-4 h-20"
              />
              <h2 className="text-2xl font-bold text-gray-800">Unverified Letter Head</h2>
            </div>
          </Card>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
        <Card className="relative w-full max-w-[600px] rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
          <div className="mb-6 flex flex-col items-center border-b pb-4">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/023/527/510/small_2x/verified-checkmark-sign-icon-symbol-logo-green-design-transparent-background-free-png.png"
              alt="Company Logo"
              className="mb-4 h-20"
            />
            <h2 className="text-2xl font-bold text-gray-800">Verification Letter</h2>
          </div>
          <p className="absolute right-4 top-4 text-xs font-semibold text-gray-800">{data?.letterHeadId}</p>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Plot No:</p>
                <p className="text-lg font-semibold text-gray-800">{data?.plotNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Block No:</p>
                <p className="text-lg font-semibold text-gray-800">{data?.blockNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaRegAddressCard className="text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Plot Size:</p>
                <p className="text-lg font-semibold text-gray-800">{data?.plotSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaUser className="text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Member Name:</p>
                <p className="text-lg font-semibold text-gray-800">{data?.memberName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaIdCard className="text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Member CNIC:</p>
                <p className="text-lg font-semibold text-gray-800">{data?.memberCnic}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Date:</p>
                <p className="text-lg font-semibold text-gray-800">{moment(data?.date).format("ddd MMM DD YYYY")}</p>
              </div>
            </div>
          </div>
          {data?.dealerCnic && data?.dealerCnic.length > 0 && (
            <div className="mt-6 border-t pt-6 text-gray-700">
              <h3 className="mb-4 text-xl font-semibold text-gray-800">Dealer Information</h3>
              <div className="flex items-center gap-3">
                <FaBuilding className="text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Dealer Office:</p>
                  <p className="text-lg font-semibold text-gray-800">{data?.dealerOfficeName}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <FaPhone className="text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone:</p>
                  <p className="text-lg font-semibold text-gray-800">{data.dealerPhoneNumber}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <FaIdCard className="text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Dealer CNIC:</p>
                  <p className="text-lg font-semibold text-gray-800">{data.dealerCnic}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
