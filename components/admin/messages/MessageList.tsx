"use client";

import { useState } from "react";
import { MdDelete, MdEmail, MdSubject, MdPerson } from "react-icons/md";
import momentJalaali from "moment-jalaali";
import { Message } from "@/types/admin";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { showSuccess, showError } from "@/lib/utils/toast";

interface MessageListProps {
  messages: Message[];
  onDelete: (id: string) => Promise<void>;
}

export default function MessageListWrapper({
  messages,
  onDelete,
}: MessageListProps) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await onDelete(id);
      showSuccess("پیام با موفقیت حذف شد");
    } catch (err) {
      showError(err);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <ErrorBoundary>
      <MessageListContent
        messages={messages}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </ErrorBoundary>
  );
}

interface MessageListContentProps {
  messages: Message[];
  onDelete: (id: string) => Promise<void>;
  isDeleting: string | null;
}

function MessageListContent({
  messages,
  onDelete,
  isDeleting,
}: MessageListContentProps) {
  const formatDate = (date: string) => {
    return momentJalaali(date).format("jYYYY/jMM/jDD HH:mm");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-white p-6 rounded-lg shadow-sm border ${
              !message.isRead ? "border-yellow-500" : ""
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MdPerson className="text-gray-500" size={20} />
                  <span className="font-medium text-gray-800">
                    {message.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MdEmail className="text-gray-500" size={20} />
                  <span className="text-gray-600">{message.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdSubject className="text-gray-500" size={20} />
                  <span className="text-gray-600">{message.subject}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(message.createdAt)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    message.isRead
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {message.isRead ? "خوانده شده" : "خوانده نشده"}
                </span>
                <button
                  onClick={() => onDelete(message.id)}
                  disabled={isDeleting === message.id}
                  className={`p-2 rounded-full transition-colors ${
                    isDeleting === message.id
                      ? "opacity-50 cursor-not-allowed"
                      : "text-red-500 hover:text-red-700 hover:bg-red-50"
                  }`}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
