import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/pastes/${id}`)
      .then((res) => setContent(res.data.content))
      .catch(() => setContent("Paste not found ❌"));
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      
      <Card className="w-full max-w-3xl p-4 sm:p-6 bg-card text-card-foreground border border-border shadow-xl rounded-2xl">
        
        <CardContent className="space-y-4">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-semibold">
              Your Paste
            </h1>

            <Button
              onClick={handleCopy}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {copied ? "Copied ✅" : "Copy"}
            </Button>
          </div>

          {/* Code Display */}
          <pre className="bg-muted p-4 rounded-lg border border-border text-sm overflow-auto max-h-[500px] whitespace-pre-wrap">
            {content}
          </pre>

        </CardContent>
      </Card>
    </div>
  );
}