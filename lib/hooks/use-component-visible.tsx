import {useEffect, useRef, useState} from 'react'

export default function useComponentVisible(opts?: {
    soundOnClose?: HTMLAudioElement;
}) {
    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const ref = useRef<any>(null);

    const handleClickOutside = (event: { target: any }) => {
        if (ref.current && !ref.current.contains(event.target) && isComponentVisible) {
            setIsComponentVisible(false);
            if (opts?.soundOnClose) {
                if (opts.soundOnClose.currentTime > 0) {
                    opts.soundOnClose.currentTime = 0
                }
                opts.soundOnClose.play()
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isComponentVisible]);

    return { ref, isComponentVisible, setIsComponentVisible };
}