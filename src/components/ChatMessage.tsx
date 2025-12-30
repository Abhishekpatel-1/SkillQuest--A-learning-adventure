interface ChatMessageProps {
  avatar: string;
  name: string;
  message: string;
  time: string;
  isOwn?: boolean;
}

export function ChatMessage({ avatar, name, message, time, isOwn }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isOwn ? "flex-row-reverse" : ""}`}>
      <img
        src={avatar}
        alt={name}
        className="h-8 w-8 rounded-full border-2 border-primary/20 object-cover shrink-0"
      />
      <div className={`flex flex-col ${isOwn ? "items-end" : ""}`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${isOwn ? "order-2" : ""}`}>{name}</span>
          <span className="text-[10px] text-muted-foreground">{time}</span>
        </div>
        <div
          className={`mt-1 max-w-[280px] rounded-2xl px-4 py-2 text-sm ${
            isOwn
              ? "gradient-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted rounded-tl-sm"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
