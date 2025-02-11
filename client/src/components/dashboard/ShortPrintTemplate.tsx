/* eslint-disable tailwindcss/enforces-shorthand */
import { forwardRef } from "react";

interface ShortPrintTempateProps {
  plotNumber: string;
  blockNumber: string;
  plotSize: string;
  memberName: string;
  memberCnic: string;
  qrCodeDataUrl?: string;
}

const ShortPrintTemplate = forwardRef<HTMLDivElement, ShortPrintTempateProps>(
  ({ plotNumber, blockNumber, plotSize, memberName, memberCnic, qrCodeDataUrl }, ref) => {
    return (
      <div
        ref={ref}
        className="mx-auto my-4 flex size-full flex-col items-center justify-center gap-4"
        style={{
          width: "794px",
          marginTop: "175px"
        }}
      >
        <div className="relative h-fit w-full px-32 text-sm font-semibold leading-6">
          <p>To,</p>
          <br />
          <p>Park View City</p>
          <p>Lahore</p>
          <p>Subject: Submission of Membership Application Form</p>
          <br />
          <div className="flex flex-row justify-between gap-4 text-nowrap">
            <p className="flex items-center whitespace-nowrap">
              Plot #<span className="ml-2 w-24 border-b-2 border-black text-center leading-none">{plotNumber}</span>
            </p>
            <p className="flex items-center whitespace-nowrap">
              Block #<span className="ml-2 w-28 border-b-2 border-black text-center leading-none">{blockNumber}</span>
            </p>
            <p className="flex items-center whitespace-nowrap">
              Plot Size #<span className="ml-2 w-24 border-b-2 border-black text-center leading-none">{plotSize}</span>
            </p>
          </div>
          <div className="mt-2 flex w-full justify-between gap-4">
            <p className="flex w-1/2 items-center whitespace-nowrap">
              <span>Member Name #</span>
              <span className="ml-2 flex-1 border-b-2 border-black text-center leading-none">{memberName}</span>
            </p>
            <p className="flex w-1/2 items-center whitespace-nowrap">
              <span>CNIC #</span>
              <span className="ml-2 flex-1 border-b-2 border-black text-center leading-none">{memberCnic}</span>
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
              transform: "translate(10%, 0%)"
            }}
            className="absolute bottom-0 right-32"
          />
          <br />
          <br />
          <p>Dear Sir,</p>
          <p className="ml-16">Above mentioned plot issued us against Land to society and we sell this plot to the</p>
          <p>client detail mentioned above.</p>
          <p className="ml-16">We are requesting you to submit this form and start the procedure to generate an</p>
          <p>Allotment</p>
          <p>Letter to the client.</p>
          <br />
          <p>Thanks,</p>
          <br />
          <br />
          <br />
          <p>Authorized Signature</p>
        </div>
      </div>
    );
  }
);

ShortPrintTemplate.displayName = "Letter Head";

export default ShortPrintTemplate;
