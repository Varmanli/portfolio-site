import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "s",
  "h1",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "img",
];

const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "title"];

let imgSrcHookRegistered = false;

/**
 * Rich text from the Tiptap editor allows <img>, but DOMPurify's default
 * URI allowlist also accepts relative and data: URLs. Restrict image
 * src to absolute http(s) URLs only (matches how images are actually
 * stored — S3/ArvanCloud URLs).
 */
function ensureImgSrcHook() {
  if (imgSrcHookRegistered) return;

  DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
    if (node.nodeName === "IMG" && data.attrName === "src") {
      if (!/^https?:\/\//i.test(data.attrValue)) {
        data.keepAttr = false;
      }
    }
  });

  imgSrcHookRegistered = true;
}

/**
 * Sanitizes rich text HTML (produced by the Tiptap editor) before it is
 * stored or rendered, stripping any tags/attributes outside the allowed
 * rich-text set (blocks <script>, event handlers, javascript: URLs, etc).
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  ensureImgSrcHook();

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });
}
