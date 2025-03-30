"use client";

import { useEffect, useState } from "react";
import { MdMessage } from "react-icons/md";
import { Message } from "@/types/admin";
import { messageApi } from "@/lib/api/admin";
import { showError } from "@/lib/utils/toast";
import MessageList from "@/components/admin/messages/MessageList";

/**
 * Messages Page
 *
 * A page for managing and displaying user messages.
 */
export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await messageApi.getAll();
        setMessages(data);
      } catch (error) {
        showError(error);
      }
    };

    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm("آیا از حذف این پیام اطمینان دارید؟")) {
      try {
        await messageApi.delete(id);
        setMessages((prev) => prev.filter((message) => message.id !== id));
      } catch (error) {
        showError(error);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <MdMessage size={24} className="text-yellow-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800">پیام‌ها</h1>
      </div>

      <MessageList messages={messages} onDelete={handleDeleteMessage} />
    </div>
  );
}
