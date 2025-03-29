"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { RichTextEditorProps } from "@/types/editor";
import { createImagePreview, validateImage } from "@/utils/image";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdCode,
  MdImage,
  MdUndo,
  MdRedo,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdDelete,
} from "react-icons/md";
import {
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeStrikethrough,
} from "react-icons/bs";
import { useState, useEffect } from "react";

export function RichTextEditor({
  content = "",
  onChange,
  placeholder = "محتوا را اینجا بنویسید...",
  className = "",
  editable = true,
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: "font-bold",
          },
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-r-4 border-gray-300 pr-4 my-4 italic",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-gray-100 rounded-lg p-4 my-4 font-mono",
          },
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
    ],
    content,
    editable,
    editorProps: {
      attributes: {
        class: `prose prose-lg rtl text-right focus:outline-none ${className}`,
      },
      handleKeyDown: (view, event) => {
        // Handle Enter key in lists
        if (event.key === "Enter" && !event.shiftKey) {
          const { state } = view;
          const { selection } = state;
          const { $head } = selection;

          // Check if we're in a list
          const listItem = $head.parent;
          if (listItem.type.name === "list_item") {
            // If we're at the end of a list item, create a new paragraph
            if ($head.parentOffset === listItem.content.size) {
              view.dispatch(
                view.state.tr.insert(
                  $head.pos,
                  view.state.schema.nodes.paragraph.create()
                )
              );
              return true;
            }
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    enableInputRules: true,
    enablePasteRules: true,
    immediatelyRender: false,
  });

  if (!mounted) {
    return (
      <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 bg-white p-2 flex flex-wrap gap-1">
          <div className="w-full h-8 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="bg-white p-4">
          <div className="w-full h-64 bg-gray-50 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const validation = validateImage(file);
      if (!validation.isValid) {
        alert(validation.error);
        return;
      }

      try {
        const preview = await createImagePreview(file);
        editor.chain().focus().setImage({ src: preview }).run();
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("خطا در آپلود تصویر");
      }
    };
    input.click();
  };

  const toolbarItems = [
    {
      name: "بولد",
      icon: <MdFormatBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      shortcut: "Ctrl+B",
    },
    {
      name: "ایتالیک",
      icon: <MdFormatItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      shortcut: "Ctrl+I",
    },
    {
      name: "خط خورده",
      icon: <BsTypeStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      shortcut: "Ctrl+S",
    },
    {
      name: "لیست",
      icon: <MdFormatListBulleted />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      shortcut: "Ctrl+Shift+B",
    },
    {
      name: "لیست شماره‌دار",
      icon: <MdFormatListNumbered />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      shortcut: "Ctrl+Shift+O",
    },
    {
      name: "نقل قول",
      icon: <MdFormatQuote />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      shortcut: "Ctrl+Shift+Q",
    },
    {
      name: "کد",
      icon: <MdCode />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
      shortcut: "Ctrl+Shift+C",
    },
    {
      name: "تصویر",
      icon: <MdImage />,
      action: addImage,
      shortcut: "Ctrl+Shift+I",
    },
    {
      name: "حذف تغییرات",
      icon: <MdUndo />,
      action: () => editor.chain().focus().undo().run(),
      isDisabled: !editor.can().undo(),
      shortcut: "Ctrl+Z",
    },
    {
      name: "بازگردانی تغییرات",
      icon: <MdRedo />,
      action: () => editor.chain().focus().redo().run(),
      isDisabled: !editor.can().redo(),
      shortcut: "Ctrl+Y",
    },
    {
      name: "عنوان ۱",
      icon: <BsTypeH1 />,
      action: () => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
      },
      isActive: editor.isActive("heading", { level: 1 }),
      shortcut: "Ctrl+1",
    },
    {
      name: "عنوان ۲",
      icon: <BsTypeH2 />,
      action: () => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      },
      isActive: editor.isActive("heading", { level: 2 }),
      shortcut: "Ctrl+2",
    },
    {
      name: "عنوان ۳",
      icon: <BsTypeH3 />,
      action: () => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
      },
      isActive: editor.isActive("heading", { level: 3 }),
      shortcut: "Ctrl+3",
    },
    {
      name: "چینش به راست",
      icon: <MdFormatAlignRight />,
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
      shortcut: "Ctrl+R",
    },
    {
      name: "چینش به وسط",
      icon: <MdFormatAlignCenter />,
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
      shortcut: "Ctrl+E",
    },
    {
      name: "چینش به چپ",
      icon: <MdFormatAlignLeft />,
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
      shortcut: "Ctrl+L",
    },
  ];

  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 bg-white p-2 flex flex-wrap gap-1">
        {toolbarItems.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              item.action();
            }}
            disabled={item.isDisabled}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
              item.isActive ? "bg-yellow-100 text-yellow-800" : "text-gray-700"
            } ${item.isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            title={`${item.name} (${item.shortcut})`}
          >
            {item.icon}
          </button>
        ))}
      </div>
      <div className="bg-white p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
