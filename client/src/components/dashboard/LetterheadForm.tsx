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

const LetterheadForm = () => {
  const form = useForm<z.infer<typeof letterheadSchema>>({
    resolver: zodResolver(letterheadSchema),
    mode: "onChange",
    defaultValues: {
      plotNumber: "",
      blockNumber: "",
      plotSize: "",
      memberName: "",
      memberCnic: "",
      dealerOfficeName: "",
      dealerPhoneNumber: "",
      dealerCnic: ""
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
      // eslint-disable-next-line no-console
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
          <FormInput
            control={form.control}
            name="dealerOfficeName"
            label="Dealer Office Name"
            type="text"
            placeholder="ABC Real Estate"
            isPending={isPending}
          />
          <FormInput
            control={form.control}
            name="dealerPhoneNumber"
            label="Dealer Phone Number"
            type="text"
            placeholder="1234567890"
            isPending={isPending}
          />
          <FormInput
            control={form.control}
            name="dealerCnic"
            label="Dealer CNIC"
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

export default LetterheadForm;
