import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [expiry, setExpiry] = useState(10);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const expiryOptions = [
    { label: "10 Minutes", value: 10 },
    { label: "20 Minutes", value: 20 },
    { label: "30 Minutes", value: 30 },
    { label: "1 Hour", value: 60 },
    { label: "12 Hours", value: 720 },
    { label: "1 Day", value: 1440 },
  ];

  // Handle textarea change with limit
  const handleChange = (e) => {
    if (e.target.value.length <= 500000) {
      setContent(e.target.value);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError("Paste cannot be empty ❌");
      return;
    }

    setError("");
    setSuccess(false);

    try {
      const res = await axios.post("https://paste-backend-production-ddbe.up.railway.app/api/pastes", {
        content,
        expiryMinutes: expiry,
      });

      setUrl(res.data.url);
      setSuccess(true);
      setContent(""); // reset after success
    } catch (err) {
      setError("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-3 sm:px-4">
      
      <Card className="w-full max-w-2xl p-4 sm:p-6 bg-card text-card-foreground border border-border shadow-xl rounded-2xl">
        
        <CardContent className="space-y-5 sm:space-y-6">

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              PasteIt 🚀
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Share code instantly with a link
            </p>
          </div>

          {/* Textarea */}
          <Textarea
            className="min-h-[250px] sm:min-h-[350px] text-sm font-mono resize-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="// Write your code here..."
            value={content}
            onChange={handleChange}
          />

          {/* Character Counter */}
          <p className="text-xs text-muted-foreground text-right">
            {content.length} / 500000
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-600/20 border border-green-500 text-green-400 p-3 rounded-lg text-sm">
              ✅ Paste created successfully!
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Expiry Select */}
            <Select
              defaultValue="10"
              onValueChange={(value) => setExpiry(Number(value))}
            >
              <SelectTrigger className="w-full sm:w-[180px] bg-card border border-border">
                <SelectValue placeholder="Expiry" />
              </SelectTrigger>

              <SelectContent className="bg-popover text-popover-foreground border border-border">
                {expiryOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Button */}
            <Button
              className="w-full sm:flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleSubmit}
            >
              Create Paste
            </Button>

          </div>

          {/* Result */}
          {url && (
            <div className="bg-muted p-3 rounded-lg border border-border text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              
              <span className="truncate break-all">{url}</span>
              
              <a
                href={url}
                className="text-primary hover:underline text-right"
              >
                Open
              </a>

            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
