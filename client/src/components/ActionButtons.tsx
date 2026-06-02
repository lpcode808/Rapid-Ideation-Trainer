import { Download, Copy } from 'lucide-react';
import { useSession } from '@/context/SessionContext';
import { useToast } from '@/hooks/use-toast';

export function ActionButtons() {
  const { exportToMarkdown } = useSession();
  const { toast } = useToast();

  const handleDownload = () => {
    try {
      const markdown = exportToMarkdown();
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ideation-session-${new Date().toISOString().split('T')[0]}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Successful",
        description: "Your ideation report has been downloaded!",
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download Error",
        description: "Failed to download your ideas. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const markdown = exportToMarkdown();
      
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(markdown);
        toast({
          title: "Copied to Clipboard",
          description: "Your ideation report has been copied to the clipboard!",
        });
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = markdown;
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          toast({
            title: "Copied to Clipboard",
            description: "Your ideation report has been copied to the clipboard!",
          });
        } catch (err) {
          console.error('Fallback copy failed:', err);
          toast({
            title: "Copy Error",
            description: "Failed to copy to clipboard. Please try again.",
            variant: "destructive",
          });
        }
        
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error('Copy failed:', error);
      toast({
        title: "Copy Error",
        description: "Failed to copy your ideas. Please try again.",
        variant: "destructive",
      });
    }
  };



  return (
    <div className="flex flex-col gap-3 border-t border-[hsl(var(--border))] pt-6 sm:flex-row">
      <button
        onClick={handleCopyToClipboard}
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ideation-accent px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-95"
      >
        <Copy className="w-4 h-4" />
        <span className="hidden sm:inline">Copy to Clipboard</span>
        <span className="sm:hidden">Copy</span>
      </button>
      
      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-2 rounded-full bg-ideation-secondary px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-95"
      >
        <Download className="w-4 h-4" />
        <span>Download .md</span>
      </button>
    </div>
  );
}
