import { letterheadSchema } from "@/schemas/letterheadSchema";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosResponse, AxiosError } from "axios";
import type { Response, ResponseError } from "@/types/api";
import QRCode from "qrcode";
import { addLetterHead } from "@/api/letterhead";
import { createRoot } from "react-dom/client";
import ShortPrintTemplate from "./ShortPrintTemplate";

const ShortLetterheadForm = () => {
  const form = useForm<z.infer<typeof letterheadSchema>>({
    resolver: zodResolver(letterheadSchema),
    mode: "onChange",
    defaultValues: {
      plotNumber: "",
      blockNumber: "",
      plotSize: "",
      memberName: "",
      memberCnic: ""
    }
  });

  const { mutate: mutateAddLetterHead, isPending } = useMutation({
    mutationFn: addLetterHead,
    onSuccess: (res: AxiosResponse<Response>) => {
      return toast.success(res.data.message);
    },
    onError: (res: AxiosError<ResponseError>) => {
      if (res.response) {
        return toast.error(res.response.data.error.message);
      }
      return toast.error(res.message);
    }
  });

  const handleSubmit = form.handleSubmit(async values => {
    try {
      const uniqueCode = `PROP-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      const qrCodeDataUrl = await QRCode.toDataURL(`http://localhost:5173/verify/${uniqueCode}`);

      mutateAddLetterHead(
        { letterHeadId: uniqueCode, payload: values },
        {
          onSuccess: () => {
            const newWindow = window.open("", "_blank");
            if (!newWindow) {
              alert("Please allow popups for this website");
              return;
            }

            newWindow.document.body.innerHTML = '<div id="payslip-root"></div>';

            const link = newWindow.document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
            newWindow.document.head.appendChild(link);

            const rootElement = newWindow.document.getElementById("payslip-root");
            if (rootElement) {
              const root = createRoot(rootElement);
              root.render(
                <ShortPrintTemplate
                  ref={null}
                  plotNumber={values.plotNumber}
                  blockNumber={values.blockNumber}
                  plotSize={values.plotSize}
                  memberName={values.memberName}
                  memberCnic={values.memberCnic}
                  qrCodeDataUrl={qrCodeDataUrl}
                />
              );
            }

            const printWindow = window.open("", "_blank", "width=800,height=600");
            if (!printWindow) return;

            printWindow.document.write(`
        <html>
          <head>
            <title>Print Content</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <style>
              body { margin: 20px; }
            </style>
          </head>
          <body>
            <div>Hi</div>
            <div style="margin-top: 20px;">
              <p><strong>Verification Code:</strong> ${uniqueCode}</p>
              <img src="${qrCodeDataUrl}" alt="QR Code" width="150" height="150"/>
            </div>
          </body>
        </html>
      `);

            printWindow.document.close();
            printWindow.focus();

            printWindow.onload = function () {
              printWindow.print();
              setTimeout(() => {
                printWindow.close();
              }, 1000);
            };
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <FormInput
            control={form.control}
            name="plotNumber"
            label="Plot Number"
            type="text"
            placeholder="1234"
            isPending={isPending}
          />
          <FormInput
            control={form.control}
            name="blockNumber"
            label="Block Number"
            type="text"
            placeholder="12A"
            isPending={isPending}
          />
          <FormInput
            control={form.control}
            name="plotSize"
            label="Plot Size"
            type="text"
            placeholder="5 Marla"
            isPending={isPending}
          />
          <FormInput
            control={form.control}
            name="memberName"
            label="Member Namer"
            type="text"
            placeholder="John Doe"
            isPending={isPending}
          />
          <FormInput
            control={form.control}
            name="memberCnic"
            label="Member CNIC"
            type="text"
            placeholder="12345-1234567-1"
            isPending={isPending}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            Generate
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShortLetterheadForm;
