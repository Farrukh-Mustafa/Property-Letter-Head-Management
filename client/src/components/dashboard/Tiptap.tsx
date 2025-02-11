import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
  FaPalette,
  FaHeading,
  FaPrint
} from "react-icons/fa";
import QRCode from "qrcode";
import Template from "./Template.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { type AxiosError } from "axios";
import { toast } from "sonner";
import { type ResponseError } from "@/types/api.ts";
import { useMutation } from "@tanstack/react-query";
import { addLetterHead } from "@/api/letterhead.ts";

const Tiptap = () => {
  const { mutate: mutateLetterhead, isPending } = useMutation({
    mutationFn: addLetterHead,
    onSuccess: () => {
      return toast.success("Letterhead added successfully");
    },
    onError: (res: AxiosError<ResponseError>) => {
      if (res.response) {
        return toast.error(res.response?.data.error.message);
      }
      return toast.error(res.message);
    }
  });
  const editor = useEditor({
    extensions: [StarterKit.configure(), TextStyle, Color.configure({ types: ["textStyle"] }), Underline],
    content: Template
  });

  const setParagraph = () => {
    editor?.chain().focus().setParagraph().run();
  };

  type Level = 1 | 2 | 3;
  const setHeading = (level: Level) => {
    editor?.chain().focus().toggleHeading({ level }).run();
  };

  const extractValues = () => {
    if (!editor) return null;

    const editorContent = editor.getHTML(); // Get current editor content
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorContent; // Convert HTML string to DOM elements

    // Function to extract text values properly
    const extractValue = (label: string) => {
      const regex = new RegExp(`<strong>${label}:</strong>\\s*([^<]+)`, "i"); // Match "<strong>Label:</strong> Value"
      const match = tempDiv.innerHTML.match(regex);
      return match ? match[1].trim() : "Unknown"; // Extract and clean up text
    };

    return {
      name: extractValue("Name"),
      cnic: extractValue("CNIC"),
      plotNumber: extractValue("Plot Number")
    };
  };

  const printContent = async () => {
    if (!editor) return;
    const uniqueCode = `PROP-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const qrCodeDataUrl = await QRCode.toDataURL(`http://localhost:5173/verify/${uniqueCode}`);

    const extractedValues = extractValues() || { name: "", cnic: "", plotNumber: "" };
    const { name, cnic, plotNumber } = extractedValues;

    mutateLetterhead(
      { name, cnic, plotNumber, letterHeadId: uniqueCode },
      {
        onSuccess: () => {
          const content = editor.getHTML();
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
                <div>${content}</div>
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
  };

  if (!editor) return null;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: "sticky", top: 0, zIndex: 1 }}>
        <div className="container-fluid">
          <div className="navbar-nav">
            <button className="btn btn-light" onClick={() => editor.chain().focus().undo().run()} title="Undo">
              <FaUndo className="me-2" />
            </button>
            <button className="btn btn-light" onClick={() => editor.chain().focus().redo().run()} title="Redo">
              <FaRedo className="me-2" />
            </button>

            <button className="btn btn-light" onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
              <FaBold className="me-2" />
            </button>
            <button
              className="btn btn-light"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <FaItalic className="me-2" />
            </button>
            <button
              className="btn btn-light"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Underline"
            >
              <FaUnderline className="me-2" />
            </button>
            <button
              className="btn btn-light"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Strikethrough"
            >
              <FaStrikethrough className="me-2" />
            </button>

            <button
              className="btn btn-light"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
            >
              <FaListUl className="me-2" />
            </button>
            <button
              className="btn btn-light"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Ordered List"
            >
              <FaListOl className="me-2" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaPalette className="me-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => editor.chain().focus().setColor("#000000").run()}>
                  Black
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().setColor("#FF0000").run()}>
                  Red
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().setColor("#008000").run()}>
                  Green
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => editor.chain().focus().setColor("#0000FF").run()}>
                  Blue
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <FaHeading className="me-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={setParagraph}>Paragraph</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setHeading(1)}>Heading 1</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setHeading(2)}>Heading 2</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setHeading(3)}>Heading 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <button className="btn btn-light" onClick={printContent} title="Print" disabled={isPending}>
              <FaPrint className="me-2" />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
