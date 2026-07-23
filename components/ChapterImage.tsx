import Image from "next/image";

interface Props {
    src: string;
    alt: string;
}

export default function ChapterImage(props: Props) {
    return (
        <section className="bg-[#090909] py-24">

            <div className="mx-auto max-w-[1700px] px-6">

                <Image
                    src={props.src}
                    alt={props.alt}
                    width={2200}
                    height={1200}
                    className="w-full h-auto"
                />

            </div>

        </section>
    );
}