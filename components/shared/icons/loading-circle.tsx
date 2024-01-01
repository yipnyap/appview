import Image from 'next/image'

export default function LoadingCircle(props: { [x: string]: any }) {
  return (
      <Image width={20}
             height={20}
             className="h-5 w-5 animate-spin dark:invert"
             src="/symbolic/process-working.symbolic.png"
             alt="Process working spinner"
             {...props}
      />
  );
}
