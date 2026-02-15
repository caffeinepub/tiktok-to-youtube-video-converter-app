import { ShareUtilities } from './ShareUtilities';
import { ListingSection } from './ListingSection';

export function ShareAndListPanel() {
  return (
    <div className="space-y-6">
      <ShareUtilities />
      <ListingSection />
    </div>
  );
}
