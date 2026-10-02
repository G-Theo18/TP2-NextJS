interface TitleProps {
  children: string;
}

export default function Title({ children }: TitleProps) {
  return (
    <div className="flex w-full justify-center">
      <span className="inline-flex items-center gap-5  p-10 font-semibold uppercase text-3xl text-black">
        <p>•</p>
        {children}
        <p>•</p>
      </span>
    </div>
  );
}