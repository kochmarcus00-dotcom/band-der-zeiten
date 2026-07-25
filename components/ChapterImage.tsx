import Image from "next/image";

interface Props {
    src: string;
    alt: string;
}

export default function ChapterImage(props: Props) {
    return (
        <section className="bg-[#090909] py-28">

            <div className="mx-auto max-w-[1700px] px-8">

                <div className="relative">

                    {/* Magischer blauer Aura-Glow */}

                    <div
                        className="
              absolute
              -inset-8
              rounded-[40px]
              bg-cyan-400/30
              blur-[90px]
              animate-pulse
            "
                    />

                    {/* Zweite, größere Aura */}

                    <div
                        className="
              absolute
              -inset-20
              rounded-[80px]
              bg-sky-500/20
              blur-[160px]
            "
                    />

                    {/* Bild */}

                    <Image
                        src={props.src}
                        alt={props.alt}
                        width={2200}
                        height={1200}
                        className="
              relative
              w-full
              h-auto
              rounded-3xl
              border
              border-cyan-300/20
              shadow-[0_0_70px_rgba(0,180,255,.30)]
            "
                    />

                </div>

            </div>

        </section>
    );
}