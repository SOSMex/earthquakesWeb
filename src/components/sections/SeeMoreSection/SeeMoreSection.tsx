import { SeeMoreButton } from '@/components/widgets/see-more-button/SeeMoreButton';

export function SeeMoreSection() {
  return (
    <div className="mt-12 w-full bg-brand-background">
      <section className="container mx-auto space-y-7 py-10">
        <h2 className="text-center text-2xl font-semibold text-primary">
          ¿Quieres enterarte de más sismos?
        </h2>
        <SeeMoreButton />
      </section>
    </div>
  );
}
