import Image from "next/image";

type GuideCoverProps = {
  art: string;
  large?: boolean;
};

export function GuideCover({ art, large = false }: GuideCoverProps) {
  return (
    <div
      className={`guide-cover relative isolate shrink-0 overflow-hidden rounded-md bg-black ${large ? "h-[250px] max-md:h-[170px]" : "h-[104px] max-md:h-20"}`}
      aria-hidden="true"
    >
      <Image
        src={`/images/guides/${art}.webp`}
        alt=""
        fill
        sizes={large ? "(max-width: 820px) 90vw, 760px" : "(max-width: 768px) 45vw, (max-width: 1400px) 23vw, 320px"}
        className="object-cover object-center"
      />
    </div>
  );
}
