"use client";

import React from "react";
import { Loader2, Copy, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type VerifyUiStatus = "idle" | "loading" | "success" | "error";

interface PendingAccountVerifyProps {
  username: string;
  verificationCode: string;
  status: VerifyUiStatus;
  isActive: boolean;
  onVerify: () => void;
  onClearError?: () => void;
}

function BioNotFoundHelp({ username, verificationCode }: { username: string; verificationCode: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 space-y-3"
    >
      <div className="flex items-start gap-3">
        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div className="space-y-2 min-w-0">
          <p className="text-sm font-semibold text-destructive">
            Bio code is not found. Please check the following:
          </p>
          <ul className="text-sm text-destructive/90 space-y-1.5 list-disc pl-4">
            <li>Wait 20–30 minutes and try again</li>
            <li>Check for typos in your Instagram ID</li>
            <li>
              Ensure the code in this app (
              <span className="font-mono font-semibold">{verificationCode}</span>
              ) and your bio for @{username} are the same
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function PendingAccountVerify({
  username,
  verificationCode,
  status,
  isActive,
  onVerify,
  onClearError,
}: PendingAccountVerifyProps) {
  const copyCode = () => {
    navigator.clipboard.writeText(verificationCode);
    toast.success("Code copied to clipboard");
  };

  const handleVerify = () => {
    onClearError?.();
    onVerify();
  };

  return (
    <div className="mt-4 rounded-2xl border border-border bg-muted/20 overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-card/80">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Verification
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">
          Add the code below to your Instagram bio, save, then verify.
        </p>
      </div>

      <div className="p-4 space-y-4">
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Your verification code</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-muted/50 border border-border px-4 py-3 rounded-lg text-center font-mono text-lg font-bold tracking-wider text-primary">
              {verificationCode}
            </code>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="h-12 w-12 shrink-0 rounded-lg"
              onClick={copyCode}
              aria-label="Copy verification code"
            >
              <Copy className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Instagram account:{" "}
            <span className="font-semibold text-foreground">@{username}</span>
          </p>
        </div>

        {status === "success" && (
          <div
            role="status"
            className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 flex items-start gap-3"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                Verification successful
              </p>
              <p className="text-xs text-green-700/80 dark:text-green-400/80 mt-1">
                @{username} is now connected. You can remove the code from your bio.
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <BioNotFoundHelp username={username} verificationCode={verificationCode} />
        )}

        {status === "loading" && isActive && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Verifying your Instagram bio…</p>
              <p className="text-muted-foreground text-xs mt-0.5">
                This may take a few seconds.
              </p>
            </div>
          </div>
        )}

        {status !== "success" && (
          <Button
            type="button"
            size="lg"
            className="w-full rounded-xl h-12 font-bold shadow-md"
            disabled={status === "loading"}
            onClick={handleVerify}
          >
            {status === "loading" && isActive ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying…
              </>
            ) : (
              "Verify Now"
            )}
          </Button>
        )}

        {status === "idle" && (
          <div className="flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              If you just updated your bio, Instagram may need 20–30 minutes before we can see the change.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
