import { SeeMoreButton } from '@/components/widgets/see-more-button/SeeMoreButton';

export function SeeMoreSection() {
  return (
    <div className="bg-brand-background w-full">
      <section
        className="container
        mx-auto my-8 p-8
        "
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-black dark:text-white">
          ¿Quieres enterarte de más sismos?
        </h2>
        <SeeMoreButton />
      </section>
    </div>
  );
}
