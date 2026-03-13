import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useSendSupportMessage } from "../hooks/useQueries";

export function SupportButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending } = useSendSupportMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name, mobile, message },
      {
        onSuccess: () => {
          setSubmitted(true);
          setTimeout(() => {
            setOpen(false);
            setSubmitted(false);
            setName("");
            setMobile("");
            setMessage("");
          }, 3000);
        },
      },
    );
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-ocid="support.open_modal_button"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        style={{
          background: "oklch(var(--gold))",
          color: "oklch(var(--charcoal-deep))",
        }}
        aria-label="Customer Support"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 sm:pb-6 bg-black/40"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          onKeyUp={(e) => e.key === "Escape" && closeModal()}
        >
          <dialog
            open
            aria-label="Customer Support"
            className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 relative m-0"
            data-ocid="support.dialog"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              data-ocid="support.close_button"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h2
              className="text-xl font-bold mb-1"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Customer Support
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Send us a message and we'll get back to you shortly.
            </p>

            {submitted ? (
              <div
                className="flex flex-col items-center gap-3 py-6 text-center"
                data-ocid="support.success_state"
              >
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="font-semibold text-foreground">Message Sent!</p>
                <p className="text-sm text-muted-foreground">
                  Our team will contact you on {mobile} soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="support-name">Your Name</Label>
                  <Input
                    id="support-name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    data-ocid="support.name_input"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="support-mobile">Mobile Number</Label>
                  <Input
                    id="support-mobile"
                    placeholder="01XXXXXXXXX"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    data-ocid="support.mobile_input"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="support-message">Message</Label>
                  <Textarea
                    id="support-message"
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    data-ocid="support.message_textarea"
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full font-semibold"
                  disabled={isPending}
                  data-ocid="support.submit_button"
                  style={{
                    background: "oklch(var(--gold))",
                    color: "oklch(var(--charcoal-deep))",
                  }}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </dialog>
        </div>
      )}
    </>
  );
}
