/* eslint-disable no-irregular-whitespace */
/* eslint-disable tailwindcss/enforces-shorthand */
import { forwardRef } from "react";

interface LongPrintTempateProps {
  plotNumber: string;
  blockNumber: string;
  plotSize: string;
  memberName: string;
  memberCnic: string;
  qrCodeDataUrl?: string;
  dealerOfficeName: string;
  dealerPhoneNumber: string;
  dealerCnic: string;
}

const LongPrintTemplate = forwardRef<HTMLDivElement, LongPrintTempateProps>(
  (
    {
      plotNumber,
      blockNumber,
      plotSize,
      memberName,
      memberCnic,
      qrCodeDataUrl,
      dealerOfficeName,
      dealerPhoneNumber,
      dealerCnic
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="mx-auto my-4 flex size-full flex-col items-center justify-center gap-4"
        style={{
          width: "794px",
          marginTop: "12px"
        }}
      >
        <div className="relative h-fit w-full text-sm font-medium uppercase leading-6">
          <div className="flex flex-row justify-between gap-2 text-nowrap">
            <p className="flex w-1/3 items-center whitespace-nowrap">
              Plot #<span className="ml-1 flex-1 border-b-2 border-black text-center leading-none">{plotNumber}</span>
            </p>
            <p className="flex w-1/3 items-center whitespace-nowrap">
              Block:<span className="ml-1 flex-1 border-b-2 border-black text-center leading-none">{blockNumber}</span>
            </p>
            <p className="flex w-1/3 items-center whitespace-nowrap">
              Plot Size:
              <span className="ml-1 flex-1 border-b-2 border-black text-center leading-none">{plotSize}</span>
            </p>
          </div>
          <div className="mt-2 flex w-full justify-between gap-2">
            <p className="flex w-1/2 items-center whitespace-nowrap">
              <span>Member Name:</span>
              <span className="ml-1 flex-1 border-b-2 border-black text-center leading-none">{memberName}</span>
            </p>
            <p className="flex w-1/2 items-center whitespace-nowrap">
              <span>Member CNIC:</span>
              <span className="ml-1 flex-1 border-b-2 border-black text-center leading-none">{memberCnic}</span>
            </p>
          </div>
          <div className="mt-2 flex w-full justify-between gap-2">
            <p className="flex w-2/3 items-center whitespace-nowrap">
              <span>Dealer Office Name:</span>
              <span className="ml-1 flex-1 border-b-2 border-black text-center leading-none">{dealerOfficeName}</span>
            </p>
            <p className="mr-auto flex w-48 items-center whitespace-nowrap">
              <span>Dealer Ph:</span>
              <span className="ml-1 flex-1 border-b-2 border-black text-center leading-none">{dealerPhoneNumber}</span>
            </p>
          </div>
          <div className="mt-2 flex w-full justify-between gap-2">
            <p className="flex w-2/3 items-center whitespace-nowrap">
              <span>Dealer CNIC:</span>
              <span className="ml-1 flex-1 border-b-2 border-black text-center leading-none">{dealerCnic}</span>
            </p>
            <p className="mr-auto flex w-48 items-center whitespace-nowrap">
              <span>Signature:</span>
              <span className="ml-1 flex-1 border-b-2 border-black text-center leading-none">_</span>
            </p>
          </div>
        </div>

        <div className="relative w-full px-32 text-left text-xs leading-6">
          <img
            src={qrCodeDataUrl}
            alt="QR Code"
            style={{
              width: "80px",
              height: "80px",
              transform: "translate(10%, -15%)"
            }}
            className="absolute bottom-0 right-0"
          />
        </div>
      </div>
    );
  }
);

LongPrintTemplate.displayName = "Letter Head";

export default LongPrintTemplate;
