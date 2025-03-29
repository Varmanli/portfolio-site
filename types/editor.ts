export interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
}

export interface ImageUploadResponse {
  url: string;
  alt?: string;
}

export interface EditorToolbarItem {
  name: string;
  icon: React.ReactNode;
  action: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  shortcut?: string;
}
