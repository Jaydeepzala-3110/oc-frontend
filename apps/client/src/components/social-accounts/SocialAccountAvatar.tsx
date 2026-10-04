"use client";

import React, { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import {
  getAccountAvatarUrl,
  resolveDisplayAvatarUrl,
} from "@/lib/avatar";
import { cn } from "@/lib/utils";

interface SocialAccountAvatarProps {
  username: string;
  avatarUrl?: string | null;
  className?: string;
}

export function SocialAccountAvatar({
  username,
  avatarUrl,
  className,
}: SocialAccountAvatarProps) {
  const resolved = resolveDisplayAvatarUrl(username, avatarUrl);
  const fallback = getAccountAvatarUrl(username);
  const [src, setSrc] = useState(resolved);

  useEffect(() => {
    setSrc(resolveDisplayAvatarUrl(username, avatarUrl));
  }, [username, avatarUrl]);

  return (
    <div
      className={cn(
        "h-full w-full rounded-full bg-muted flex items-center justify-center overflow-hidden",
        className,
      )}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover"
        referrerPolicy="no-referrer"
        onError={() => {
          if (src !== fallback) setSrc(fallback);
        }}
      />
    </div>
  );
}

export function SocialAccountAvatarPlaceholder({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full w-full rounded-full bg-muted flex items-center justify-center",
        className,
      )}
    >
      <Instagram className="h-6 w-6 text-muted-foreground" />
    </div>
  );
}
