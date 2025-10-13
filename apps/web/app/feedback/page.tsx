//FEEDBACK PAGE
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import Link from "next/link";

type Props = Omit<ImageProps, "src"> & {
    srcLight: string;
    srcDark: string;
};

const ThemeImage = (props: Props) => {
    const { srcLight, srcDark, ...rest } = props;

    return (
        <>
            <Image {...rest} src={srcLight} className="imgLight" />
            <Image {...rest} src={srcDark} className="imgDark" />
        </>
    );
};

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>This is the feedback page</h1>
                    <p>Feedback on assignments will be displayed here</p>
                    <Link href="/assignment">Back</Link>
            </main>
            <footer className={styles.footer}>
                <p>Paul's Website</p>
            </footer>
        </div>
    );
}
