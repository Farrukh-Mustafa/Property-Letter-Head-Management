import { forwardRef } from "react";

interface LongPrintTempateProps {
  plotNumber: string;
  blockNumber: string;
  plotSize: string;
  memberName: string;
  memberCnic: string;
  dealerOfficeName: string;
  dealerPhoneNumber: string;
  dealerCnic: string;
  qrCodeDataUrl?: string;
}

const LongPrintTemplate = forwardRef<HTMLDivElement, LongPrintTempateProps>(
  (
    {
      plotNumber,
      blockNumber,
      plotSize,
      memberName,
      memberCnic,
      dealerOfficeName,
      dealerPhoneNumber,
      dealerCnic,
      qrCodeDataUrl
    },
    ref
  ) => {
    return <div>Hi</div>;
  }
);

LongPrintTemplate.displayName = "Letter Head";

export default LongPrintTemplate;
