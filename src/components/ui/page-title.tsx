interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="mb-8">
      <div className="inline-block">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-primary">
          {title}
        </h1>
        <div className="h-px bg-gradient-primary mt-2" />
      </div>
    </div>
  );
}
