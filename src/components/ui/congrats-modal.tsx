import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface CongratsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lottieSrc: string;
  title?: string;
  message?: string;
}

export function CongratsModal({ open, onOpenChange, lottieSrc, title = "Congratulations!", message }: CongratsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center justify-center gap-4 py-8">
        <DotLottieReact
          src={lottieSrc}
          autoplay
          loop={false}
          style={{ width: 220, height: 220 }}
        />
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-primary mb-2">{title}</DialogTitle>
          {message && <p className="text-muted-foreground text-base">{message}</p>}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
