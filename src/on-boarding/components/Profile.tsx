import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { profiles } from "../../constants";
import { motion } from "framer-motion";

export default function Profile() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const getVisibleProfiles = () => {
        const prev = (currentIndex - 1 + profiles.length) % profiles.length;
        const next = (currentIndex + 1) % profiles.length;
        return [profiles[prev], profiles[currentIndex], profiles[next]];
    };

    const visibleProfiles = getVisibleProfiles();

    const handleImageClick = (index: number) => {
        setCurrentIndex(index);
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setCurrentIndex((currentIndex + 1) % profiles.length),
        onSwipedRight: () => setCurrentIndex((currentIndex - 1 + profiles.length) % profiles.length),
    });

    return (
        <div {...swipeHandlers} className="relative flex items-center justify-center overflow-hidden h-60">
            <input type="hidden" name="currentIndex" value={currentIndex.toString()} onChange={e => setCurrentIndex(Number(e.target.value))} />
            {visibleProfiles.map((profile, index) => (
                <motion.img
                    key={profile.url}
                    src={profile.url}
                    alt={profile.alt}
                    onClick={() => handleImageClick((currentIndex - 1 + index) % profiles.length)}
                    className="absolute cursor-pointer"
                    animate={{
                        scale: index === 1 ? 1.5 : 1,
                        opacity: index === 1 ? 1 : 0.75,
                        x: index === 0 ? -110 : index === 2 ? 110 : 0,
                        zIndex: index === 1 ? 10 : 5,
                        rotateY: 0
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ width: index === 1 ? '100px' : '60px', height: index === 1 ? '100px' : '60px' }}
                />
            ))}
        </div>
    );
}
