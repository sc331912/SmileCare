export default function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      <div className="p-6 bg-card rounded-2xl border">
        <h3 className="font-bold text-lg mb-2">24/7 Availability</h3>
        <p className="text-muted-foreground text-sm">Talk to our AI assistant anytime, anywhere.</p>
      </div>
      <div className="p-6 bg-card rounded-2xl border">
        <h3 className="font-bold text-lg mb-2">Instant Advice</h3>
        <p className="text-muted-foreground text-sm">Get immediate answers to your dental concerns.</p>
      </div>
      <div className="p-6 bg-card rounded-2xl border">
        <h3 className="font-bold text-lg mb-2">Natural Voice</h3>
        <p className="text-muted-foreground text-sm">Experience lifelike, conversational interactions.</p>
      </div>
    </div>
  );
}