import { SeeMoreButton } from '@/components/widgets/see-more-button/SeeMoreButton';
import { SeeMoreSectionProps } from './model';

export function SeeMoreSection(props: SeeMoreSectionProps) {
  const { title, button } = props;
  return (
    <div className="mt-12 w-full bg-brand-background">
      <section className="container mx-auto space-y-7 py-10">
        <h2 className="text-center text-2xl font-semibold text-primary">{title}</h2>
        <SeeMoreButton {...button} />
      </section>
    </div>
  );
}
