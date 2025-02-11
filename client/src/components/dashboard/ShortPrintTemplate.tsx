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
      <div ref={ref} className="size-full">
        <p>{plotNumber}</p>
        <p>{blockNumber}</p>
        <p>{plotSize}</p>
        <p>{memberName}</p>
        <p>{memberCnic}</p>
        <img src={qrCodeDataUrl} alt="QR Code" />
      </div>
    );
  }
);

ShortPrintTemplate.displayName = "Letter Head";

export default ShortPrintTemplate;
