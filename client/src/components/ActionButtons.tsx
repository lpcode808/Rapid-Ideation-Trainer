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
    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
      <button
        onClick={handleCopyToClipboard}
        className="flex-1 px-6 py-3 bg-ideation-accent text-white rounded-lg hover:bg-ideation-accent/90 transition-colors flex items-center justify-center space-x-2 font-medium"
      >
        <Copy className="w-4 h-4" />
        <span className="hidden sm:inline">Copy to Clipboard</span>
        <span className="sm:hidden">Copy</span>
      </button>
      
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-ideation-secondary text-white dark:bg-gray-700 dark:text-white rounded-lg hover:bg-ideation-secondary/90 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2 font-medium"
      >
        <Download className="w-4 h-4" />
        <span>Download .md</span>
      </button>
    </div>
  );
}
