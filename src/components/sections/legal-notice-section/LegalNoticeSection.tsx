import { content } from './content';

export function LegalNoticeSection() {
  // TODO: Refactor this
  return (
    <>
      <h1 className="pt-12 text-center text-4xl font-semibold">Legal</h1>
      {/* eslint-disable-next-line react/no-danger */}
      <section className="container py-12" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}
